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
    public sealed record GetRentListingsQuery(string? searchArgument, string? category, bool? ownerListings, Guid? userId, int? page) : IQuery<PaginatedResult<List<RentListingDTO>>>;
    internal class GetRentListingsQueryHandler : IQueryHandler<GetRentListingsQuery, PaginatedResult<List<RentListingDTO>>>
    {
        private readonly IRentListingRepository _rentListingRepository;
        public GetRentListingsQueryHandler(IRentListingRepository rentListingRepository)
        {
            _rentListingRepository = rentListingRepository;
        }
        public async Task<Result<PaginatedResult<List<RentListingDTO>>>> Handle(GetRentListingsQuery request, CancellationToken cancellationToken)
        {
            int page = request.page - 1 ?? 0;

            var paginatedResult = await _rentListingRepository.GetAsync(request.searchArgument, request.category, page, cancellationToken);

            return paginatedResult;
        }
    }
}
