type LoginFormFields = {
  email: string?;
  password: string?;
};

type LoginResponse = {
  user: UserProfile;
  token: string;
};

type UserProfile = {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  gender: string;
};

type RegisterResponse = {};

type AuthUser = {
  username: string;
  email: string;
};

type UserNotification = {
  code: string;
  title: string;
  description: string;
  url: string;
  timestamp: string;
  read: boolean;
};
