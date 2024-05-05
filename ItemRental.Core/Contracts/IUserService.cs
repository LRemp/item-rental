using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IUserService
    {
        public string GeneratePasswordHash(string password);
        public Task<bool> VerifyPasswordHash(string password, string passwordHash);
        public Task<UserDTO?> GetUserProfile(string username, CancellationToken cancellationToken);
        public Task<List<NotificationDTO>> GetNotificationsAsync(Guid user, CancellationToken cancellationToken);
        public Task<List<string>> GetUserRoles(Guid id, CancellationToken cancellationToken);
    }
}
