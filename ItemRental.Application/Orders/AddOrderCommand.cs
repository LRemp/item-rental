using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
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
        private readonly IOrderService orderService;
        public AddOrderCommandHandler(IOrderService orderService)
        {
            this.orderService = orderService;
        }
        public async Task<Result<Guid>> Handle(AddOrderCommand request, CancellationToken cancellationToken)
        {
            var result = await orderService.CreateAsync(request.addOrderDTO, request.user, cancellationToken);

            return result;
        }
    }
}
