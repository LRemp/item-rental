using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Enums;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Orders
{
    public sealed record GetOwnerOrdersQuery(Guid user, OrderStatus? status) : IQuery<List<OrderDTO>>;
    public class GetOwnerOrdersQueryHandler : IQueryHandler<GetOwnerOrdersQuery, List<OrderDTO>>
    {
        private IOrderRepository _orderRepository;
        public GetOwnerOrdersQueryHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<Result<List<OrderDTO>>> Handle(GetOwnerOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetOwnerOrdersAsync(request.user, request.status, cancellationToken);

            return orders;
        }
    }
}
