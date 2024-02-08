using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using MySqlConnector;

namespace ItemRental.Repositories.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly MySqlConnection _connection;
        public ItemRepository(MySqlConnection mySqlConnection)
        { 
            _connection = mySqlConnection;
        }
        public async Task AddAsync(ItemDTO item)
        {
            var query = @"INSERT INTO items (name, description, tags)
                            VALUES(@name, @description, @tags)";

            await _connection.ExecuteAsync(query, new
            {
                name = item.Name,
                description = item.Description,
                tags = item.Tags
            });
        }

        public async Task<Item?> GetAsync(int id)
        {
            var query = @"SELECT * FROM items WHERE id = @id";

            var result = await _connection.QueryAsync<Item>(query);
            return result.FirstOrDefault();
        }

        public async Task<List<Item>> GetAsync()
        {
            var query = @"SELECT * FROM items";

            var result = await _connection.QueryAsync<Item>(query);
            return result.ToList();
        }
    }
}
