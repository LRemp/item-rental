using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
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
    public sealed record GetOrderQuery(Guid id) : IQuery<OrderDTO>;
    public class GetOrderQueryHandler : IQueryHandler<GetOrderQuery, OrderDTO>
    {
        private readonly IOrderRepository _orderRepository;
        public GetOrderQueryHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<Result<OrderDTO>> Handle(GetOrderQuery request, CancellationToken cancellationToken)
        {
            var result = await _orderRepository.GetAsync(request.id, cancellationToken);

            if(result is null)
            {
                return Result.Failure<OrderDTO>(DomainErrors.Order.NotFound(request.id));
            }

            return result;
        }
    }
}
