using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Errors;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.RentListings
{
    public sealed record GetRentListingByIdQuery(Guid id) : IQuery<RentListingDTO>;
    public class GetRentListingByIdHandler : IQueryHandler<GetRentListingByIdQuery, RentListingDTO>
    {
        private readonly IRentListingRepository _rentListingRepository;
        public GetRentListingByIdHandler(IRentListingRepository rentListingRepository)
        {
            _rentListingRepository = rentListingRepository;
        }
        public async Task<Result<RentListingDTO>> Handle(GetRentListingByIdQuery request, CancellationToken cancellationToken)
        {
            var rentListing = await _rentListingRepository.GetAsync(request.id, cancellationToken);

            if(rentListing is null) 
            { 
                return Result.Failure<RentListingDTO>(DomainErrors.RentListing.NotFound(request.id));
            }

            return rentListing;
        }
    }
}
