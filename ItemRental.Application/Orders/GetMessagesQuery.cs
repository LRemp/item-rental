using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;

namespace ItemRental.Application.Orders
{
    public sealed record GetMessagesQuery(string resource, Guid user) : IQuery<List<MessageDTO>>;
    public class GetMessagesQueryHandler : IQueryHandler<GetMessagesQuery, List<MessageDTO>>
    {
        private readonly IUserRepository userRepository;
        public GetMessagesQueryHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<Result<List<MessageDTO>>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
        {
            var messages = await userRepository.GetMessagesAsync(request.resource, cancellationToken);

            return messages;
        }
    }
}
