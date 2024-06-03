using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IDeliveryService
    {
        public Task<bool> AddAsync(Delivery delivery, CancellationToken cancellationToken);
        public Task<DeliveryDTO?> GetAsync(Guid id, CancellationToken cancellationToken);
        public Task<DeliveryDTO?> GetByOrderAsync(string id, OrderRole? role, CancellationToken cancellationToken);
        public Task<bool> CompleteDeliveryAsync(string id, CancellationToken cancellationToken);
        public Task<bool> UpdateAsync(UpdateDeliveryDTO updateDeliveryDTO, string id, CancellationToken cancellationToken);
        public Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
    }
}
