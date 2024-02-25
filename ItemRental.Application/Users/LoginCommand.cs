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
using ItemRental.Core.Errors;

namespace ItemRental.Application.Users
{
    public record LoginCommand(string Email) : ICommand<string>;
    public record LoginRequest(string Email);
    internal sealed class LoginCommandHandler : ICommandHandler<LoginCommand, string>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtProvider _jwtProvider;
        public LoginCommandHandler(IUserRepository userRepository, IJwtProvider jwtProvider)
        {
            _userRepository = userRepository;
            _jwtProvider = jwtProvider;
        }

        public async Task<Result<string>> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            User? user = await _userRepository.GetByEmailAsync(command.Email, cancellationToken);

            if(user is null)
            {
                return Result.Failure<string>(DomainErrors.User.InvalidCredentials);
            }

            string token = _jwtProvider.Generate(user);

            return token;
        }
    }
}
