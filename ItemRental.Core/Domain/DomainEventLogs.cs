using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Domain
{
    public static class DomainEventLogs
    {
        public static class Order
        {
            public static readonly Func<Guid, string, EventLog> Created = (id, resource) => new EventLog
            {
                Id = id,
                Resource = resource,
                EventName = "Order.Created",
                Title = "Rezervacija sukurta",
                Description = "Rezervacija sėkmingai sukurta"
            };

            public static readonly Func<Guid, string, EventLog> Accepted = (id, resource) => new EventLog
            {
                Id = id,
                Resource = resource,
                EventName = "Order.Accepted",
                Title = "Revzervacija patvirtinta",
                Description = "Rezervacija sėkmingai patvirtinta prekybininko"
            };

            public static readonly Func<Guid, string, EventLog> Dispatched = (id, resource) => new EventLog
            {
                Id = id,
                Resource = resource,
                EventName = "Order.Dispatched",
                Title = "Užsakymas išsiųstas",
                Description = "Užsakymas išsiųstas prekybininko"
            };

            public static readonly Func<Guid, string, EventLog> Delivered = (id, resource) => new EventLog
            {
                Id = id,
                Resource = resource,
                EventName = "Order.Delivered",
                Title = "Užsakymas pristatytas",
                Description = "Užsakymas pristatytas klientui"
            };

            public static readonly Func<Guid, string, EventLog> ReturnDispatched = (id, resource) => new EventLog
            {
                Id = id,
                Resource = resource,
                EventName = "Order.ReturnDispatched",
                Title = "Užsakymas grąžinamas",
                Description = "Užsakymas išsiųstas atgal"
            };

            public static readonly Func<Guid, string, EventLog> Returned = (id, resource) => new EventLog
            {
                Id = id,
                Resource = resource,
                EventName = "Order.Returned",
                Title = "Užsakymas grąžintas",
                Description = "Užsakymas sėkmingai grąžintas"
            };

            public static readonly Func<Guid, string, EventLog> Complete = (id, resource) => new EventLog
            {
                Id = id,
                Resource = resource,
                EventName = "Order.Complete",
                Title = "Užsakymas baigtas",
                Description = "Nuoma sėkmingai įvykdyta"
            };
        }
    }
}
