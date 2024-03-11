using ItemRental.Core.DTOs;
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
        public Task<Result<Guid>> Handle(AddRentListingCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
