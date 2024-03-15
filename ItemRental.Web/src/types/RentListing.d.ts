type RentListing = {
  id: UUID;
  item: Item;
  renter: UserProfile;
  title: string;
  description: string;
  price: number;
  location: string;
};
