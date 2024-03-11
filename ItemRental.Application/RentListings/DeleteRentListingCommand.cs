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
    public sealed record DeleteRentListingCommand(DeleteRentListingDTO deleteRentListingDTO, Guid user) : ICommand;
    internal class DeleteRentListingCommandHandler : ICommandHandler<DeleteRentListingCommand>
    {
        private readonly IRentListingRepository _rentListingRepository;
        public DeleteRentListingCommandHandler(IRentListingRepository rentListingRepository)
        {
            _rentListingRepository = rentListingRepository;
        }
        public async Task<Result> Handle(DeleteRentListingCommand request, CancellationToken cancellationToken)
        {
            var rentListing = await _rentListingRepository.GetInternalAsync(request.deleteRentListingDTO.Id, cancellationToken);

            if(rentListing is null)
            {
                return Result.Failure(DomainErrors.RentListing.NotFound(request.deleteRentListingDTO.Id));
            }

            if(rentListing.Renter != request.user)
            {
                return Result.Failure(DomainErrors.RentListing.NotRenter(request.deleteRentListingDTO.Id));
            }

            var success = await _rentListingRepository.DeleteAsync(request.deleteRentListingDTO.Id, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.RentListing.FailedToDelete(request.deleteRentListingDTO.Id));
            }

            return Result.Success();
        }
    }
}
