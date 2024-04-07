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

namespace ItemRental.Application.Delivery
{
    public sealed record UpdateDeliveryCommand(Guid id, Guid user, UpdateDeliveryDTO updateDeliveryDTO) : ICommand;
    public class UpdateDeliveryCommandHandler : ICommandHandler<UpdateDeliveryCommand>
    {
        private readonly IDeliveryService deliveryService;
        public UpdateDeliveryCommandHandler(IDeliveryService deliveryService)
        {
            this.deliveryService = deliveryService;
        }
        public async Task<Result> Handle(UpdateDeliveryCommand request, CancellationToken cancellationToken)
        {
            //TODO: user validation
            var success = await deliveryService.UpdateAsync(request.updateDeliveryDTO, request.id, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.Order.NotInTransit);
            }

            return Result.Success();
        }
    }
}
