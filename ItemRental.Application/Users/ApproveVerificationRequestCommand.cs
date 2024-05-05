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
    public record ApproveVerificationRequestCommand(Guid id) : ICommand;
    public class ApproveVerificationRequestCommandHandler : ICommandHandler<ApproveVerificationRequestCommand>
    {
        private readonly IUserRepository _userRepository;
        public ApproveVerificationRequestCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<Result> Handle(ApproveVerificationRequestCommand request, CancellationToken cancellationToken)
        {
            var verification = await _userRepository.GetProfileVerificationRequestByIdAsync(request.id, cancellationToken);

            if(verification is null)
            {
                return Result.Failure(DomainErrors.User.VerificationRequestNotFound);
            }

            var success = await _userRepository.UpdateProfileVerificationRequestAsync(verification.Id, VerificationStatus.Approved, cancellationToken);

            var user = await _userRepository.GetByIdAsync(verification.User.Id, cancellationToken);
            
            if(user is null)
            {
                return Result.Failure(DomainErrors.User.NotFound);
            }

            user.Verified = true;
            var updateUser = await _userRepository.UpdateAsync(user, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.User.VerificationRequestApprovalFailed);
            }

            return Result.Success();
        }
    }
}
