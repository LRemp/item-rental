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
            public static readonly Func<User, RentListing, Entities.Order, Email> NewOrderCreated = (client, listing, order) =>
            {
                var email = new Email
                {
                    Address = client.Email,
                    Subject = "New Order Created",
                    HTMLcontent = @"<!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset=""UTF-8"" />
                        <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
                        <title>Email Template</title>
                      </head>
                      <body style=""margin: 0; line-height: inherit; background-color: #c6c4c6; font-family: Arial, Helvetica, sans-serif;"">
                        <div style=""width: 100%; display: grid; padding: 2rem 0;"">
                          <div style=""margin: auto; width: 24rem; background-color: white;"">
                            <div style=""margin-top: 1rem; width: 100%; display: grid; background-color: white;"">
                              <a href=""https://itemrental.lt/"" style=""margin: auto;"">
                                <img src=""https://i.ibb.co/hK3Mthq/logo.png"" width=""140px"" alt=""logo"" border=""0"" />
                              </a>
                            </div>
                            <div style=""width: 100%;"">
                              <p style=""text-align: center; font-weight: 700; font-size: 1.5rem; line-height: 2rem; margin-bottom: 1rem;"">
                                Nauja nuomos rezervacija!
                              </p>
                              <div style=""padding: 0.5rem;"">
                                <div>
                                  Sistemoje buvo sukurta nuomos rezervacija jūsų sukurtam skelbimui. Prašome patvirtinti arba atmesti rezervaciją sistemoje.
                                </div>
                                <div style=""font-size: 0.875rem; line-height: 1.25rem; margin-top: 1rem;"">
                                  <div>
                                    <span style=""font-weight: 700;"">Skelbimas:</span>
                                    <span>{listing.Title}</span>
                                  </div>
                                  <div>
                                    <span style=""font-weight: 700;"">Klientas: </span>
                                    <span>{user.Name} {user.Surname}</span>
                                  </div>
                                  <div>
                                    <span style=""font-weight: 700;"">Laikotarpis:</span>
                                    <span>{order.StartDate} - {order.EndDate}</span>
                                  </div>
                                  <div>
                                    <span style=""font-weight: 700;"">Komentaras: {order.Comment}</span>
                                  </div>
                                  <div>
                                    <span style=""font-weight: 700;"">Pristatymo būdas: </span>
                                    <span>{order.DeliveryType}</span>
                                  </div>
                                </div>
                                <div style=""display: grid; width: 100%; margin-top: 1rem; margin-bottom: 1rem;"">
                                  <a href=""#"" style=""margin: auto;"">
                                    <button style=""padding: 0.5rem; color: white; font-weight: 700; background-color: rgb(37 99 235); border: none;"">
                                      Peržiūrėti rezervaciją
                                    </button>
                                  </a>
                                </div>
                                <div style=""color: rgb(100 116 139); font-size: 0.675rem; line-height: 1.25rem;"">
                                  Tai yra automatizuotas elektroninis laiškas iš ""ItemRental"" sistemos, prašome neatsakyti į šį laišką.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </body>
                    </html>",
                    PlainTextContent = $"A new order has been created for the item {listing.Title}. Please check the order details."
                };

                email.HTMLcontent = email.HTMLcontent.Replace("{listing.Title}", listing.Title);
                email.HTMLcontent = email.HTMLcontent.Replace("{user.Name}", client.Name);
                email.HTMLcontent = email.HTMLcontent.Replace("{user.Surname}", client.Surname);
                email.HTMLcontent = email.HTMLcontent.Replace("{order.StartDate}", order.StartDate.ToString("yyyy/MM/dd"));
                email.HTMLcontent = email.HTMLcontent.Replace("{order.EndDate}", order.EndDate.ToString("yyyy/MM/dd"));
                email.HTMLcontent = email.HTMLcontent.Replace("{order.Comment}", order.Comment);
                email.HTMLcontent = email.HTMLcontent.Replace("{order.DeliveryType}", order.DeliveryType == 0 ? "Atsiėmimas" : "Siunta");

                return email;
            };
        }
    }
}
