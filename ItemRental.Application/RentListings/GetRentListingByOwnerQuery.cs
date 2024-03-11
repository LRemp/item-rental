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
    public sealed record GetRentListingByOwnerResponse(List<RentListingDTO> rentListings);
    public sealed record GetRentListingByOwnerQuery(Guid OwnerId) : IQuery<GetRentListingByOwnerResponse>;
    public class GetRentListingByOwnerQueryHandler : IQueryHandler<GetRentListingByOwnerQuery, GetRentListingByOwnerResponse>
    {
        public Task<Result<GetRentListingByOwnerResponse>> Handle(GetRentListingByOwnerQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
