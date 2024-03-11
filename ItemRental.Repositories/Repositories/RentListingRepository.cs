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

        public async Task<List<RentListing>> GetAsync(CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM rent_listings";

            var result = await mySqlConnection.QueryAsync<RentListing>(query);

            return result.ToList();
        }

        public async Task<RentListing> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM rent_listings WHERE id = @id";

            var result = await mySqlConnection.QuerySingleAsync<RentListing>(query, new { id });

            return result;
        }

        public async Task<RentListing> GetByOwnerAsync(Guid owner, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM rent_listings WHERE renter = @owner";

            var result = await mySqlConnection.QuerySingleAsync<RentListingDTO, RentListing, Item>(query, new { owner });

            return result;
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
