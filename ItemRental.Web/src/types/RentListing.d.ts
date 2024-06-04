type RentListing = {
  id: UUID;
  item: Item;
  renter: UserProfile;
  title: string;
  description: string;
  price: number;
  location: string;
  orders?: Order[];
};

type IComment = {
  id: string;
  author: UserProfile;
  text: string;
  createdAt: string;
};
