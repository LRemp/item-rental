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
        public Task<User?> GetByEmailOrUsernameAsync(string email, CancellationToken cancellationToken);
        public Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken);
        public Task<bool> IsEmailAndUsernameUniqueAsync(string username, string email, CancellationToken cancellationToken);
        public Task<bool> AddAsync(User user, CancellationToken cancellationToken);
        public Task<bool> AddNotificationAsync(Notification notification, CancellationToken cancellationToken);
        public Task<List<Notification>> GetNotificationsAsync(Guid user, CancellationToken cancellationToken);
        public Task<Notification?> GetNotificationAsync(Guid user, CancellationToken cancellationToken);
    }
}
