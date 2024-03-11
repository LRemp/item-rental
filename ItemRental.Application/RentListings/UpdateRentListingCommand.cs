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
    public sealed record UpdateRentListingCommand(UpdateRentListingDTO UpdateRentListingDTO, Guid user) : ICommand<Result>;
    internal class UpdateRentListingCommandHandler : ICommandHandler<UpdateRentListingCommand, Result>
    {
        public Task<Result<Result>> Handle(UpdateRentListingCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
