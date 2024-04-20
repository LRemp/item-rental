using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.RentListings
{
    public sealed record GetMerchantListingsQuery(Guid id) : IQuery<List<RentListingDTO>>;
    public class GetMerchantListingsQueryHandler : IQueryHandler<GetMerchantListingsQuery, List<RentListingDTO>>
    {
        public Task<Result<List<RentListingDTO>>> Handle(GetMerchantListingsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
