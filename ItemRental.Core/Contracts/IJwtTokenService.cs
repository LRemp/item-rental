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
        public string CreateAccessToken(User user, List<string> userRoles);
    }
}
