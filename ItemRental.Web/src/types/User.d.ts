type LoginFormFields = {
  email: string?;
  password: string?;
};

type LoginResponse = {
  user: UserProfile;
  token: string;
};

type UserProfile = {
  username: string;
  name: string;
  lastname: string;
  email: string;
  gender: string;
};

type RegisterResponse = {};

type AuthUser = {
  username: string;
  email: string;
};
