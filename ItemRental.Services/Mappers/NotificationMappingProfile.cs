using AutoMapper;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Mappers
{
    public class NotificationMappingProfile: Profile
    {
        public NotificationMappingProfile()
        {
            CreateMap<Notification, NotificationDTO>().ReverseMap();
        }
    }
}
