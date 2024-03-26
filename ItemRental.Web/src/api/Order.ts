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

const getUserOrders = (): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Rent/Orders`,
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

const getCompleted = (): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Rent/Orders/Pending`,
  authenticate: true,
});

const confirm = (id: string): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Rent/Orders/${id}/accept`,
  authenticate: true,
});

export default {
  createOrder,
  getUserListingOrders,
  getUserOrders,
  getPending,
  getInProgress,
  getCompleted,
  confirm,
};
