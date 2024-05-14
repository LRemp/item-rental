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
    public sealed record DeleteCategoryCommand(Guid Id) : ICommand;
    public class DeleteCategoryCommandHandler : ICommandHandler<DeleteCategoryCommand>
    {
        private readonly IItemRepository _itemRepository;
        public DeleteCategoryCommandHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        public async Task<Result> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var success = await _itemRepository.DeleteCategoryAsync(request.Id, cancellationToken);

            if (!success)
            {
                return Result.Failure(DomainErrors.Category.FailedToDelete);
            }

            return Result.Success();
        }
    }
}
