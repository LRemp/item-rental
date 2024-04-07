using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IDeliveryRepository
    {
        public Task<bool> AddAsync(Delivery delivery, CancellationToken cancellationToken);
        public Task<Delivery?> GetAsync(Guid id, CancellationToken cancellationToken);
        public Task<Delivery?> GetByOrderAndRoleAsync(Guid order, OrderRole role, CancellationToken cancellationToken);
        public Task<List<Delivery>> GetByOrderAsync(Guid order, CancellationToken cancellationToken);
        public Task<bool> UpdateAsync(Delivery delivery, CancellationToken cancellationToken);
        public Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
    }
}
