export interface User {
  id: string | number;
  username: string;
  role: string;
}

export interface RegisterUserRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  access_token?: string;
}
