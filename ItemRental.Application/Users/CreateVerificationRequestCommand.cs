using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Users
{
    public record CreateVerificationRequestCommand(Guid user) : ICommand;
    public class CreateVerificationRequestCommandHandler : ICommandHandler<CreateVerificationRequestCommand>
    {
        private readonly IUserRepository userRepository;
        public CreateVerificationRequestCommandHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<Result> Handle(CreateVerificationRequestCommand request, CancellationToken cancellationToken)
        {
            var verification = await userRepository.GetProfileVerificationRequestAsync(request.user, cancellationToken);

            if (verification is not null)
            {
                return Result.Failure(DomainErrors.User.VerificationRequestAlreadyExists);
            }

            var success = await userRepository.CreateVerificationRequestAsync(request.user, cancellationToken);

            if (!success)
            {
                return Result.Failure(DomainErrors.User.VerificationRequestCreationFailed);
            }

            return Result.Success();
        }
    }
}
