using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IItemRepository
    {
        public Task AddAsync(ItemDTO item);
        public Task<Item?> GetAsync(int id);
        public Task<List<Item>> GetAsync();
    }
}
