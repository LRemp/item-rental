using AutoMapper;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Mappers
{
    public class ItemMappingProfile : Profile
    {
        public ItemMappingProfile()
        {
            CreateMap<Item, ItemDTO>().ReverseMap();
        }
    }
}
