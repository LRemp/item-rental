using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Errors;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.RentListings
{
    public sealed record DeleteRentListingCommand(Guid id, Guid user) : ICommand;
    internal class DeleteRentListingCommandHandler : ICommandHandler<DeleteRentListingCommand>
    {
        private readonly IRentListingRepository _rentListingRepository;
        public DeleteRentListingCommandHandler(IRentListingRepository rentListingRepository)
        {
            _rentListingRepository = rentListingRepository;
        }
        public async Task<Result> Handle(DeleteRentListingCommand request, CancellationToken cancellationToken)
        {
            var rentListing = await _rentListingRepository.GetInternalAsync(request.id, cancellationToken);

            if(rentListing is null)
            {
                return Result.Failure(DomainErrors.RentListing.NotFound(request.id));
            }

            if(rentListing.Renter != request.user)
            {
                return Result.Failure(DomainErrors.RentListing.NotRenter(request.id));
            }

            var success = await _rentListingRepository.DeleteAsync(request.id, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.RentListing.FailedToDelete(request.id));
            }

            return Result.Success();
        }
    }
}
