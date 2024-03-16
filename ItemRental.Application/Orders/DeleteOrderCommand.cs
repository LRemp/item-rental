using ItemRental.Core.Contracts;
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
    public sealed record DeleterOrderCommand(Guid id, Guid user) : ICommand;
    public class DeleteOrderCommandHandler : ICommandHandler<DeleterOrderCommand>
    {
        private readonly IOrderRepository _orderRepository;
        public DeleteOrderCommandHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<Result> Handle(DeleterOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepository.GetInternalAsync(request.id, cancellationToken);
            
            if(order is null)
            {
                return Result.Failure(DomainErrors.Order.NotFound(request.id));
            }   

            if(order.User != request.user)
            {
                return Result.Failure(DomainErrors.Order.NotOwner(request.id));
            }

            var success = await _orderRepository.DeleteAsync(request.id, cancellationToken);

            if (!success)
            {
                return Result.Failure(DomainErrors.Order.NotFound(request.id));
            }

            return Result.Success();
        }
    }
}
