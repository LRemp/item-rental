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
    public sealed record GetRentListingsResponse(List<RentListingDTO> rentListings);
    public sealed record GetRentListingsQuery() : IQuery<GetRentListingsResponse>;
    internal class GetRentListingsQueryHandler : IQueryHandler<GetRentListingsQuery, GetRentListingsResponse>
    {
        public Task<Result<GetRentListingsResponse>> Handle(GetRentListingsQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
