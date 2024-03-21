using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Items
{
    public sealed record GetCategoriesQuery() : IQuery<List<CategoryDTO>>;
    public class GetCategoriesQueryHandler : IQueryHandler<GetCategoriesQuery, List<CategoryDTO>>
    {
        private readonly IItemRepository _itemRepository;
        public GetCategoriesQueryHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public async Task<Result<List<CategoryDTO>>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
        {
            var categories = await _itemRepository.GetCategoriesAsync(cancellationToken);

            return categories;
        }
    }
}
