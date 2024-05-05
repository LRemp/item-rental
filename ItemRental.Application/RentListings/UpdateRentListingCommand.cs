using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
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
    public sealed record UpdateRentListingCommand(UpdateRentListingDTO UpdateRentListingDTO, Guid user) : ICommand;
    internal class UpdateRentListingCommandHandler : ICommandHandler<UpdateRentListingCommand>
    {
        private readonly IRentListingRepository _rentListingRepository;
        public UpdateRentListingCommandHandler(IRentListingRepository rentListingRepository)
        {
            _rentListingRepository = rentListingRepository;
        }
        public async Task<Result> Handle(UpdateRentListingCommand request, CancellationToken cancellationToken)
        {
            var rentListing = await _rentListingRepository.GetInternalAsync(request.UpdateRentListingDTO.Id, cancellationToken);

            if (rentListing is null)
            {
                return Result.Failure(DomainErrors.RentListing.NotFound);
            }
            
            if (rentListing.Renter != request.user)
            {
                return Result.Failure(DomainErrors.RentListing.NotRenter);
            }

            var updateRentListing = new RentListing
            {
                Id = request.UpdateRentListingDTO.Id,
                Renter = request.user,
                Title = request.UpdateRentListingDTO.Title,
                Description = request.UpdateRentListingDTO.Description,
                Location = request.UpdateRentListingDTO.Location,
                Price = request.UpdateRentListingDTO.Price,
            };

            var success = await _rentListingRepository.UpdateAsync(updateRentListing, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.RentListing.FailedToUpdate);
            } 

            return Result.Success();
        }
    }
}
