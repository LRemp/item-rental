using ItemRental.Core.Helpers;

namespace ItemRental.Core.Errors
{
    public static class DomainErrors
    {
        public static class User
        {
            public static readonly Error EmailAlreadyInUse = new Error(
                "User.EmailAlreadyInUse",
                "The provided email is already in use.");

            public static readonly Func<Guid, Error> NotFound = id => new Error(
                "User.NotFound",
                $"The member with identifier {id} was not found.");
            
            public static readonly Error InvalidCredentials = new Error(
                "User.InvalidCredentials", 
                "The provided credentials are invalid");
        }
    }
}
