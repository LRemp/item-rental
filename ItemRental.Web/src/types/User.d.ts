type LoginFormFields = {
  email: string?;
  password: string?;
};

type LoginResponse = {
  user: UserProfile;
  token: string;
};

type UserProfile = {
  name: string;
  lastname: string;
  email: string;
  gender: string;
};

type RegisterResponse = {};
