using Dapper;
using ItemRental.Core.Contracts;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Repositories.Repositories
{
    public class EventLogRepository : IEventLogRepository
    {
        private readonly MySqlConnection mySqlConnection;
        public EventLogRepository(MySqlConnection mySqlConnection)
        {
            this.mySqlConnection = mySqlConnection;
        }

        public async Task<bool> AddAsync(EventLog eventLog, CancellationToken cancellationToken)
        {
            var query = @"INSERT INTO eventlog (id, resource, eventName, title, description, timestamp)
                        VALUES (@id, @resource, @eventName, @title, @description, @timestamp)";

            var result = await mySqlConnection.ExecuteAsync(query, new
            {
                id = eventLog.Id,
                resource = eventLog.Resource,
                eventName = eventLog.EventName,
                title = eventLog.Title,
                description = eventLog.Description,
                timestamp = eventLog.Timestamp
            });
            
            return result > 0;
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"DELETE FROM eventlog WHERE id = @id";

            var result = await mySqlConnection.ExecuteAsync(query, new { id });

            return result > 0;
        }

        public async Task<List<EventLog>> GetAllAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM eventlog WHERE resource = @id";

            var result = await mySqlConnection.QueryAsync<EventLog>(query, new { id });

            return result.ToList();
        }

        public Task<EventLog?> GetAsync(Guid id, CancellationToken cancellationToken)
        {
            var query = @"SELECT * FROM eventlog WHERE id = @id";

            var result = mySqlConnection.QueryFirstOrDefaultAsync<EventLog>(query, new { id });

            return result;
        }

        public async Task<bool> UpdateAsync(EventLog eventLog, CancellationToken cancellationToken)
        {
            var query = @"UPDATE eventlog 
                        SET resource = @resource, eventName = @eventName, title = @title, description = @description, timestamp = @timestamp
                        WHERE id = @id";

            var result = await mySqlConnection.ExecuteAsync(query, new
            {
                id = eventLog.Id,
                resource = eventLog.Resource,
                eventName = eventLog.EventName,
                title = eventLog.Title,
                description = eventLog.Description,
                timestamp = eventLog.Timestamp
            });

            return result > 0;
        }
    }
}
