using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Orders
{
    public sealed record GetOrdersQuery(Guid id) : IQuery<List<OrderDTO>>;
    public class GetOrdersQueryHandler : IQueryHandler<GetOrdersQuery, List<OrderDTO>>
    {
        private readonly IOrderRepository _orderRepository;
        public GetOrdersQueryHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<Result<List<OrderDTO>>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetUserAsync(request.id, cancellationToken);

            return Result.Success(orders);
        }
    }
}
