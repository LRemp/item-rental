using Dapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using MySqlConnector;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Common;
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
            var query = @"INSERT INTO users (id, username, email, password, name, surname) 
                            VALUES (@id, @username, @email, @password, @name, @surname)";
            
            var result = await _mySqlConnection.ExecuteAsync(query, new { id = user.Id, username = user.Username, email = user.Email, password = user.Password, name = user.Name, surname = user.Surname });

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

        public async Task<bool> CreateVerificationRequestAsync(Guid user, CancellationToken cancellationToken)
        {
            var query = @"INSERT INTO verification_requests (id, user, status) VALUES (@id, @user, @status)";

            var result = await _mySqlConnection.ExecuteAsync(query, new { id = Guid.NewGuid(), user, status = VerificationStatus.Pending });

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

        public async Task<VerificationRequestDTO?> GetProfileVerificationRequestAsync(Guid user, CancellationToken cancellationToken)
        {
            var query = @"SELECT v.*, u.* 
                        FROM verification_requests v
                        INNER JOIN users u ON v.user = u.id   
                        WHERE v.user = @user AND v.status = '0'";

            var result = await _mySqlConnection.QueryAsync<VerificationRequest, UserDTO, VerificationRequestDTO>(query, 
                (verification, user) => {
                    return new VerificationRequestDTO
                    {
                        Id = verification.Id,
                        User = user,
                        Status = verification.Status,
                        CreatedAt = verification.CreatedAt
                    };
                }, new { user });

            return result.FirstOrDefault();
        }

        public async Task<VerificationRequestDTO?> GetProfileVerificationRequestByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT v.*, u.* 
                        FROM verification_requests v
                        INNER JOIN users u ON v.user = u.id   
                        WHERE v.id = @id AND v.status = '0'";

            var result = await _mySqlConnection.QueryAsync<VerificationRequest, UserDTO, VerificationRequestDTO>(query,
                (verification, user) => {
                    return new VerificationRequestDTO
                    {
                        Id = verification.Id,
                        User = user,
                        Status = verification.Status,
                        CreatedAt = verification.CreatedAt
                    };
                }, new { id });

            return result.FirstOrDefault();
        }

        public async Task<List<VerificationRequestDTO>> GetProfileVerificationRequestsAsync(CancellationToken cancellationToken)
        {
            var query = @"SELECT v.*, u.*
                        FROM verification_requests v
                        INNER JOIN users u ON v.user = u.id
                        WHERE v.status = '0'";

            var result = await _mySqlConnection.QueryAsync<VerificationRequest, UserDTO, VerificationRequestDTO>(query,
                (verification, user) => {
                    return new VerificationRequestDTO
                    {
                        Id = verification.Id,
                        User = user,
                        Status = verification.Status,
                        CreatedAt = verification.CreatedAt
                    };
                });

            return result.ToList();
        }

        public async Task<bool> IsEmailAndUsernameUniqueAsync(string username, string email, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM users WHERE username = @username OR email = @email";

            var result = await _mySqlConnection.QueryAsync<User>(query, new { username, email });

            return result.Count() == 0;
        }

        public async Task<bool> IsUserAdministrator(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM administrators WHERE user = @id";

            var result = await _mySqlConnection.QueryAsync(query, new { id });

            return result.Count() > 0;
        }

        public async Task<bool> UpdateAsync(User user, CancellationToken cancellationToken)
        {
            var query = @"UPDATE users SET password = @password, name = @name, surname = @surname, verified = @verified WHERE id = @id";

            var result = await _mySqlConnection.ExecuteAsync(query, new { id = user.Id, password = user.Password, name = user.Name, surname = user.Surname, verified = user.Verified });

            return result > 0;
        }

        public async Task<bool> UpdateProfileVerificationRequestAsync(Guid id, VerificationStatus status, CancellationToken cancelationToken)
        {
            var query = @"UPDATE verification_requests SET status = @status WHERE id = @id";

            var result = await _mySqlConnection.ExecuteAsync(query, new { id, status });

            return result > 0;
        }
    }
}
