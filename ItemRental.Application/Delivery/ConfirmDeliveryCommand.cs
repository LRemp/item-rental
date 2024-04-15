using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Delivery
{
    public sealed record ConfirmDeliveryCommand(Guid id, Guid user) : ICommand;
    public class ConfirmDeliveryCommandHandler : ICommandHandler<ConfirmDeliveryCommand>
    {
        private readonly IDeliveryService deliveryService;
        public ConfirmDeliveryCommandHandler(IDeliveryService deliveryService)
        {
            this.deliveryService = deliveryService;
        }
        public async Task<Result> Handle(ConfirmDeliveryCommand request, CancellationToken cancellationToken)
        {
            var success = await deliveryService.CompleteDeliveryAsync(request.id, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.Order.FailedToConfirmDelivery);
            }

            return Result.Success();
        }
    }

}
