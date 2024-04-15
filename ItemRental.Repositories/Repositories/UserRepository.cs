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

        public async Task<bool> AddAsync(User user, CancellationToken cancellationToken)
        {
            var query = @"INSERT INTO users (id, username, email, password) 
                            VALUES (@id, @username, @email, @password)";
            
            var result = await _mySqlConnection.ExecuteAsync(query, new { id = user.Id, username = user.Username, email = user.Email, password = user.Password });

            return result > 0;
        }

        public async Task<bool> AddNotificationAsync(Notification notification, CancellationToken cancellationToken)
        {
            var query = @"INSERT INTO notifications (id, user, code, title, description, url) 
                            VALUES (@id, @user, @code, @title, @description, @url)";

            var result = await _mySqlConnection.ExecuteAsync(query, new {
                id = notification.Id,
                user = notification.User,
                code = notification.Code,
                title = notification.Title,
                description = notification.Description,
                url = notification.Url
            });;

            return result > 0;
        }

        public async Task<User?> GetByEmailOrUsernameAsync(string email, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM users WHERE email = @email or username = @email";

            var result = await _mySqlConnection.QueryAsync<User>(query, new { email });

            return result.FirstOrDefault();
        }

        public async Task<User?> GetByIdAsync(Guid userId, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM users WHERE id = @userId";

            var result = await _mySqlConnection.QueryAsync<User>(query, new { userId });

            return result.FirstOrDefault();
        }

        public async Task<Notification?> GetNotificationAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM notifications WHERE id = @id";

            var result = await _mySqlConnection.QueryAsync<Notification>(query, new { id });

            return result.FirstOrDefault();
        }

        public async Task<List<Notification>> GetNotificationsAsync(Guid user, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM notifications WHERE user = @user";

            var result = await _mySqlConnection.QueryAsync<Notification>(query, new { user });

            return result.ToList();
        }

        public async Task<bool> IsEmailAndUsernameUniqueAsync(string username, string email, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM users WHERE username = @username OR email = @email";

            var result = await _mySqlConnection.QueryAsync<User>(query, new { username, email });

            return result.Count() == 0;
        }
    }
}
