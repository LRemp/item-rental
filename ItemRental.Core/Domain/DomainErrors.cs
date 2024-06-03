using ItemRental.Core.Helpers;

namespace ItemRental.Core.Domain
{
    public static class DomainErrors
    {
        public static class Category
        {
            public static readonly Error FailedToCreate = new Error(
                "User.FailedToCreate",
                "Nepavyko sukurti kategorijos");
            public static readonly Error FailedToDelete = new Error(
                "User.FailedToDelete",
                "Nepavyko ištrinti kategorijos");
            public static readonly Error FailedToUpdate = new Error(
                "User.FailedToUpdate",
                "Nepavyko atnaujinti kategorijos");
        }
        public static class User
        {
            public static readonly Error EmailOrUsernameAlreadyInUse = new Error(
                "User.EmailOrUsernameAlreadyInUse",
                "Pateiktas el. paštas arba vartotojo vardas jau naudojamas.");

            public static readonly Error NotFound = new Error(
                "User.NotFound",
                $"Nario su nurodytu vartotojo vardu nepavyko rasti.");

            public static readonly Error InvalidCredentials = new Error(
                "User.InvalidCredentials",
                "Pateikti duomenys yra neteisingi");
            public static readonly Error FailedToCreate = new Error(
                "User.FailedToCreate",
                "Nepavyko sukurti paskyros");

            public static readonly Error VerificationRequestAlreadyExists = new Error(
                "User.VerificationRequestAlreadyExists",
                "Vartotojas jau turi patvirtinimo užklausą");

            public static readonly Error VerificationRequestCreationFailed = new Error(
                "User.VerificationRequestCreationFailed",
                 "Nepavyko sukurti profilio verifikacijos užklausos");

            public static readonly Error VerificationRequestNotFound = new Error(
                "User.VerificationRequestNotFound",
                "Verifikacijos užklausa nerasta");

            public static readonly Error VerificationRequestApprovalFailed = new Error(
                "User.VerificationRequestApprovalFailed",
                "Nepavyko patvirtinti profilio verifikacijos užklausos");
        }

        public static class Comment
        {
            public static readonly Error FailedToCreate = new Error(
                "Comment.FailedToCreate",
                "Nepavyko sukurti komentaro");

            public static readonly Error Unauthorized = new Error(
                "Comment.Unauthorized",
                "Neautorizuotas šiam veiksmui");

            public static readonly Error NotFound = new Error(
                "Comment.NotFound",
                "Komentaras nerastas");

            public static readonly Error Failed = new Error(
                "Comment.Failed",
                "Nepavyko atnaujinti komentaro");
        }

        public static class Item
        {
            public static readonly Error NotFound = new Error(
                "Item.NotFound",
                "Prekė nerasta");

            public static readonly Error FailedToUpdate = new Error(
                "Item.FailedToUpdate",
                "Prekės atnaujinimas nepavyko");

            public static readonly Error FailedToCreate = new Error(
                "Item.FailedToCreate",
                "Prekė negalėjo būti sukurta");

            public static readonly Error Unauthorized = new Error(
                "Item.Unauthorized",
                "Neautorizuotas šiam veiksmui");

            public static readonly Error FailedToDelete = new Error(
                "Item.FailedToDelete",
                "Prekė negalėjo būti ištrinta");

            public static readonly Error UsedInListing = new Error(
                "Item.UsedInListing",
                "Ši prekė įtraukta į sąrašą ir negali būti ištrinta");

            public static readonly Error UsedInOrder = new Error(
                "Item.UsedInOrder",
                "Ši prekė naudojama užsakyme ir negali būti ištrinta");
        }

        public static class RentListing
        {
            public static readonly Error FailedToCreate = new Error(
                "RentListing.FailedToCreate",
                "Nepavyko sukurti nuomos skelbimo");

            public static readonly Error NotFound = new Error(
                "RentListing.NotFound",
                "Nuomos skelbimas nerastas");

            public static readonly Error NotRenter = new Error(
                "RentListing.NotRenter",
                "Vartotojas nėra nuomininkas");

            public static readonly Error FailedToDelete = new Error(
                "RentListing.FailedToDelete",
                "Ištrinti Nuomos skelbimo nepavyko");

            public static readonly Error FailedToUpdate = new Error(
                "RentListing.FailedToUpdate",
                "Atnaujinti nuomos skelbimo nepavyko"
                );
        }

        public static class Order
        {
            public static readonly Error FailedToCreate = new Error(
                "Order.FailedToCreate",
                "Sukurti užsakymo nepavyko");

            public static readonly Func<string, Error> NotFound = id => new Error(
                "Order.NotFound",
                "Užsakymas nerastas");

            public static readonly Func<string, Error> NotOwner = id => new Error(
                "Order.NotOwner",
                "Jūs nesate klientas");

            public static readonly Func<string, Error> NotValidAction = id => new Error(
                "Order.NotValidAction",
                "Veiksmas nėra galiojantis užsakymui");

            public static readonly Func<string, Error> FailedToAccept = id => new Error(
                "Order.FailedToAccept",
                "Užsakymo priimti nepavyko");

            public static readonly Func<Guid, Error> DateBusy = id => new Error(
                "Order.DateBusy",
                "Pasirinkta data užimta");

            public static readonly Error NotInTransit = new Error(
                "Order.NotInTransit",
                "Užsakymas nepristatomas");

            public static readonly Error FailedToConfirmDelivery = new Error(
                "Order.FailedToConfirmDelivery",
                "Pristatymą patvirtinti nepavyko");

            public static readonly Error FailedToCreateMessage = new Error(
                "Order.FailedToCreateMessage",
                "Nepavyko sukurti naujos žinutės");
        }
    }
}
