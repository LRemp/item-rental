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
        private readonly IItemRepository itemRepository;
        private readonly IOrderService orderService;
        private readonly IRentListingService rentListingService;
        public DeleteItemCommandHandler(IItemRepository itemRepository, IOrderService orderService, IRentListingService rentListingService)
        {
            this.itemRepository = itemRepository;
            this.orderService = orderService;
            this.rentListingService = rentListingService;
        }
        public async Task<Result> Handle(DeleteItemCommand request, CancellationToken cancellationToken)
        {
            var item = await itemRepository.GetAsync(request.itemId, cancellationToken);

            if(item is null)
            {
                return Result.Failure(DomainErrors.Item.NotFound);
            }

            var isAuthorized = await IsAuthorized(request.itemId, request.userId, cancellationToken);
            if(!isAuthorized)
            {
                return Result.Failure(DomainErrors.Item.Unauthorized);
            }

            var includedInListing = await rentListingService.IsItemUsed(request.itemId, cancellationToken);

            if(includedInListing)
            {
                return Result.Failure(DomainErrors.Item.UsedInListing);
            }

            var usedInOrder = await orderService.IsItemInUse(request.itemId, cancellationToken);

            if(usedInOrder)
            {
                return Result.Failure(DomainErrors.Item.UsedInOrder);
            }

            var success = await itemRepository.DeleteAsync(request.itemId, cancellationToken);

            if (!success)
            {
                return Result.Failure(DomainErrors.Item.FailedToDelete);
            }
            
            return Result.Success();
        }
        public async Task<bool> IsAuthorized(Guid id, Guid user, CancellationToken cancellationToken)
        {
            var item = await itemRepository.GetAsync(id, cancellationToken);
            return item.Owner == user;
        }
    }
}
