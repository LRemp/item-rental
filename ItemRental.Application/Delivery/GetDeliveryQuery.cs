using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Enums;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Delivery
{
    public sealed record GetDeliveryQuery(Guid id, Guid user, OrderRole? role) : IQuery<DeliveryDTO?>;
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
            var delivery = await deliveryService.GetByOrderAsync(request.id, request.role, cancellationToken);
            
            return Result.Success(delivery);
        }
    }
}