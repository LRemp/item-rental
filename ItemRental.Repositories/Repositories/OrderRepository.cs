using Dapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using MySqlConnector;
using Newtonsoft.Json;
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
            var query = @"INSERT INTO `orders` (id, listing, user, startDate, endDate, status, deliveryType, comment) 
                        VALUES (@id, @listing, @user, @startDate, @endDate, @status, @deliveryType, @comment)";

            var result = await _connection.ExecuteAsync(query, new
            {
                id = order.Id,
                user = order.User,
                listing = order.Listing,
                startDate = order.StartDate,
                endDate = order.EndDate,
                status = order.Status,
                deliveryType = order.DeliveryType,
                comment = order.Comment
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

            var result = await _connection.QueryAsync<Order, UserDTO, RentListing, Item, UserDTO, OrderDTO>(query,
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
                            Item = new ItemDTO
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Description = item.Description,
                                Images = JsonConvert.DeserializeObject<string[]>(item.Images),
                                Tags = item.Tags
                            },
                            Title = listing.Title,
                            Description = listing.Description,
                            Price = listing.Price,
                            Location = listing.Location,
                        },
                        StartDate = order.StartDate,
                        EndDate = order.EndDate,
                        Status = order.Status,
                        DeliveryType = order.DeliveryType,
                        Comment = order.Comment
                    };
                }, new { id }
            );

            var results = result.ToList();

            return results[0];
        }

        public async Task<Order?> GetInternalAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM `orders` WHERE id = @id";

            var result = await _connection.QueryAsync<Order>(query, new { id });

            return result.FirstOrDefault();
        }

        public async Task<List<OrderDTO>> GetListingOrdersAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT o.*, u.*, l.*, i.*, a.*
                        FROM orders o
                        INNER JOIN users u ON o.user = u.id
                        INNER JOIN rent_listings l ON o.listing = l.id
                        INNER JOIN items i ON l.item = i.id
                        INNER JOIN users a ON l.renter = a.id
                        WHERE o.listing = @id";

            var result = await _connection.QueryAsync<Order, UserDTO, RentListing, Item, UserDTO, OrderDTO>(query,
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
                            Item = new ItemDTO
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Description = item.Description,
                                Images = JsonConvert.DeserializeObject<string[]>(item.Images),
                                Tags = item.Tags
                            },
                            Title = listing.Title,
                            Description = listing.Description,
                            Price = listing.Price,
                            Location = listing.Location,
                        },
                        StartDate = order.StartDate,
                        EndDate = order.EndDate,
                        Status = order.Status,
                        DeliveryType = order.DeliveryType,
                        Comment = order.Comment
                    };
                }, new { id }
            );

            return result.ToList();
        }

        public async Task<List<OrderDTO>> GetOwnerOrdersAsync(Guid id, OrderStatus? status, CancellationToken cancellationToken)
        {
            var query = @"SELECT o.*, u.*, l.*, i.*, a.*
                        FROM orders o
                        INNER JOIN users u ON o.user = u.id
                        INNER JOIN rent_listings l ON o.listing = l.id
                        INNER JOIN items i ON l.item = i.id
                        INNER JOIN users a ON l.renter = a.id
                        WHERE l.renter = @id";

            if(status != null)
            {
                query += " AND o.status = @status";
            }

            var result = await _connection.QueryAsync<Order, UserDTO, RentListing, Item, UserDTO, OrderDTO>(query,
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
                            Item = new ItemDTO
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Description = item.Description,
                                Images = JsonConvert.DeserializeObject<string[]>(item.Images),
                                Tags = item.Tags
                            },
                            Title = listing.Title,
                            Description = listing.Description,
                            Price = listing.Price,
                            Location = listing.Location,
                        },
                        StartDate = order.StartDate,
                        EndDate = order.EndDate,
                        Status = order.Status,
                        DeliveryType = order.DeliveryType,
                        Comment = order.Comment
                    };
                }, new { id, status }
            );

            return result.ToList();
        }

        public async Task<List<OrderDTO>> GetUserAsync(Guid user, CancellationToken cancellationToken)
        {
            var query = @"SELECT o.*, u.*, l.*, i.*, a.*
                        FROM orders o
                        INNER JOIN users u ON o.user = u.id
                        INNER JOIN rent_listings l ON o.listing = l.id
                        INNER JOIN items i ON l.item = i.id
                        INNER JOIN users a ON l.renter = a.id
                        WHERE u.id = @user";

            var result = await _connection.QueryAsync<Order, UserDTO, RentListing, Item, UserDTO, OrderDTO>(query,
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
                            Item = new ItemDTO
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Description = item.Description,
                                Images = JsonConvert.DeserializeObject<string[]>(item.Images),
                                Tags = item.Tags
                            },
                            Title = listing.Title,
                            Description = listing.Description,
                            Price = listing.Price,
                            Location = listing.Location,
                        },
                        StartDate = order.StartDate,
                        EndDate = order.EndDate,
                        Status = order.Status,
                        DeliveryType = order.DeliveryType,
                        Comment = order.Comment
                    };
                }, new { user }
            );

            return result.ToList();
        }

        public async Task<List<OrderDTO>> GetUserListingOrdersAsync(Guid id, Guid user, CancellationToken cancellationToken)
        {
            var query = @"SELECT o.*, u.*, l.*, i.*, a.*
                        FROM orders o
                        INNER JOIN users u ON o.user = u.id
                        INNER JOIN rent_listings l ON o.listing = l.id
                        INNER JOIN items i ON l.item = i.id
                        INNER JOIN users a ON l.renter = a.id
                        WHERE u.id = @user AND l.id = @id";

            var result = await _connection.QueryAsync<Order, UserDTO, RentListing, Item, UserDTO, OrderDTO>(query,
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
                            Item = new ItemDTO
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Description = item.Description,
                                Images = JsonConvert.DeserializeObject<string[]>(item.Images),
                                Tags = item.Tags
                            },
                            Title = listing.Title,
                            Description = listing.Description,
                            Price = listing.Price,
                            Location = listing.Location,
                        },
                        StartDate = order.StartDate,
                        EndDate = order.EndDate,
                        Status = order.Status,
                        DeliveryType = order.DeliveryType,
                        Comment = order.Comment
                    };
                }, new { id, user }
            );

            return result.ToList();
        }

        public async Task<List<OrderDTO>> GetOrdersFromMerchantAsync(Guid user, Guid merchant, CancellationToken cancellationToken)
        {
            var query = @"SELECT o.*, u.*, l.*, i.*, a.*
                        FROM orders o
                        INNER JOIN users u ON o.user = u.id
                        INNER JOIN rent_listings l ON o.listing = l.id
                        INNER JOIN items i ON l.item = i.id
                        INNER JOIN users a ON l.renter = a.id
                        WHERE o.user = @user AND l.renter = @merchant";

            var result = await _connection.QueryAsync<Order, UserDTO, RentListing, Item, UserDTO, OrderDTO>(query,
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
                            Item = new ItemDTO
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Description = item.Description,
                                Images = JsonConvert.DeserializeObject<string[]>(item.Images),
                                Tags = item.Tags
                            },
                            Title = listing.Title,
                            Description = listing.Description,
                            Price = listing.Price,
                            Location = listing.Location,
                        },
                        StartDate = order.StartDate,
                        EndDate = order.EndDate,
                        Status = order.Status,
                        DeliveryType = order.DeliveryType,
                        Comment = order.Comment
                    };
                }, new { user, merchant }
            );

            return result.ToList();
        }

        public async Task<bool> UpdateAsync(Order order, CancellationToken cancellationToken)
        {
            var query = @"UPDATE `orders` SET listing = @listing, user = @user, startDate = @startDate, endDate = @endDate, status = @status, deliveryType = @deliveryType WHERE id = @id";

            var result = await _connection.ExecuteAsync(query, new
            {
                id = order.Id,
                user = order.User,
                listing = order.Listing,
                startDate = order.StartDate,
                endDate = order.EndDate,
                status = order.Status,
                deliveryType = order.DeliveryType,
                comment = order.Comment
            });

            return result > 0;
        }
    }
}
