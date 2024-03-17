using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Dapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using MySqlConnector;
using Newtonsoft.Json;

namespace ItemRental.Repositories.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly MySqlConnection _connection;
        public ItemRepository(MySqlConnection mySqlConnection)
        { 
            _connection = mySqlConnection;
        }
        public async Task<bool> AddAsync(Item item, CancellationToken cancellationToken)
        {
            var query = @"INSERT INTO items (id, owner, name, description, images, tags)
                            VALUES(@id, @owner, @name, @description, @images, @tags)";

            var result = await _connection.ExecuteAsync(query, new
            {
                id = item.Id,
                owner = item.Owner,
                name = item.Name,
                description = item.Description,
                images = JsonConvert.SerializeObject(item.Images),
                tags = item.Tags
            });

            return result > 0;
        }

        public async Task<Item?> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM items WHERE id = @id";

            var result = await _connection.QueryAsync<Item>(query, new { id });
            return result.FirstOrDefault();
        }

        public async Task<List<Item>> GetAsync(CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM items";

            var result = await _connection.QueryAsync<Item>(query);
            return result.ToList();
        }

        public async Task<List<Item>> GetByOwnerAsync(Guid owner, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM items WHERE owner = @owner";

            var result = await _connection.QueryAsync<Item>(query, new { owner = owner.ToString() });
            return result.ToList();
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"DELETE FROM items WHERE id = @id";

            var result = await _connection.ExecuteAsync(query, new { id });
            return result > 0;
        }

        public async Task<bool> UpdateAsync(Item item, CancellationToken cancellationToken)
        {
            var query = @"UPDATE items SET name = @name, description = @description, tags = @tags WHERE id = @id";

            var result = await _connection.ExecuteAsync(query, new
            {
                id = item.Id,
                name = item.Name,
                description = item.Description,
                tags = item.Tags
            });

            return result > 0;
        }
    }
}
