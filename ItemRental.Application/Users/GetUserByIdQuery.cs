using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.Errors;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Users
{
    public sealed record UserResponse(Guid Id, string Username, string Email);
    public sealed record GetUserByIdQuery(Guid Id) : IQuery<UserResponse>;
    internal class GetUserByIdQueryHandler : IQueryHandler<GetUserByIdQuery, UserResponse>
    {
        private readonly IUserRepository _userRepository;
        public GetUserByIdQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Result<UserResponse>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(request.Id, cancellationToken);
            
            if(user is null)
            {
                return Result.Failure<UserResponse>(DomainErrors.User.NotFound(request.Id));
            }

            var response = new UserResponse(user.Id, user.Username, user.Email);

            return response;
        }
    }
}
