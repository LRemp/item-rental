using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Items
{
    public sealed record UpdateCategoryCommand(Guid id, CategoryDTO categoryDTO) : ICommand;
    public class UpdateCategoryCommandHandler : ICommandHandler<UpdateCategoryCommand>
    {
        private readonly IItemRepository itemRepository;
        public UpdateCategoryCommandHandler(IItemRepository itemRepository)
        {
            this.itemRepository = itemRepository;
        }
        public async Task<Result> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = new Category
            {
                Id = request.id,
                Name = request.categoryDTO.Name,
                Label = request.categoryDTO.Label,
                Parent = request.categoryDTO.Parent,
                Scheme = null,
            };
            var success = await itemRepository.UpdateCategoryAsync(category, cancellationToken);

            if (!success)
            {
                return Result.Failure(DomainErrors.Category.FailedToUpdate);
            }

            return Result.Success();
        }
    }
}
