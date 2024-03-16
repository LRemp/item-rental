using Dapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Repositories.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly MySqlConnection _connection;
        public OrderRepository(MySqlConnection connection) 
        { 
            this._connection = connection;
        }
        public async Task<bool> AddAsync(Order order, CancellationToken cancellationToken)
        {
            var query = @"INSERT INTO `orders` (id, listing, user, startDate, endDate, status) 
                        VALUES (@id, @listing, @user, @startDate, @endDate, @status)";

            var result = await _connection.ExecuteAsync(query, new
            {
                id = order.Id,
                user = order.User,
                listing = order.Listing,
                startDate = order.StartDate,
                endDate = order.EndDate,
                status = order.Status
            });

            return result > 0;
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"DELETE FROM `orders` WHERE id = @id";

            var result = await _connection.ExecuteAsync(query, new { id });

            return result > 0;
        }

        public async Task<OrderDTO?> GetAsync(Guid id, CancellationToken cancellationToken)

        {
           /* var query = @"SELECT rl.*, i.*, u.*
                        FROM rent_listings rl
                        INNER JOIN items i ON rl.item = i.id
                        INNER JOIN users u ON rl.renter = u.id";*/

            var query = @"SELECT o.*, u.*, l.*, i.*, a.*
                        FROM orders o
                        INNER JOIN users u ON o.user = u.id
                        INNER JOIN rent_listings l ON o.listing = l.id
                        INNER JOIN items i ON l.item = i.id
                        INNER JOIN users a ON l.renter = a.id
                        WHERE o.id = @id";

            var result = await _connection.QueryAsync<Order, UserDTO, RentListing, ItemDTO, UserDTO, OrderDTO>(query,
                (order, user, listing, item, renter) =>
                {
                    return new OrderDTO
                    {
                        Id = order.Id,
                        User = user,
                        RentListing = new RentListingDTO
                        {
                            Id = listing.Id,
                            Renter = renter,
                            Item = item,
                            Title = listing.Title,
                            Description = listing.Description,
                            Price = listing.Price,
                            Location = listing.Location,
                        },
                        StartDate = order.StartDate,
                        EndDate = order.EndDate,
                        Status = order.Status
                    };
                }, new { id }
            );

            var results = result.ToList();

            return results[0];
        }

        public async Task<List<OrderDTO>> GetUserAsync(Guid user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateAsync(Order order, CancellationToken cancellationToken)
        {
            var query = @"UPDATE `orders` SET listing = @listing, user = @user, startDate = @startDate, endDate = @endDate, status = @status WHERE id = @id";

            var result = await _connection.ExecuteAsync(query, new
            {
                id = order.Id,
                user = order.User,
                rentListing = order.Listing,
                startDate = order.StartDate,
                endDate = order.EndDate,
                status = order.Status
            });

            return result > 0;
        }
    }
}
