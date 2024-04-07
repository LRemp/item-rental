using Dapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Repositories.Repositories
{
    public class DeliveryRepository : IDeliveryRepository
    {
        private readonly MySqlConnection mySqlConnection;
        public DeliveryRepository(MySqlConnection mySqlConnection) 
        { 
            this.mySqlConnection = mySqlConnection;
        }
        public async Task<bool> AddAsync(Delivery delivery, CancellationToken cancellationToken)
        {
            var query = @"INSERT INTO deliveries (id, order, type, location, shippingProvider, shippingId, comment, completed)
                        VALUES(@id, @order, @type, @location, @shippingProvider, @shippingId, @comment, @completed)";

            var result = await mySqlConnection.ExecuteAsync(query, new
            {
                id = delivery.Id,
                order = delivery.Order,
                type = delivery.Type,
                location = delivery.Location,
                shippingProvider = delivery.ShippingProvider,
                shippingId = delivery.ShippingId,
                comment = delivery.Comment,
                completed = delivery.Completed
            });

            return result > 0;
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"DELETE FROM deliveries WHERE id = @id";
           
            var result = await mySqlConnection.ExecuteAsync(query, new { id });

            return result > 0;
        }

        public async Task<Delivery?> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM deliveries WHERE id = @id";

            var result = await mySqlConnection.QueryFirstOrDefaultAsync<Delivery>(query, new { id });

            return result;
        }

        public async Task<Delivery?> GetByOrderAndRoleAsync(Guid order, OrderRole role, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM deliveries WHERE order = @order AND role = @role";

            var result = await mySqlConnection.QueryFirstOrDefaultAsync<Delivery>(query, new { order, role });

            return result;
        }

        public async Task<List<Delivery>> GetByOrderAsync(Guid order, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM deliveries WHERE order = @order";

            var result = await mySqlConnection.QueryAsync<Delivery>(query, new { order });

            return result.ToList();
        }

        public async Task<bool> UpdateAsync(Delivery delivery, CancellationToken cancellationToken)
        {
            var query = @"UPDATE deliveries SET location = @location, shippingProvider = @shippingProvider, shippingId = @shippingId, comment = @comment, completed = @completed
                        WHERE id = @id";

            var result = await mySqlConnection.ExecuteAsync(query, new
            {
                id = delivery.Id,
                location = delivery.Location,
                shippingProvider = delivery.ShippingProvider,
                shippingId = delivery.ShippingId,
                comment = delivery.Comment,
                completed = delivery.Completed
            });
            
            return result > 0;
        }
    }
}
