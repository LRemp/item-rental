const createOrder = (data: OrderCreateRequest): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/Orders/create',
  authenticate: true,
  body: data,
});

const getUserListingOrders = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Orders/${id}/UserOrders`,
  authenticate: true,
});

const getUserOrders = (): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Orders`,
  authenticate: true,
});

const getOrder = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Orders/${id}`,
  authenticate: true,
});

const getOwnerOrders = (type?: number): ApiRequest => {
  let endpoint = `/api/Orders/Owner`;
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
  endpoint: `/api/Orders/${id}/accept`,
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
