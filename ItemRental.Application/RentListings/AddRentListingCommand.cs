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
using System.Windows.Input;

namespace ItemRental.Application.RentListings
{
    public sealed record AddRentListingCommand(AddRentListingDTO addRentListingDTO, Guid user) : ICommand<Guid>;
    public class AddRentListingCommandHandler : ICommandHandler<AddRentListingCommand, Guid>
    {
        private readonly IRentListingRepository _rentListingRepository;
        public AddRentListingCommandHandler(IRentListingRepository rentListingRepository)
        {
            _rentListingRepository = rentListingRepository;
        }
        public async Task<Result<Guid>> Handle(AddRentListingCommand request, CancellationToken cancellationToken)
        {
            RentListing rentListing = new RentListing
            {
                Id = Guid.NewGuid(),
                Item = request.addRentListingDTO.Item,
                Renter = request.user,
                Title = request.addRentListingDTO.Title,
                Description = request.addRentListingDTO.Description,
                Location = request.addRentListingDTO.Location,
                Price = request.addRentListingDTO.Price,
            };
            
            var success = await _rentListingRepository.AddAsync(rentListing, cancellationToken);

            if (!success)
            {
                return Result.Failure<Guid>(DomainErrors.RentListing.FailedToCreate);
            }

            return Result.Success(rentListing.Id);
        }
    }
}
