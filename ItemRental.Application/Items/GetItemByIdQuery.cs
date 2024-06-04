using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
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
    public sealed record GetItemByIdQuery(Guid id) : IQuery<ItemDTO>;
    public class GetItemByIdQueryHandler : IQueryHandler<GetItemByIdQuery, ItemDTO>
    {
        private readonly IItemRepository _itemRepository;
        private readonly IOrderRepository orderRepository;
        public GetItemByIdQueryHandler(IItemRepository itemRepository, IOrderRepository orderRepository)
        {
            _itemRepository = itemRepository;
            this.orderRepository = orderRepository;
        }
        public async Task<Result<ItemDTO>> Handle(GetItemByIdQuery request, CancellationToken cancellationToken)
        {
            var item = await _itemRepository.GetAsync(request.id, cancellationToken);

            if(item is null)
            {
                return Result.Failure<ItemDTO>(DomainErrors.Item.NotFound);
            }

            var orders = await orderRepository.GetOrdersOfItemAsync(request.id, cancellationToken);

            var itemDTO = new ItemDTO
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Category = item.Category,
                Images = item.Images is null ? null : JsonConvert.DeserializeObject<string[]>(item.Images),
                Tags = item.Tags is null ? null : JsonConvert.DeserializeObject<string[]>(item.Tags),
                Details = item.Details is null ? null : JsonConvert.DeserializeObject<Specification[]>(item.Details),
                Orders = orders
            };

            return Result.Success(itemDTO);
        }
    }
}
