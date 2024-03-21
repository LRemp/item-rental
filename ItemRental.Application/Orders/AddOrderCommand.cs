using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using ItemRental.Core.Errors;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Orders
{
    public sealed record AddOrderCommand(Guid user, AddOrderDTO addOrderDTO) : ICommand<Guid>;
    public class AddOrderCommandHandler : ICommandHandler<AddOrderCommand, Guid>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IRentListingRepository _rentListingRepository;
        public AddOrderCommandHandler(IOrderRepository orderRepository, IRentListingRepository rentListingRepository)
        {
            _orderRepository = orderRepository;
            _rentListingRepository = rentListingRepository;
        }
        public async Task<Result<Guid>> Handle(AddOrderCommand request, CancellationToken cancellationToken)
        {
            var listing = await _rentListingRepository.GetInternalAsync(request.addOrderDTO.RentListing, cancellationToken);

            if(listing is null)
            {
                return Result.Failure<Guid>(DomainErrors.RentListing.NotFound(request.addOrderDTO.RentListing));
            }

            //TODO: check if dates are valid
            var order = new Order
            {
                Id = Guid.NewGuid(),
                User = request.user,
                Listing = request.addOrderDTO.RentListing,
                StartDate = request.addOrderDTO.StartDate,
                EndDate = request.addOrderDTO.EndDate,
                Status = OrderStatus.Pending
            };

            var success = await _orderRepository.AddAsync(order, cancellationToken);

            if(!success)
            {
                return Result.Failure<Guid>(DomainErrors.Order.FailedToCreate);
            }

            return Result.Success(order.Id);
        }
    }
}
