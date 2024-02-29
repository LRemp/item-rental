using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IUserService
    {
        public string GeneratePasswordHash(string password);
        public bool VerifyPasswordHash(string password, string passwordHash);
    }
}
