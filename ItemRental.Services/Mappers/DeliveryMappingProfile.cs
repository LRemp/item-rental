using AutoMapper;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;

namespace ItemRental.Services.Mappers
{
    public class DeliveryMappingProfile : Profile
    {
        public DeliveryMappingProfile()
        {
            CreateMap<Delivery, DeliveryDTO>().ReverseMap();
        }
    }
}
