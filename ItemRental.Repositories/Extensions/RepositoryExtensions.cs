using MySqlConnector;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ItemRental.Core.Contracts;
using ItemRental.Repositories.Repositories;

namespace ItemRental.Repositories.Extensions
{
    public static class RepositoryExtensions
    {
        public static void AddRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("mysql");

            services.AddTransient(_ => new MySqlConnection(connectionString));
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IItemRepository, ItemRepository>();
            services.AddTransient<IRentListingRepository, RentListingRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IDeliveryRepository, DeliveryRepository>();
        }
    }
}
