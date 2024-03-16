using ItemRental.Core.Contracts;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using ItemRental.Core.Errors;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Orders
{
    public sealed record AcceptOrderCommand(Guid id, Guid user) : ICommand;
    public class AcceptOrderCommandHandler : ICommandHandler<AcceptOrderCommand>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IRentListingRepository _rentListingRepository;
        public AcceptOrderCommandHandler(IOrderRepository orderRepository, IRentListingRepository rentListingRepository)
        {
            _orderRepository = orderRepository;
            _rentListingRepository = rentListingRepository;
        }
        public async Task<Result> Handle(AcceptOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepository.GetInternalAsync(request.id, cancellationToken);

            if(order is null)
            {
                return Result.Failure(DomainErrors.Order.NotFound(request.id));
            }

            var rentListing = await _rentListingRepository.GetInternalAsync(order.Listing, cancellationToken);

            if(rentListing is null)
            {
                return Result.Failure(DomainErrors.RentListing.NotFound(order.Listing));
            }

            if(rentListing.Renter != request.user)
            {
                return Result.Failure(DomainErrors.RentListing.NotRenter(rentListing.Id));
            }

            if(order.Status != OrderStatus.Pending)
            {
                return Result.Failure(DomainErrors.Order.NotValidAction(order.Id));
            }

            var success = await _orderRepository.UpdateAsync(new Order
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

            return Result.Success();
        }
    }
}
