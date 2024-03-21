using AutoMapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Errors;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Items
{
    public sealed record UpdateItemCommand(ItemDTO itemDTO, Guid userId) : ICommand;
    public class UpdateItemCommandHandler : ICommandHandler<UpdateItemCommand>
    {
        private readonly IItemRepository _itemRepository;
        public UpdateItemCommandHandler(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
        public async Task<Result> Handle(UpdateItemCommand request, CancellationToken cancellationToken)
        {
            Item item = new Item
            {
                Id = request.itemDTO.Id,
                Name = request.itemDTO.Name,
                Description = request.itemDTO.Description,
                Images = JsonConvert.SerializeObject(request.itemDTO.Images),
                Tags = request.itemDTO.Tags,
                Details = JsonConvert.SerializeObject(request.itemDTO.Details)
            };

            bool success = await _itemRepository.UpdateAsync(item, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.Item.NotFound(item.Id));
            }
            
            return Result.Success();
        }
    }
}
