using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IOrderRepository
    {
        public Task<bool> AddAsync(Order order, CancellationToken cancellationToken);
        public Task<List<OrderDTO>> GetUserAsync(Guid user, CancellationToken cancellationToken);
        public Task<OrderDTO?> GetAsync(Guid id, CancellationToken cancellationToken);
        public Task<Order?> GetInternalAsync(Guid id, CancellationToken cancellationToken);
        public Task<List<OrderDTO>> GetUserListingOrdersAsync(Guid id, Guid user, CancellationToken cancellationToken);
        public Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
        public Task<bool> UpdateAsync(Order order, CancellationToken cancellationToken);
    }
}
