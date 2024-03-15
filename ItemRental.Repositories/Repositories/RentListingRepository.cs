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
    public class RentListingRepository : IRentListingRepository
    {
        private readonly MySqlConnection mySqlConnection;
        public RentListingRepository(MySqlConnection mySqlConnection)
        {
            this.mySqlConnection = mySqlConnection;
        }
        public async Task<bool> AddAsync(RentListing rentalListing, CancellationToken cancellationToken)
        {
            var query = @"INSERT INTO rent_listings (id, item, renter, title, description, price, location)
                        VALUES(@id, @item, @renter, @title, @description, @price, @location)";

            var result = await mySqlConnection.ExecuteAsync(query, new
            {
                id = rentalListing.Id,
                item = rentalListing.Item,
                renter = rentalListing.Renter,
                title = rentalListing.Title,
                description = rentalListing.Description,
                price = rentalListing.Price,
                location = rentalListing.Location
            });

            return result > 0;
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"DELETE FROM rent_listings WHERE id = @id";

            var result = await mySqlConnection.ExecuteAsync(query, new { id });

            return result > 0;
        }

        public async Task<List<RentListingDTO>> GetAsync(CancellationToken cancellationToken)
        {
            var query = @"SELECT rl.*,  i.*, u.*
                        FROM rent_listings rl
                        INNER JOIN items i ON rl.item = i.id
                        INNER JOIN users u ON rl.renter = u.id";

            var result = await mySqlConnection.QueryAsync<RentListing, ItemDTO, UserDTO, RentListingDTO>(query,
                (rentListing, item, user) =>
                {
                    return new RentListingDTO
                    {
                        Id = rentListing.Id,
                        Item = item,
                        Renter = user,
                        Title = rentListing.Title,
                        Description = rentListing.Description,
                        Price = rentListing.Price,
                        Location = rentListing.Location
                    };
                }
            );

            return result.ToList();
        }

        public async Task<RentListingDTO?> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT rl.*,  i.*, u.*
                        FROM rent_listings rl
                        INNER JOIN items i ON rl.item = i.id
                        INNER JOIN users u ON rl.renter = u.id
                        WHERE rl.id = @id";

            var result = await mySqlConnection.QueryAsync<RentListing, ItemDTO, UserDTO, RentListingDTO>(query,
                (rentListing, item, user) =>
                {
                    return new RentListingDTO
                    {
                        Id = rentListing.Id,
                        Item = item,
                        Renter = user,
                        Title = rentListing.Title,
                        Description = rentListing.Description,
                        Price = rentListing.Price,
                        Location = rentListing.Location
                    };
                },
                new { id }
            );

            var results = result.ToList();

            return results[0];
        }

        public async Task<List<RentListingDTO>> GetByOwnerAsync(Guid owner, CancellationToken cancellationToken)
        {
            var query = @"SELECT rl.*,  i.*, u.*
                        FROM rent_listings rl
                        INNER JOIN items i ON rl.item = i.id
                        INNER JOIN users u ON rl.renter = u.id
                        WHERE rl.renter = @owner";

            var result = await mySqlConnection.QueryAsync<RentListing, ItemDTO, UserDTO, RentListingDTO>(query,
                (rentListing, item, user) =>
                {
                    return new RentListingDTO
                    {
                        Id = rentListing.Id,
                        Item = item,
                        Renter = user,
                        Title = rentListing.Title,
                        Description = rentListing.Description,
                        Price = rentListing.Price,
                        Location = rentListing.Location
                    };
                },
                new { owner }
            );

            return result.ToList();
        }

        public async Task<RentListing?> GetInternalAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM rent_listings WHERE id = @id";

            var result = await mySqlConnection.QuerySingleAsync(query, new { id });

            return result.FirstOrDefault();
        }

        public async Task<bool> UpdateAsync(RentListing rentalListing, CancellationToken cancellationToken)
        {
            var query = @"UPDATE rent_listings SET title = @title, description = @description, price = @price, location = @location WHERE id = @id";

            var result = await mySqlConnection.ExecuteAsync(query, new
            {
                id = rentalListing.Id,
                title = rentalListing.Title,
                description = rentalListing.Description,
                price = rentalListing.Price,
                location = rentalListing.Location
            });

            return result > 0;
        }
    }
}
