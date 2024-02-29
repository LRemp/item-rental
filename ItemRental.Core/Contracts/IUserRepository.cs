using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IUserRepository
    {
        public Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken);
        public Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken);
        public Task<bool> IsEmailAndUsernameUniqueAsync(string username, string email);
        public Task<bool> AddAsync(User user);
    }
}
