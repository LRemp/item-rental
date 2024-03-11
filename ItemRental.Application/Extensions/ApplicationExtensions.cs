using ItemRental.Application.Mappers;
using ItemRental.Core.Contracts;
using ItemRental.Repositories.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Extensions
{
    public static class ApplicationExtensions
    {
        public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(typeof(UserMappingProfile));
        }
    }
}
