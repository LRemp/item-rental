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
            public static readonly Func<Guid, Guid, Notification> Created = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Created",
                Title = "Created",
                Description = "Your order was created successfuly",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, Guid, Notification> Accepted = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Accepted",
                Title = "Accepted",
                Description = "Your order was accepted",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, Guid, Notification> Dispatched = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Dispatched",
                Title = "Dispatched",
                Description = "Your order was dispatched",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, Guid, Notification> Delivered = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Delivered",
                Title = "Delivered",
                Description = "Your order was dispatched",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, Guid, Notification> Returned = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Returned",
                Title = "Returned",
                Description = "Your order was returned",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };

            public static readonly Func<Guid, Guid, Notification> Completed = (user, order) => new Notification
            {
                Id = Guid.NewGuid(),
                User = user,
                Code = "Order.Completed",
                Title = "Completed",
                Description = "Your order was completed",
                Timestamp = new DateTime(),
                Url = $"/orders/{order}"
            };
        }
    }
}
