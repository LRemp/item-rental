using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Logs
{
    public static class DomainEventLogs
    {
        public static class Order
        {
            public static readonly Func<Guid, Guid, EventLog> Created = (id, resource) => new EventLog {
                Id = id,
                Resource = resource,
                EventName = "Order.Created",
                Title = "Created",
                Description = "Order created by the user"
            };

            public static readonly Func<Guid, Guid, EventLog> Accepted = (id, resource) => new EventLog
            {
                Id = id,
                Resource = resource,
                EventName = "Order.Accepted",
                Title = "Accepted",
                Description = "Order accepted by the merchant"
            };

            public static readonly Func<Guid, Guid, EventLog> Dispatched = (id, resource) => new EventLog
            {
                Id = id,
                Resource = resource,
                EventName = "Order.Dispatched",
                Title = "Dispatched",
                Description = "Order dispatched by the merchant"
            };
        }
    }
}
