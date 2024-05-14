const Login = {
  path: '/api/Users/login',
};

const Register = {
  path: '/api/Users/register',
};

const GetNotifications = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/Users/Notifications',
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

const getVerificationRequests = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/Users/VerificationRequests',
  authenticate: true,
});

const approveVerificationRequest = (id: string): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Users/VerificationRequests/${id}/Approve`,
  authenticate: true,
});

const rejectVerificationRequest = (id: string): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Users/VerificationRequests/${id}/Reject`,
  authenticate: true,
});

export default {
  Login,
  Register,
  GetNotifications,
  get,
  getMerchantOrders,
  getMerchantListings,
  getVerificationRequests,
  approveVerificationRequest,
  rejectVerificationRequest,
};
