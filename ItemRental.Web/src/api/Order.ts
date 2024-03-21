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

const getPending = (): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Rent/Orders/Pending`,
  authenticate: true,
});

const getInProgress = (): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Rent/Orders/InProgress`,
  authenticate: true,
});

export default {
  createOrder,
  getUserListingOrders,
  getPending,
  getInProgress,
};
