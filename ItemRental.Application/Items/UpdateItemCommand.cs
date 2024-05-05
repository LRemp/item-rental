using AutoMapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
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
            var item = await _itemRepository.GetAsync(request.itemDTO.Id, cancellationToken);

            if(item is null)
            {
                return Result.Failure(DomainErrors.Item.NotFound);
            }

            var isAuthorized = await IsAuthorized(request.itemDTO.Id, request.userId, cancellationToken);
            if (!isAuthorized)
            {
                return Result.Failure(DomainErrors.Item.Unauthorized);
            }

            Item itemUpdate = new Item
            {
                Id = request.itemDTO.Id,
                Name = request.itemDTO.Name,
                Description = request.itemDTO.Description,
                Images = JsonConvert.SerializeObject(request.itemDTO.Images),
                Tags = JsonConvert.SerializeObject(request.itemDTO.Tags),
                Details = JsonConvert.SerializeObject(request.itemDTO.Details)
            };

            bool success = await _itemRepository.UpdateAsync(itemUpdate, cancellationToken);

            if(!success)
            {
                return Result.Failure(DomainErrors.Item.NotFound);
            }
            
            return Result.Success();
        }
        public async Task<bool> IsAuthorized(Guid id, Guid user, CancellationToken cancellationToken)
        {
            var item = await _itemRepository.GetAsync(id, cancellationToken);
            return item.Owner == user;
        }
    }
}
