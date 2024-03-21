using AutoMapper;
using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using Newtonsoft.Json;
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

            List<ItemDTO> itemDTOs = new List<ItemDTO>();
            foreach (var item in items)
            {
                itemDTOs.Add(new ItemDTO
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Images = item.Images is null ? null : JsonConvert.DeserializeObject<string[]>(item.Images),
                    Tags = item.Tags,
                    Details = item.Details is null ? null : JsonConvert.DeserializeObject<Specification[]>(item.Details)
                });
            }

            return itemDTOs;
        }
    }
}
