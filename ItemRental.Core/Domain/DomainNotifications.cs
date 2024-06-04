using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Domain
{
    public static class DomainNotifications
    {
        public static class Order
        {
            public static readonly Func<Guid, string, Notification> Created = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Created",
                Title = "Rezervacija sukurta",
                Description = "Jūsų rezervacija buvo sėkmingai sukurta",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, string, Notification> Accepted = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Accepted",
                Title = "Rezervacija patvirtinta",
                Description = "Jūsų užsakymas buvo patvirtinta",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, string, Notification> Dispatched = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Dispatched",
                Title = "Užsakymas išsiųstas",
                Description = "Jūsų užsakymas buvo išsiųstas",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, string, Notification> Delivered = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Delivered",
                Title = "Užsakymas pristatytas",
                Description = "Jūsų užsakymas buvo pristatytas",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, string, Notification> Returned = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Returned",
                Title = "Užsąkymas Grąžintas",
                Description = "Jūsų užsakymas buvo grąžintas",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, string, Notification> Completed = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Completed",
                Title = "Užsakymas baigtas",
                Description = "Jūsų užsakymas buvo sėkmingai užbaigtas",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, string, Notification> Rejected = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Rejected",
                Title = "Užsakymas atmestas",
                Description = "Jūsų užsakymas buvo atmestas",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };
        }
    }
}
