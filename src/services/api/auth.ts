import { API_ENDPOINTS } from '@/constants';
import type {
  ApiResponse,
  LoginPayload,
  LoginResponse,
  SignupPayload,
  User,
} from '@/types';

import { apiClient } from './client';

export const authService = {
  signup: async (payload: SignupPayload) => {
    const { data } = await apiClient.post<ApiResponse<User>>(
      API_ENDPOINTS.AUTH_SIGNUP,
      payload,
    );
    return data.data;
  },

  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH_LOGIN,
      payload,
    );
    return data.data;
  },

  verify: async (token: string) => {
    const { data } = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.AUTH_VERIFY(token),
    );
    return data.data;
  },

  me: async () => {
    const { data } = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.AUTH_ME,
    );
    return data.data;
  },
};
