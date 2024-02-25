using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Users
{
    public record RegisterCommand(string Username, string Email, string Password);
    internal class RegisterCommandHandler
    {
    }
}
