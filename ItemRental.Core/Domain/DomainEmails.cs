using ItemRental.Core.Entities;

namespace ItemRental.Core.Domain
{
    public static class DomainEmails
    {
        public static class Order
        {
            public static readonly Func<User, RentListing, Core.Entities.Order, User, Email> NewOrderCreated = (client, listing, order, user) => new Email
            {
                Address = client.Email,
                Subject = "New Order Created",
                HTMLcontent = $"<!doctypehtml><meta charset=UTF-8><meta content=\"width=device-width,initial-scale=1\"name=viewport><script src=https://cdn.tailwindcss.com></script><div class=\"w-full grid place-content-center\"><div class=\"bg-slate-100 w-96\"><div class=\"w-full grid place-content-center bg-white p-2\"><a href=https://itemrental.lt/ ><img alt=logo border=0 src=https://i.ibb.co/hK3Mthq/logo.png width=140px></a></div><div class=\"w-full p-4\"><p class=\"font-bold mb-4 text-2xl text-center\">Nauja nuomos rezervacija!<div><p>Sistemoje buvo sukurta nuomos rezervacija jūsų sukurtam skelbimui. Prašome patvirtinti arba atmesti rezervaciją sistemoje.<div class=\"text-sm mt-4\"><p><span class=font-bold>Skelbimas:</span> <span>{listing.Title}</span><p><span class=font-bold>Klientas: </span><span>{user.Name} {user.Surname}</span><p><span class=font-bold>Laikotarpis:</span> <span>{order.StartDate.ToString("yyyy/MM/dd")} - {order.EndDate.ToString("yyyy/MM/dd")}</span><p><span class=font-bold>Komentaras: {order.Comment}</span> <span></span><p><span class=font-bold>Pristatymo būdas: </span><span>{order.DeliveryType}</span></div><div class=\"w-full grid place-content-center my-4\"><a><button class=\"font-bold bg-blue-600 p-2 text-white\">Peržiūrėti rezervaciją</button></a></div></div><p class=\"text-center text-slate-500 text-sm\">Tai yra automatizuotas elektroninis laiškas iš \"ItemRental\" sistemos, prašome neatsakyti į šį laišką</div></div></div>",
                PlainTextContent = $"A new order has been created for the item {listing.Title}. Please check the order details."
            };
        }
    }
}
