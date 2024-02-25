using Dapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.Entities;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Repositories.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MySqlConnection _mySqlConnection;
        public UserRepository(MySqlConnection mySqlConnection)
        {
            _mySqlConnection = mySqlConnection;
            _mySqlConnection.Open();
        }

        public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM users WHERE email = @email";

            var result = await _mySqlConnection.QueryAsync<User>(query, new { email });

            return result.FirstOrDefault();
        }

        public async Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM users WHERE id = @userId";

            var result = await _mySqlConnection.QueryAsync<User>(query, new { userId });

            return result.FirstOrDefault();
        }
    }
}
