using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Domain
{
    public static class DomainEmails
    {
        public static class Order
        {
            public static readonly Func<User, RentListing, Email> NewOrderCreated = (client, listing) => new Email
            {
                Address = client.Email,
                Subject = "New Order Created",
                HTMLcontent = $"<html><div>A new order has been created for the item <b> {listing.Title}.</b></div><button>test</button></html>",
                PlainTextContent = $"A new order has been created for the item {listing.Title}. Please check the order details."
            };
        }
    }
}
