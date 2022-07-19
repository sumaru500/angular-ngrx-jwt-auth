export interface SignIn {
  username: string;
  password: string;
}

export interface SignUp extends SignIn {
  email: string;
}

