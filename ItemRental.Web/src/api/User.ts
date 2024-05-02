const Login = {
  path: '/api/Users/login',
};

const Register = {
  path: '/api/Users/register',
};

const GetNotifications = (): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Users/Notifications`,
  authenticate: true,
});

const get = (username: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Users/${username}`,
});

const getMerchantOrders = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Users/${id}/Orders`,
  authenticate: true,
});

const getMerchantListings = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Users/${id}/Listings`,
  authenticate: true,
});

export default {
  Login,
  Register,
  GetNotifications,
  get,
  getMerchantOrders,
  getMerchantListings,
};
