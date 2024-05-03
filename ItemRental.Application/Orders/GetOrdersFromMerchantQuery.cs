using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Orders
{
    public sealed record GetOrdersFromMerchantQuery(Guid user, Guid merchant) : IQuery<List<OrderDTO>>;
    public class GetOrdersFromMerchantQueryHandler : IQueryHandler<GetOrdersFromMerchantQuery, List<OrderDTO>>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository userRepository;
        public GetOrdersFromMerchantQueryHandler(IOrderRepository orderRepository, IUserRepository userRepository)
        {
            _orderRepository = orderRepository;
            this.userRepository = userRepository;
        }
        public async Task<Result<List<OrderDTO>>> Handle(GetOrdersFromMerchantQuery request, CancellationToken cancellationToken)
        {
            var user = await userRepository.GetByIdAsync(request.merchant, cancellationToken);

            if(user is null)
            {
                return Result.Failure<List<OrderDTO>>(DomainErrors.User.NotFound);
            }

            var orders = await _orderRepository.GetOrdersFromMerchantAsync(request.user, request.merchant, cancellationToken);

            return orders;
        }
    }
}
