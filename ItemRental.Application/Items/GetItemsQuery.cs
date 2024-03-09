using AutoMapper;
using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Items
{
    public sealed record GetItemsQuery(Guid user) : IQuery<List<ItemDTO>>;
    public class GetItemsQueryHandler : IQueryHandler<GetItemsQuery, List<ItemDTO>>
    {
        private readonly IItemRepository _itemRepository;
        private readonly IMapper _mapper;
        public GetItemsQueryHandler(IItemRepository itemRepository, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }
        public async Task<Result<List<ItemDTO>>> Handle(GetItemsQuery request, CancellationToken cancellationToken)
        {
            var items = await _itemRepository.GetByOwnerAsync(request.user, cancellationToken);

            List<ItemDTO> itemDTOs = _mapper.Map<List<ItemDTO>>(items);

            return itemDTOs;
        }
    }
}
