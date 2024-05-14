using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Items
{
    public sealed record AddCategoryCommand(CategoryDTO categoryDTO) : ICommand<Guid>;
    public class AddCategoryCommandHandler: ICommandHandler<AddCategoryCommand, Guid>
    {
        private readonly IItemRepository itemRepository;
        public AddCategoryCommandHandler(IItemRepository itemRepository)
        {
            this.itemRepository = itemRepository;
        }
        public async Task<Result<Guid>> Handle(AddCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = new Category
            {
                Id = Guid.NewGuid(),
                Name = request.categoryDTO.Name,
                Label = request.categoryDTO.Label,
                Parent = request.categoryDTO.Parent,
                Scheme = null,
            };

            var success = await itemRepository.AddCategoryAsync(category, cancellationToken);

            if(!success)
            {
                return Result.Failure<Guid>(DomainErrors.Category.FailedToCreate);
            }

            return Result.Success(category.Id);
        }
    }
}
