using AutoMapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository orderRepository;
        private readonly IRentListingRepository rentListingRepository;
        private readonly IEventLogRepository eventLogRepository;
        private readonly IUserRepository userRepository;
        private readonly IEmailService emailService;
        private readonly IMapper mapper;
        public OrderService(IOrderRepository orderRepository, IRentListingRepository rentListingRepository, IEventLogRepository eventLogRepository, IUserRepository userRepository, IEmailService emailService, IMapper mapper)
        {
            this.orderRepository = orderRepository;
            this.rentListingRepository = rentListingRepository;
            this.eventLogRepository = eventLogRepository;
            this.userRepository = userRepository;
            this.emailService = emailService;
            this.mapper = mapper;
        }

        public async Task<Result> AcceptAsync(Guid id, Guid user, CancellationToken cancellationToken)
        {
            var order = await orderRepository.GetInternalAsync(id, cancellationToken);

            if (order is null)
            {
                return Result.Failure(DomainErrors.Order.NotFound(id));
            }

            var rentListing = await rentListingRepository.GetInternalAsync(order.Listing, cancellationToken);

            if (rentListing is null)
            {
                return Result.Failure(DomainErrors.RentListing.NotFound);
            }

            if (rentListing.Renter != user)
            {
                return Result.Failure(DomainErrors.RentListing.NotRenter);
            }

            if (order.Status != OrderStatus.Pending)
            {
                return Result.Failure(DomainErrors.Order.NotValidAction(order.Id));
            }

            var success = await orderRepository.UpdateAsync(new Order
            {
                Id = order.Id,
                User = order.User,
                Listing = order.Listing,
                StartDate = order.StartDate,
                EndDate = order.EndDate,
                Status = OrderStatus.Accepted
            }, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.Order.FailedToAccept(order.Id));
            }

            await eventLogRepository.AddAsync(DomainEventLogs.Order.Accepted(Guid.NewGuid(), order.Id), cancellationToken);
            userRepository.AddNotificationAsync(DomainNotifications.Order.Accepted(order.User, order.Id), cancellationToken);

            return Result.Success();
        }

        public async Task<Result<Guid>> CreateAsync(AddOrderDTO addOrderDTO, Guid user, CancellationToken cancellationToken)
        {
            var listing = await rentListingRepository.GetInternalAsync(addOrderDTO.RentListing, cancellationToken);

            if (listing is null)
            {
                return Result.Failure<Guid>(DomainErrors.RentListing.NotFound);
            }

            var isDateNotTaken = await this.IsDateNotTaken(addOrderDTO.RentListing, addOrderDTO.StartDate, addOrderDTO.EndDate, cancellationToken);

            if (!isDateNotTaken)
            {
                return Result.Failure<Guid>(DomainErrors.Order.DateBusy(addOrderDTO.RentListing));
            }

            var order = new Order
            {
                Id = Guid.NewGuid(),
                User = user,
                Listing = addOrderDTO.RentListing,
                StartDate = addOrderDTO.StartDate,
                EndDate = addOrderDTO.EndDate,
                Status = OrderStatus.Pending,
                DeliveryType = addOrderDTO.DeliveryType,
                Comment = addOrderDTO.Comment
            };

            var success = await orderRepository.AddAsync(order, cancellationToken);
            
            if(!success)
            {
                return Result.Failure<Guid>(DomainErrors.Order.FailedToCreate);
            }

            var merchant = await userRepository.GetByIdAsync(listing.Renter, cancellationToken);

            emailService.SendEmail(DomainEmails.Order.NewOrderCreated(merchant, listing));

            await eventLogRepository.AddAsync(DomainEventLogs.Order.Created(Guid.NewGuid(), order.Id), cancellationToken);
            await userRepository.AddNotificationAsync(DomainNotifications.Order.Created(order.User, order.Id), cancellationToken);

            return Result.Success(order.Id);
        }

        public async Task<OrderDTO?> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            var orderDTO = await orderRepository.GetAsync(id, cancellationToken);

            if(orderDTO is null)
            {
                return null;
            }

            var events = await eventLogRepository.GetAllAsync(id, cancellationToken);

            orderDTO.Events = mapper.Map<List<EventLogDTO>>(events);

            return orderDTO;
        }

        public async Task<bool> IsDateNotTaken(Guid id, DateTime startTime, DateTime endTime, CancellationToken cancellationToken)
        {
            var orders = await orderRepository.GetListingOrdersAsync(id, cancellationToken);

            foreach (OrderDTO order in orders)
            {
                if (startTime < order.EndDate && endTime > order.StartDate)
                {
                    return false; // There is overlap, date is taken
                }
            }

            return true; // No overlapping dates found, date is available
        }

        public async Task<bool> IsItemInUse(Guid id, CancellationToken cancellationToken)
        {
            var orders = await orderRepository.GetWithItemAsync(id, cancellationToken);

            return orders.Where(x => x.Status < OrderStatus.Completed).Any();
        }
    }
}
