using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IEventLogRepository
    {
        public Task<EventLog?> GetAsync(Guid id, CancellationToken cancellationToken);
        public Task<List<EventLog>> GetAllAsync(string id, CancellationToken cancellationToken);
        public Task<bool> AddAsync(EventLog eventLog, CancellationToken cancellationToken);
        public Task<bool> UpdateAsync(EventLog eventLog, CancellationToken cancellationToken);
        public Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
    }
}
