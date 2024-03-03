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
using ItemRental.Core.DTOs;
using AutoMapper;

namespace ItemRental.Application.Users
{
    public record LoginResponse(string Token, UserDTO User);
    public record LoginCommand(string Email, string Password) : ICommand<LoginResponse>;
    public record LoginRequest(string Email, string Password);
    internal sealed class LoginCommandHandler : ICommandHandler<LoginCommand, LoginResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IJwtTokenService _jwtProvider;
        private readonly IMapper _mapper;
        public LoginCommandHandler(IUserRepository userRepository, IUserService userService, IJwtTokenService jwtProvider, IMapper mapper)
        {
            _userRepository = userRepository;
            _userService = userService;
            _jwtProvider = jwtProvider;
            _mapper = mapper;
        }

        public async Task<Result<LoginResponse>> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            User? user = await _userRepository.GetByEmailOrUsernameAsync(command.Email, cancellationToken);

            if(user is null)
            {
                return Result.Failure<LoginResponse>(DomainErrors.User.InvalidCredentials);
            }

            var isPasswordValid = _userService.VerifyPasswordHash(command.Password, user.Password);

            if(!isPasswordValid)
            {
                return Result.Failure<LoginResponse>(DomainErrors.User.InvalidCredentials);
            }

            //TODO: add user roles to the token generation
            string token = _jwtProvider.CreateAccessToken(user, new List<string>());

            UserDTO userDTO = _mapper.Map<UserDTO>(user);

            return new LoginResponse(token, userDTO);
        }
    }
}
