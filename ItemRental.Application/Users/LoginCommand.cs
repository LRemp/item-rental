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
using ItemRental.Core.DTOs;
using AutoMapper;
using ItemRental.Core.Domain;

namespace ItemRental.Application.Users
{
    public record LoginResponse(string Token, UserDTO User);
    public record LoginCommand(string Email, string Password) : ICommand<LoginResponse>;
    internal sealed class LoginCommandHandler : ICommandHandler<LoginCommand, LoginResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IJwtTokenService _jwtProvider;
        public LoginCommandHandler(IUserRepository userRepository, IUserService userService, IJwtTokenService jwtProvider)
        {
            _userRepository = userRepository;
            _userService = userService;
            _jwtProvider = jwtProvider;
        }

        public async Task<Result<LoginResponse>> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            User? user = await _userRepository.GetByEmailOrUsernameAsync(command.Email, cancellationToken);

            if(user is null)
            {
                return Result.Failure<LoginResponse>(DomainErrors.User.NotFound);
            }

            var isPasswordValid = await _userService.VerifyPasswordHash(command.Password, user.Password);

            if(!isPasswordValid)
            {
                return Result.Failure<LoginResponse>(DomainErrors.User.InvalidCredentials);
            }

            var roles = await _userService.GetUserRoles(user.Id, cancellationToken);

            //TODO: add user roles to the token generation
            string token = await _jwtProvider.CreateAccessToken(user, roles);

            UserDTO userDTO = new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                AvatarURL = user.AvatarURL,
            };

            return new LoginResponse(token, userDTO);
        }
    }
}
