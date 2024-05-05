using AutoMapper;
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
    public sealed record GetUserByUsernameQuery(string username) : IQuery<UserDTO>;
    public class GetUserByUsernameQueryHandler : IQueryHandler<GetUserByUsernameQuery, UserDTO>
    {
        private readonly IUserService _userService;
        public GetUserByUsernameQueryHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<Result<UserDTO>> Handle(GetUserByUsernameQuery request, CancellationToken cancellationToken)
        {
            var user = await _userService.GetUserProfile(request.username, cancellationToken);
            
            if(user is null)
            {
                return Result.Failure<UserDTO>(DomainErrors.User.NotFound);
            }

            return user;
        }
    }
}
