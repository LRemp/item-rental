using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Users
{
    public record GetVerificationRequestsQuery() : IQuery<List<VerificationRequestDTO>>;
    public class GetVerificationRequestsQueryHandler : IQueryHandler<GetVerificationRequestsQuery, List<VerificationRequestDTO>>
    {
        private readonly IUserRepository userRepository;
        public GetVerificationRequestsQueryHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<Result<List<VerificationRequestDTO>>> Handle(GetVerificationRequestsQuery request, CancellationToken cancellationToken)
        {            
            var verifications = await userRepository.GetProfileVerificationRequestsAsync(cancellationToken);

            return verifications;
        }
    }
}
