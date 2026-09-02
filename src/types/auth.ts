export interface User {
  id: number;
  email: string;
  nickname: string;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
