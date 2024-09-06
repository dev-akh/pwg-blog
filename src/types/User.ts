export interface UserLoginResponse {
  username: string;
  email: string;
  message: string;
  token: string;
  userId: string | number;
}

export interface ErrorMessage {
    message?: null | string;
    code?: string;
}

export interface UserRegister {
  username: string;
  email: string;
  password: string;
  role:string;
}

export interface UserRegisterResponse {
  message: string;
  token: string;
  account: {
    userId: number | string;
    username: string;
    email: string;
  };
  userId?: string | number;
}

export interface UserAccount {
  userId: string | number,
  username: string;
  email: string;
  role?:string;
}
