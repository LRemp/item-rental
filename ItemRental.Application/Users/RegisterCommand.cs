using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Users
{
    public record RegisterCommand(string Username, string Email, string Password) : ICommand<Guid>;
    internal sealed class RegisterCommandHandler : ICommandHandler<RegisterCommand, Guid>
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        public RegisterCommandHandler(IUserRepository userRepository, IUserService userService)
        {
            _userRepository = userRepository;
            _userService = userService;
        }
        public async Task<Result<Guid>> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            bool isUnique = await _userRepository.IsEmailAndUsernameUniqueAsync(request.Username, request.Email, cancellationToken);
            
            if(!isUnique)
            {
                return Result.Failure<Guid>(DomainErrors.User.EmailOrUsernameAlreadyInUse);
            }

            var passwordHash = _userService.GeneratePasswordHash(request.Password);

            var user = new User {
                Id = Guid.NewGuid(),
                Username = request.Username,
                Email = request.Email,
                Password = passwordHash
            };

            var isSuccess = await _userRepository.AddAsync(user, cancellationToken);
            if (!isSuccess)
            {
                //return Result.Failure();
            }

            return user.Id;
        }
    }
}
