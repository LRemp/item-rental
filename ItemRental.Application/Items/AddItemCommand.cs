using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Items
{
    public sealed record AddItemCommand(Guid user, AddItemDTO item) : ICommand<Guid>;

    public sealed class AddItemCommandHandler : ICommandHandler<AddItemCommand, Guid>
    {
        private IItemRepository _itemRepository;
        public AddItemCommandHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        public async Task<Result<Guid>> Handle(AddItemCommand command, CancellationToken cancellationToken)
        {
            Item item = new Item
            {
                Id = Guid.NewGuid(),
                Name = command.item.Name,
                Description = command.item.Description,
                Category = command.item.Category,
                Images = JsonConvert.SerializeObject(command.item.Images),
                Owner = command.user,
                Details = JsonConvert.SerializeObject(command.item.Details),
            };

            bool success = await _itemRepository.AddAsync(item, cancellationToken);

            if (!success)
            {
                return Result.Failure<Guid>(DomainErrors.Item.FailedToCreate);
            }

            return Result.Success(item.Id);
        }
    }
}
