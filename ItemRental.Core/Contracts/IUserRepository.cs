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
    public interface IUserRepository
    {
        public Task<User?> GetByEmailOrUsernameAsync(string email, CancellationToken cancellationToken);
        public Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken);
        public Task<bool> IsEmailAndUsernameUniqueAsync(string username, string email, CancellationToken cancellationToken);
        public Task<bool> AddAsync(User user, CancellationToken cancellationToken);
        public Task<bool> UpdateAsync(User user, CancellationToken cancellationToken);
        public Task<bool> AddNotificationAsync(Notification notification, CancellationToken cancellationToken);
        public Task<List<Notification>> GetNotificationsAsync(Guid user, CancellationToken cancellationToken);
        public Task<Notification?> GetNotificationAsync(Guid user, CancellationToken cancellationToken);
        public Task<bool> IsUserAdministrator(Guid id, CancellationToken cancellationToken);
        public Task<VerificationRequestDTO?> GetProfileVerificationRequestAsync(Guid user, CancellationToken cancellationToken);
        public Task<VerificationRequestDTO?> GetProfileVerificationRequestByIdAsync(Guid id, CancellationToken cancellationToken);
        public Task<List<VerificationRequestDTO>> GetProfileVerificationRequestsAsync(CancellationToken cancellationToken);
        public Task<bool> CreateVerificationRequestAsync(Guid user, CancellationToken cancellationToken);
        public Task<bool> UpdateProfileVerificationRequestAsync(Guid id, VerificationStatus status, CancellationToken cancelationToken);
        public Task<bool> CreateMessageAsync(Message message, CancellationToken cancellationToken);
        public Task<List<MessageDTO>> GetMessagesAsync(string resource, CancellationToken cancellationToken);
    }
}
