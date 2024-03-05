using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
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

            Result result = await _itemRepository.AddAsync(command.item);

            if (result.IsFailure)
            {
                return Result.Failure(result.Error);
            }

            return Result.Success();
        }
    }
}
