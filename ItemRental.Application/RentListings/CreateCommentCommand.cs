using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.RentListings
{
    public sealed record CreateCommentCommand(Guid resource, Guid user, string text) : ICommand<Guid>;
    public class CreateCommentCommandHandler : ICommandHandler<CreateCommentCommand, Guid>
    {
        private readonly IRentListingRepository rentListingRepository;
        public CreateCommentCommandHandler(IRentListingRepository rentListingRepository)
        {
            this.rentListingRepository = rentListingRepository;
        }
        public async Task<Result<Guid>> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = new Comment
            {
                Id = Guid.NewGuid(),
                Resource = request.resource,
                User = request.user,
                Text = request.text,
                CreatedAt = DateTime.UtcNow
            };

            var success = await rentListingRepository.AddCommentAsync(comment, cancellationToken);

            if(!success)
            {
                return Result.Failure<Guid>(DomainErrors.Comment.FailedToCreate);
            }

            return comment.Id;
        }
    }
}
