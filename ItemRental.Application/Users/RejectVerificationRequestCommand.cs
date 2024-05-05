using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
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
    public record RejectVerificationRequestCommand(Guid id) : ICommand;
    public class RejectVerificationRequestCommandHandler : ICommandHandler<RejectVerificationRequestCommand>
    {
        private readonly IUserRepository _userRepository;
        public RejectVerificationRequestCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<Result> Handle(RejectVerificationRequestCommand request, CancellationToken cancellationToken)
        {
            var verification = await _userRepository.GetProfileVerificationRequestByIdAsync(request.id, cancellationToken);

            if (verification is null)
            {
                return Result.Failure(DomainErrors.User.VerificationRequestNotFound);
            }

            var success = await _userRepository.UpdateProfileVerificationRequestAsync(verification.Id, VerificationStatus.Rejected, cancellationToken);

            if (!success)
            {
                return Result.Failure(DomainErrors.User.VerificationRequestApprovalFailed);
            }

            return Result.Success();
        }
    }
}
