using ItemRental.Core.Helpers;

namespace ItemRental.Core.Errors
{
    public static class DomainErrors
    {
        public static class User
        {
            public static readonly Error EmailOrUsernameAlreadyInUse = new Error(
                "User.EmailOrUsernameAlreadyInUse",
                "The provided email or username is already in use.");

            public static readonly Func<Guid, Error> NotFound = id => new Error(
                "User.NotFound",
                $"The member with identifier {id} was not found.");
            
            public static readonly Error InvalidCredentials = new Error(
                "User.InvalidCredentials", 
                "The provided credentials are invalid");
        }

        public static class Item
        {
            public static readonly Func<Guid, Error> NotFound = id => new Error(
                "Item.NotFound",
                "The item was not found");

            public static readonly Error FailedToCreate = new Error(
                "Item.FailedToCreate",
                "The item could not be created");

            public static readonly Func<Guid, Error> NotOwner = id => new Error(
                "Item.NotOwner",
                "The user is not the owner of the item");

            public static readonly Func<Guid, Error> FailedToDelete = id => new Error(
                "Item.FailedToDelete",
                "The item could not be deleted");
        }

        public static class  RentListing
        {
            public static readonly Error FailedToCreate = new Error(
                "RentListing.FailedToCreate",
                "The rent listing could not be created");

            public static readonly Func<Guid, Error> NotFound = id => new Error(
                "RentListing.NotFound",
                "The rent listing was not found");

            public static readonly Func<Guid, Error> NotRenter = id => new Error(
                "RentListing.NotRenter",
                "The user is not the renter of the listing");

            public static readonly Func<Guid, Error> FailedToDelete = id => new Error(
                "RentListing.FailedToDelete",
                "The rent listing could not be deleted");

            public static readonly Func<Guid, Error> FailedToUpdate = id => new Error(
                "RentListing.FailedToUpdate",
                "The rent listing could not be updated"
                );
        }
    }
}
