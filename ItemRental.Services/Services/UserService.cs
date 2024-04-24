using AutoMapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
        }
        public string GeneratePasswordHash(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public async Task<List<NotificationDTO>> GetNotificationsAsync(Guid user, CancellationToken cancellationToken)
        {
            var notifications = await userRepository.GetNotificationsAsync(user, cancellationToken);
            return mapper.Map<List<NotificationDTO>>(notifications);
        }

        public async Task<List<string>> GetUserRoles(Guid id, CancellationToken cancellationToken)
        {
            List<string> roles = new List<string>();

            if(await userRepository.IsUserAdministrator(id, cancellationToken))
            {
                roles.Add("Administrator");
            }

            return roles;
        }

        public bool VerifyPasswordHash(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}
