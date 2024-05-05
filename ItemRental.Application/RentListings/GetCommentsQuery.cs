using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.RentListings
{
    public sealed record GetCommentsQuery(Guid resource) : IQuery<List<CommentDTO>>;
    public class GetCommentsQueryHandler : IQueryHandler<GetCommentsQuery, List<CommentDTO>>
    {
        private readonly IRentListingRepository rentListingRepository;
        public GetCommentsQueryHandler(IRentListingRepository rentListingRepository)
        {
            this.rentListingRepository = rentListingRepository;
        }
        public async Task<Result<List<CommentDTO>>> Handle(GetCommentsQuery request, CancellationToken cancellationToken)
        {
            var result = await rentListingRepository.GetCommentsAsync(request.resource, cancellationToken);

            return result;
        }
    }
}
