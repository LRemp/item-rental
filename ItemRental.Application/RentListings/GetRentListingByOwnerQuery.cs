using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.RentListings
{
    public sealed record GetRentListingByOwnerQuery(Guid OwnerId) : IQuery<List<RentListingDTO>>;
    public class GetRentListingByOwnerQueryHandler : IQueryHandler<GetRentListingByOwnerQuery, List<RentListingDTO>>
    {
        private readonly IRentListingRepository _rentListingRepository;
        public GetRentListingByOwnerQueryHandler(IRentListingRepository rentListingRepository)
        {
            _rentListingRepository = rentListingRepository;
        }
        public async Task<Result<List<RentListingDTO>>> Handle(GetRentListingByOwnerQuery request, CancellationToken cancellationToken)
        {
            var rentListings = await _rentListingRepository.GetByOwnerAsync(request.OwnerId, cancellationToken);

            return rentListings;
        }
    }
}
