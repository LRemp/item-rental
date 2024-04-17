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

export default {
  Login,
  Register,
  GetNotifications,
};
