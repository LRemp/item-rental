using ItemRental.Core.Contracts;
using ItemRental.Services.Mappers;
using ItemRental.Services.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IJwtTokenService, JwtTokenService>();

            services.AddTransient<IOrderService, OrderService>();
            services.AddTransient<IRentListingService, RentListingService>();
            services.AddTransient<IDeliveryService, DeliveryService>();

            services.AddAutoMapper(typeof(DeliveryMappingProfile));

            //services.AddTransient<IItemService, IItemService>();
        }
    }
}
