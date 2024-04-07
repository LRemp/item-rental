using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Errors;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Delivery
{
    public sealed record GetDeliveryQuery(Guid id, Guid user) : IQuery<DeliveryDTO?>;
    public class GetDeliveryQueryHandler : IQueryHandler<GetDeliveryQuery, DeliveryDTO>
    {
        private readonly IDeliveryService deliveryService;
        public GetDeliveryQueryHandler(IDeliveryService deliveryService) 
        {
            this.deliveryService = deliveryService;
        }
        public async Task<Result<DeliveryDTO?>> Handle(GetDeliveryQuery request, CancellationToken cancellationToken)
        {
            //TODO: check if allowed
            var delivery = await deliveryService.GetByOrderAsync(request.id, cancellationToken);

            if(delivery is null)
            {
                return Result.Failure<DeliveryDTO?>(DomainErrors.Order.NotInTransit);
            }
            
            return delivery;
        }
    }
}