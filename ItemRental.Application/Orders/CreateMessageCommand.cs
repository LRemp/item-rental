using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;

namespace ItemRental.Application.Orders
{
    public sealed record CreateMessageCommand(string resource, Guid author, string text) : ICommand;
    public class CreateMessageCommandHandler : ICommandHandler<CreateMessageCommand>
    {
        private readonly IUserRepository userRepository;
        public CreateMessageCommandHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<Result> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            var message = new Message
            {
                Id = 0,
                Resource = request.resource,
                Author = request.author,
                Text = request.text,
                Created = DateTime.UtcNow,
            };

            var success = await userRepository.CreateMessageAsync(message, cancellationToken);

            if (!success)
            {
                return Result.Failure(DomainErrors.Order.FailedToCreateMessage);
            }

            return Result.Success();
        }
    }
}
