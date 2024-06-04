using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ItemRental.Core.Contracts;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;

namespace ItemRental.Application.Orders
{
    public sealed record DeclineOrderCommand(string id, Guid user) : ICommand;
    public class DeclineOrderCommandHandler : ICommandHandler<DeclineOrderCommand>
    {
        private readonly IOrderService orderService;
        public DeclineOrderCommandHandler(IOrderService orderService)
        {
            this.orderService = orderService;
        }
        public async Task<Result> Handle(DeclineOrderCommand request, CancellationToken cancellationToken)
        {
            var result = await orderService.DeclineAsync(request.id, request.user, cancellationToken);

            return result;
        }
    }

}
