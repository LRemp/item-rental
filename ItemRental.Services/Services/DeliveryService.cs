using AutoMapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Services
{
    public class DeliveryService : IDeliveryService
    {
        private readonly IDeliveryRepository deliveryRepository;
        private readonly IOrderRepository orderRepository;
        private readonly IEventLogRepository eventLogRepository;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        public DeliveryService(IDeliveryRepository deliveryRepository, IOrderRepository orderRepository, IEventLogRepository eventLogRepository,  IMapper mapper, IUserRepository userRepository)
        {
            this.deliveryRepository = deliveryRepository;
            this.orderRepository = orderRepository;
            this.eventLogRepository = eventLogRepository;
            this.mapper = mapper;
            this.userRepository = userRepository;
        }
        public Task<bool> AddAsync(Delivery delivery, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CompleteDeliveryAsync(Guid id, CancellationToken cancellationToken)
        {
            var order = await orderRepository.GetInternalAsync(id, cancellationToken);

            if(order.Status == OrderStatus.Delivering)
            {
                var delivery = await deliveryRepository.GetByOrderAndRoleAsync(id, OrderRole.Merchant, cancellationToken);
                delivery.Completed = true;
                await deliveryRepository.UpdateAsync(delivery, cancellationToken);

                order.Status = OrderStatus.InProgress;
                await orderRepository.UpdateAsync(order, cancellationToken);

                await eventLogRepository.AddAsync(DomainEventLogs.Order.Delivered(Guid.NewGuid(), id), cancellationToken);
                userRepository.AddNotificationAsync(DomainNotifications.Order.Delivered(order.User, order.Id), cancellationToken);
                return true;
            }
            else if(order.Status == OrderStatus.Returning)
            {
                var delivery = await deliveryRepository.GetByOrderAndRoleAsync(id, OrderRole.Customer, cancellationToken);
                delivery.Completed = true;
                await deliveryRepository.UpdateAsync(delivery, cancellationToken);

                order.Status = OrderStatus.Completed;
                await orderRepository.UpdateAsync(order, cancellationToken);

                await eventLogRepository.AddAsync(DomainEventLogs.Order.Returned(Guid.NewGuid(), id), cancellationToken);
                await eventLogRepository.AddAsync(DomainEventLogs.Order.Complete(Guid.NewGuid(), id), cancellationToken);
                userRepository.AddNotificationAsync(DomainNotifications.Order.Returned(order.User, order.Id), cancellationToken);
                userRepository.AddNotificationAsync(DomainNotifications.Order.Completed(order.User, order.Id), cancellationToken);
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var result = await deliveryRepository.DeleteAsync(id, cancellationToken);
            return result;
        }

        public async Task<DeliveryDTO?> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            var delivery = await deliveryRepository.GetAsync(id, cancellationToken);
            DeliveryDTO deliveryDTO = mapper.Map<DeliveryDTO>(delivery);
            return deliveryDTO;
        }

        public async Task<DeliveryDTO?> GetByOrderAsync(Guid id, OrderRole? role, CancellationToken cancellationToken)
        {
            var order = await orderRepository.GetInternalAsync(id, cancellationToken);

            if(role is not null)
            {
                var delivery = await deliveryRepository.GetByOrderAndRoleAsync(id, role.Value, cancellationToken);
                DeliveryDTO deliveryDTO = mapper.Map<DeliveryDTO>(delivery);
                return deliveryDTO;
            }
            else if (order.Status == OrderStatus.Delivering)
            {
                var delivery = await deliveryRepository.GetByOrderAndRoleAsync(id, OrderRole.Merchant, cancellationToken);
                DeliveryDTO deliveryDTO = mapper.Map<DeliveryDTO>(delivery);
                return deliveryDTO;
            } 
            else if (order.Status == OrderStatus.Returning)
            {
                var delivery = await deliveryRepository.GetByOrderAndRoleAsync(id, OrderRole.Customer, cancellationToken);
                DeliveryDTO deliveryDTO = mapper.Map<DeliveryDTO>(delivery);
                return deliveryDTO;
            }

            return null;
        }

        public async Task<bool> UpdateAsync(UpdateDeliveryDTO updateDeliveryDTO, Guid id, CancellationToken cancellationToken)
        {
            var order = await orderRepository.GetInternalAsync(id, cancellationToken);

            if (order.Status == OrderStatus.Accepted || order.Status == OrderStatus.Delivering)
            {
                var delivery = await deliveryRepository.GetByOrderAndRoleAsync(id, OrderRole.Merchant, cancellationToken);
                if (delivery is null)
                {
                    await deliveryRepository.AddAsync(new Delivery
                    {
                        Id = Guid.NewGuid(),
                        Order = id,
                        Type = order.DeliveryType,
                        Role = OrderRole.Merchant,
                        Location = updateDeliveryDTO.Location,
                        ShippingProvider = updateDeliveryDTO.ShippingProvider,
                        ShippingId = updateDeliveryDTO.ShippingId,
                        Comment = updateDeliveryDTO.Comment
                    }, cancellationToken);
                    await eventLogRepository.AddAsync(DomainEventLogs.Order.Dispatched(Guid.NewGuid(), id), cancellationToken);
                    userRepository.AddNotificationAsync(DomainNotifications.Order.Dispatched(order.User, order.Id), cancellationToken);
                }
                else
                {
                    delivery.Location = updateDeliveryDTO.Location;
                    delivery.ShippingProvider = updateDeliveryDTO.ShippingProvider;
                    delivery.ShippingId = updateDeliveryDTO.ShippingId;
                    delivery.Comment = updateDeliveryDTO.Comment;
                    await deliveryRepository.UpdateAsync(delivery, cancellationToken);
                }
                order.Status = OrderStatus.Delivering;
                await orderRepository.UpdateAsync(order, cancellationToken);

                
                return true;
            }
            else if (order.Status == OrderStatus.InProgress || order.Status == OrderStatus.Returning)
            {
                var delivery = await deliveryRepository.GetByOrderAndRoleAsync(id, OrderRole.Customer, cancellationToken);
                if (delivery is null)
                {
                    await deliveryRepository.AddAsync(new Delivery
                    {
                        Id = Guid.NewGuid(),
                        Order = id,
                        Type = order.DeliveryType,
                        Role = OrderRole.Customer,
                        Location = updateDeliveryDTO.Location,
                        ShippingProvider = updateDeliveryDTO.ShippingProvider,
                        ShippingId = updateDeliveryDTO.ShippingId,
                        Comment = updateDeliveryDTO.Comment
                    }, cancellationToken);

                    await eventLogRepository.AddAsync(DomainEventLogs.Order.ReturnDispatched(Guid.NewGuid(), id), cancellationToken);
                }
                else
                {
                    delivery.Location = updateDeliveryDTO.Location;
                    delivery.ShippingProvider = updateDeliveryDTO.ShippingProvider;
                    delivery.ShippingId = updateDeliveryDTO.ShippingId;
                    delivery.Comment = updateDeliveryDTO.Comment;
                    await deliveryRepository.UpdateAsync(delivery, cancellationToken);
                }
                order.Status = OrderStatus.Returning;
                await orderRepository.UpdateAsync(order, cancellationToken);
                return true;
            }

            return false;
        }
    }
}
