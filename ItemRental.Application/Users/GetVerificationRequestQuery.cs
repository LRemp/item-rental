using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Users
{
    public record GetVerificationRequestQuery(Guid user) : IQuery<VerificationRequestDTO>;
    internal class GetVerificationRequestQueryHandler : IQueryHandler<GetVerificationRequestQuery, VerificationRequestDTO>
    {
        private readonly IUserRepository _userRepository;
        public GetVerificationRequestQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<Result<VerificationRequestDTO>> Handle(GetVerificationRequestQuery request, CancellationToken cancellationToken)
        {
            var verification = await _userRepository.GetProfileVerificationRequestAsync(request.user, cancellationToken);

            if(verification is null)
            {
                return Result.Failure<VerificationRequestDTO>(DomainErrors.User.VerificationRequestNotFound);
            }

            return verification;
        }
    }
}
