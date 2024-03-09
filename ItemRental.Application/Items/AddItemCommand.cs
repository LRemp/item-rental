using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Errors;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Items
{
    public sealed record AddItemCommand(Guid user, ItemDTO item) : ICommand;

    public sealed class AddItemCommandHandler : ICommandHandler<AddItemCommand>
    {
        private IItemRepository _itemRepository;
        public AddItemCommandHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        public async Task<Result> Handle(AddItemCommand command, CancellationToken cancellationToken)
        {
            Item item = new Item
            {
                Id = Guid.NewGuid(),
                Name = command.item.Name,
                Description = command.item.Description,
                Owner = command.user
            };

            bool success = await _itemRepository.AddAsync(item, cancellationToken);

            if (!success)
            {
                return Result.Failure(DomainErrors.Item.FailedToCreate);
            }

            return Result.Success();
        }
    }
}
