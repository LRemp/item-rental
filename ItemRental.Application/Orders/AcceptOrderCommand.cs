using ItemRental.Core.Contracts;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
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
        private readonly IOrderService orderService;
        public AcceptOrderCommandHandler(IOrderService orderService)
        {
            this.orderService = orderService;
        }
        public async Task<Result> Handle(AcceptOrderCommand request, CancellationToken cancellationToken)
        {
            var result = await orderService.AcceptAsync(request.id, request.user, cancellationToken);

            return result;
        }
    }
}
