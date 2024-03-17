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
    public sealed record GetListingUserOrdersQuery(Guid ListingId, Guid UserId) : IQuery<List<OrderDTO>>;
    public class GetListingUserOrdersQueryHandler : IQueryHandler<GetListingUserOrdersQuery, List<OrderDTO>>
    {
        private readonly IOrderRepository _orderRepository;
        public GetListingUserOrdersQueryHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<Result<List<OrderDTO>>> Handle(GetListingUserOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetUserListingOrdersAsync(request.ListingId, request.UserId, cancellationToken);
            
            return Result.Success(orders);
        }
    }
}
