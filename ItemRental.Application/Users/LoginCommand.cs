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
    public record LoginCommand(string Email, string Password) : ICommand<string>;
    public record LoginRequest(string Email, string Password);
    internal sealed class LoginCommandHandler : ICommandHandler<LoginCommand, string>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenService _jwtProvider;
        public LoginCommandHandler(IUserRepository userRepository, IJwtTokenService jwtProvider)
        {
            _userRepository = userRepository;
            _jwtProvider = jwtProvider;
        }

        public async Task<Result<string>> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            User? user = await _userRepository.GetByEmailOrUsernameAsync(command.Email, cancellationToken);

            if(user is null)
            {
                return Result.Failure<string>(DomainErrors.User.InvalidCredentials);
            }

            //TODO: add user roles to the token generation
            string token = _jwtProvider.CreateAccessToken(user, new List<string>());

            return token;
        }
    }
}
