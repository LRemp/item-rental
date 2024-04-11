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

const getOrder = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Rent/Orders/${id}`,
  authenticate: true,
});

const getOwnerOrders = (type?: number): ApiRequest => {
  let endpoint = `/api/Rent/Orders/Owner`;
  if (type) {
    endpoint += `?status=${type}`;
  }
  return {
    method: 'GET',
    endpoint: endpoint,
    authenticate: true,
  };
};

const confirm = (id: string): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Rent/Orders/${id}/accept`,
  authenticate: true,
});

export default {
  createOrder,
  getOrder,
  getUserListingOrders,
  getUserOrders,
  getOwnerOrders,
  confirm,
};
