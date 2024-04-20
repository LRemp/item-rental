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
    public sealed record class UpdateCommentCommand(Guid id, Guid user, string text) : ICommand;
    public class UpdateCommentCommandHandler : ICommandHandler<UpdateCommentCommand>
    {
        private readonly IRentListingRepository rentListingRepository;
        public UpdateCommentCommandHandler(IRentListingRepository rentListingRepository)
        {
            this.rentListingRepository = rentListingRepository;
        }
        public async Task<Result> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = await rentListingRepository.GetCommentAsync(request.id, cancellationToken);

            if(comment is null)
            {
                return Result.Failure(DomainErrors.Comment.NotFound);
            }

            if(comment.User != request.user)
            {
                return Result.Failure(DomainErrors.Comment.Unauthorized);
            }

            var success = await rentListingRepository.UpdateCommentAsync(new Comment
            {
                Id = request.id,
                Resource = comment.Resource,
                User = comment.User,
                Text = request.text,
                CreatedAt = comment.CreatedAt
            }, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.Comment.Failed);
            }

            return Result.Success();
        }
    }
}
