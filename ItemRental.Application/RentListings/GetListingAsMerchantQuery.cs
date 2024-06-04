using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;

namespace ItemRental.Application.RentListings
{
    public sealed record GetListingAsMerchantQuery(Guid id, Guid user) : IQuery<RentListingDTO>;
    public class GetListingAsMerchantQueryHandler : IQueryHandler<GetListingAsMerchantQuery, RentListingDTO>
    {
        private readonly IRentListingRepository rentListingRepository;
        private readonly IOrderRepository orderRepository;
        public GetListingAsMerchantQueryHandler(IRentListingRepository rentListingRepository, IOrderRepository orderRepository)
        {
            this.rentListingRepository = rentListingRepository;
            this.orderRepository = orderRepository;
        }
        public async Task<Result<RentListingDTO>> Handle(GetListingAsMerchantQuery request, CancellationToken cancellationToken)
        {
            var listing = await rentListingRepository.GetAsync(request.id, cancellationToken);

            var orders = await orderRepository.GetOrdersOfItemAsync(listing.Item.Id, cancellationToken);

            listing.Orders = orders;

            return listing;
        }
    }
}
