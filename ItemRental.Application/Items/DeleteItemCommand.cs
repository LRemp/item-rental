using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Items
{
    public sealed record DeleteItemCommand(Guid itemId, Guid userId) : ICommand;
    public class DeleteItemCommandHandler : ICommandHandler<DeleteItemCommand>
    {
        private readonly IItemRepository _itemRepository;
        public DeleteItemCommandHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        public async Task<Result> Handle(DeleteItemCommand request, CancellationToken cancellationToken)
        {
            var item = await _itemRepository.GetAsync(request.itemId, cancellationToken);

            if(item is null)
            {
                return Result.Failure(DomainErrors.Item.NotFound(request.itemId));
            }

            if(item.Owner != request.userId)
            {
                return Result.Failure(DomainErrors.Item.NotOwner(request.itemId));
            }

            var success = await _itemRepository.DeleteAsync(request.itemId, cancellationToken);

            if (!success)
            {
                return Result.Failure(DomainErrors.Item.FailedToDelete(request.itemId));
            }
            
            return Result.Success();
        }
    }
}
