using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IItemRepository
    {
        public Task<bool> AddAsync(Item item, CancellationToken cancellationToken);
        public Task<Item?> GetAsync(Guid id, CancellationToken cancellationToken);
        public Task<List<Item>> GetAsync(CancellationToken cancellationToken);
        public Task<List<Item>> GetByOwnerAsync(Guid owner, CancellationToken cancellationToken);
        public Task<bool> UpdateAsync(Item item, CancellationToken cancellationToken);
        public Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);

        public Task<List<CategoryDTO>> GetCategoriesAsync(CancellationToken cancellationToken);
    }
}
