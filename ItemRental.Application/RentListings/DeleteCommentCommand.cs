using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.RentListings
{
    public sealed record DeleteCommentCommand(Guid id, Guid user) : ICommand;
    public class DeleteCommentCommandHandler : ICommandHandler<DeleteCommentCommand>
    {
        private readonly IRentListingRepository rentListingRepository;
        public DeleteCommentCommandHandler(IRentListingRepository rentListingRepository)
        {
            this.rentListingRepository = rentListingRepository;
        }
        public async Task<Result> Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
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
            
            var success = await rentListingRepository.DeleteCommentAsync(request.id, cancellationToken);

            if(!success) {
                return Result.Failure(DomainErrors.Comment.Failed);
            }

            return Result.Success();
        }
    }
}
