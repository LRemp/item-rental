using ItemRental.Core.Contracts;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace ItemRental.Application.Users
{
    public record LoginCommand(string Email) : ICommand<string>;
    public record LoginRequest(string Email);
    internal sealed class LoginCommandHandler : ICommandHandler<LoginCommand, string>
    {
        private readonly IUserRepository _userRepository;
        public LoginCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Result<string>> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            //Get member
            User? user = await _userRepository.GetByEmailAsync(command.Email);

            if(user == null)
            {
                //Return invalid result
            }

            //Generate JWT

            //Return JWT

            return "";
        }
    }
}
