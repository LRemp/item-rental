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
    public sealed record GetRentListingBusyDatesQuery(Guid id): IQuery<List<OrderDateDTO>>;
    public class GetRentListingBusyDatesQueryHandler : IQueryHandler<GetRentListingBusyDatesQuery, List<OrderDateDTO>>
    {
        private readonly IRentListingService rentListingService;
        public GetRentListingBusyDatesQueryHandler(IRentListingService rentListingService)
        {
            this.rentListingService = rentListingService;
        }
        public async Task<Result<List<OrderDateDTO>>> Handle(GetRentListingBusyDatesQuery request, CancellationToken cancellationToken)
        {
            var dates = await rentListingService.GetBusyDatesAsync(request.id, cancellationToken);

            return dates;
        }
    }
}
