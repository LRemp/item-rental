using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.RentListings
{
    public sealed record DeleteRentListingCommand(DeleteRentListingCommand deleteRentListingDTO, Guid user) : ICommand;
    internal class DeleteRentListingCommandHandler : ICommandHandler<DeleteRentListingCommand>
    {
        public Task<Result> Handle(DeleteRentListingCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
