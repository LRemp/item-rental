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
  endpoint: '/api/Orders',
  authenticate: true,
});

const getOrder = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Orders/${id}`,
  authenticate: true,
});

const getOwnerOrders = (type?: number): ApiRequest => {
  let endpoint = '/api/Orders/Owner';
  if (type) {
    endpoint += `?status=${type}`;
  }
  return {
    method: 'GET',
    endpoint,
    authenticate: true,
  };
};

const confirm = (id: string): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Orders/${id}/accept`,
  authenticate: true,
});

const decline = (id: string): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Orders/${id}/decline`,
  authenticate: true,
});

const getMessages = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Orders/${id}/Messages`,
  authenticate: true,
});

const createMessage = (id: string, data: any): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Orders/${id}/Messages`,
  authenticate: true,
  body: data,
});

export default {
  createOrder,
  getOrder,
  getUserListingOrders,
  getUserOrders,
  getOwnerOrders,
  confirm,
  decline,
  getMessages,
  createMessage,
};
