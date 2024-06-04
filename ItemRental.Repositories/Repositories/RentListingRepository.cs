using Dapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using MySqlConnector;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
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

        public async Task<bool> AddCommentAsync(Comment comment, CancellationToken cancellationToken)
        {
            var query = @"INSERT INTO comments (id, resource, user, text, createdAt)
                        VALUES(@id, @resource, @user, @text, @createdAt)";

            var result = await mySqlConnection.ExecuteAsync(query, new
            {
                id = comment.Id,
                resource = comment.Resource,
                user = comment.User,
                text = comment.Text,
                createdAt = comment.CreatedAt
            });

            return result > 0;
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"DELETE FROM rent_listings WHERE id = @id";

            var result = await mySqlConnection.ExecuteAsync(query, new { id });

            return result > 0;
        }

        public async Task<bool> DeleteCommentAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"DELETE FROM comments WHERE id = @id";

            var result = await mySqlConnection.ExecuteAsync(query, new { id });

            return result > 0;
        }

        public async Task<PaginatedResult<List<RentListingDTO>>> GetAsync(string? searchArgument, string? category, int page, CancellationToken cancellationTokenn)
        {
            int pageSize = 8;
            int rowsToSkip = page * pageSize;

            var query = @"SELECT rl.*, i.*, u.*
                FROM rent_listings rl
                INNER JOIN items i ON rl.item = i.id
                INNER JOIN users u ON rl.renter = u.id";

            if (searchArgument is not null || category is not null)
            {
                query += @" WHERE ";
                if (category is not null)
                {
                    query += @"i.category = @category";
                }

                if (searchArgument is not null)
                {
                    if(category is not null)
                    {
                        query += @" AND ";
                    }

                    query += @"(i.name LIKE CONCAT('%', @search, '%')
                        OR i.description LIKE CONCAT('%', @search, '%')
                        OR i.category LIKE CONCAT('%', @search, '%')
                        OR i.tags LIKE CONCAT('%', @search, '%')
                        OR i.details LIKE CONCAT('%', @search, '%')
                        OR rl.title LIKE CONCAT('%', @search, '%')
                        OR rl.description LIKE CONCAT('%', @search, '%'))";
                }
            }

            

            var result = await mySqlConnection.QueryAsync<RentListing, Item, UserDTO, RentListingDTO>(query,
                (rentListing, item, user) =>
                {
                    return new RentListingDTO
                    {
                        Id = rentListing.Id,
                        Item = new ItemDTO
                        {
                            Id = item.Id,
                            SerialNumber = item.SerialNumber,
                            Name = item.Name,
                            Description = item.Description,
                            Category = item.Category,
                            Images = JsonConvert.DeserializeObject<string[]>(item.Images),
                            Tags = JsonConvert.DeserializeObject<string[]>(item.Tags),
                            Details = JsonConvert.DeserializeObject<Specification[]>(item.Details)
                        },
                        Renter = user,
                        Title = rentListing.Title,
                        Description = rentListing.Description,
                        Price = rentListing.Price,
                        Location = rentListing.Location
                    };
                }, new { search = searchArgument, category = category }
            );

            var resultItems = result.ToList();
            var totalPages = (int)Math.Ceiling((double)resultItems.Count / pageSize);


            return new PaginatedResult<List<RentListingDTO>>
            {
                Result = resultItems.Skip(page * pageSize).Take(pageSize).ToList(),
                Page = page,
                PageSize = pageSize,
                TotalPages = totalPages
            };
        }


        public async Task<RentListingDTO?> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT rl.*,  i.*, u.*
                        FROM rent_listings rl
                        INNER JOIN items i ON rl.item = i.id
                        INNER JOIN users u ON rl.renter = u.id
                        WHERE rl.id = @id";

            var result = await mySqlConnection.QueryAsync<RentListing, Item, UserDTO, RentListingDTO>(query,
                (rentListing, item, user) =>
                {
                    return new RentListingDTO
                    {
                        Id = rentListing.Id,
                        Item = new ItemDTO
                        {
                            Id = item.Id,
                            SerialNumber = item.SerialNumber,
                            Name = item.Name,
                            Description = item.Description,
                            Category = item.Category,
                            Images = JsonConvert.DeserializeObject<string[]>(item.Images),
                            Tags = JsonConvert.DeserializeObject<string[]>(item.Tags),
                            Details = JsonConvert.DeserializeObject<Specification[]>(item.Details)
                        },
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
            var query = @"SELECT rl.*, i.*, u.*
                        FROM rent_listings rl
                        INNER JOIN items i ON rl.item = i.id
                        INNER JOIN users u ON rl.renter = u.id
                        WHERE rl.renter = @owner";

            var result = await mySqlConnection.QueryAsync<RentListing, Item, UserDTO, RentListingDTO>(query,
                (rentListing, item, user) =>
                {
                    return new RentListingDTO
                    {
                        Id = rentListing.Id,
                        Item = new ItemDTO
                        {
                            Id = item.Id,
                            SerialNumber = item.SerialNumber,
                            Name = item.Name,
                            Description = item.Description,
                            Category = item.Category,
                            Images = JsonConvert.DeserializeObject<string[]>(item.Images),
                            Tags = JsonConvert.DeserializeObject<string[]>(item.Tags),
                            Details = JsonConvert.DeserializeObject<Specification[]>(item.Details)
                        },
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

        

        public async Task<Comment?> GetCommentAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM comments WHERE id = @id";

            var result = await mySqlConnection.QueryAsync<Comment>(query, new { id });

            return result.FirstOrDefault();
        }

        public async Task<List<CommentDTO>> GetCommentsAsync(Guid resource, CancellationToken cancellationToken)
        {
            var query = @"SELECT c.*, u.* 
                        FROM comments c
                        INNER JOIN users u ON c.user = u.id
                        WHERE resource = @resource";
            
            var result = await mySqlConnection.QueryAsync<Comment, UserDTO, CommentDTO>(query, (comment, user) => {
                return new CommentDTO
                {
                    Id = comment.Id,
                    Author = user,
                    Text = comment.Text,
                    CreatedAt = comment.CreatedAt
                };
            }, new { resource });

            return result.ToList();
        }

        public async Task<RentListing?> GetInternalAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM rent_listings WHERE id = @id LIMIT 1";

            var result = await mySqlConnection.QueryAsync<RentListing>(query, new { id });

            return result.FirstOrDefault();
        }

        public async Task<RentListing?> GetWithItemAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM rent_listings WHERE item = @id LIMIT 1";

            var result = await mySqlConnection.QueryAsync<RentListing>(query, new { id });

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

        public async Task<bool> UpdateCommentAsync(Comment comment, CancellationToken cancellationToken)
        {
            var query = @"UPDATE comments SET text = @text WHERE id = @id";

            var result = await mySqlConnection.ExecuteAsync(query, new { id = comment.Id, text = comment.Text });

            return result > 0;
        }
    }
}
