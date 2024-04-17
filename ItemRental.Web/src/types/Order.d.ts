type OrderCreateRequest = {
  rentListing?: string;
  startDate: string;
  endDate: string;
};

type Order = {
  id: string;
  rentListing: RentListing;
  startDate: string;
  endDate: string;
  status: OrderStatus;
  deliveryType: DeliveryType;
  user: UserProfile;
  events: EventLog[];
  comment: string;
};

enum DeliveryType {
  Pickup = 0,
  Shipping = 1,
}

enum OrderStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  InProgress = 3,
  Completed = 4,
  Canceled = 5,
}
