using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IJwtTokenService
    {
        public Task<string> CreateAccessToken(User user, List<string> userRoles);
        public Guid GetTokenSubject(string token);
    }
}
