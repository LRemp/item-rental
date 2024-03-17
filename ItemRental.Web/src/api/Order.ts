const createOrder = (data: OrderCreateRequest): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/Rent/Orders/create',
  authenticate: true,
  body: data,
});

const getUserListingOrders = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Rent/Orders/${id}/UserOrders`,
  authenticate: true,
});

export default {
  createOrder,
  getUserListingOrders,
};
