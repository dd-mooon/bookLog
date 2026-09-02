import axios from 'axios';

import { ROUTES } from '@/constants/routes';
import { API_BASE_URL } from '@/constants';
import { useAuthStore } from '@/store/useAuthStore';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status as number | undefined;
    const message =
      error.response?.data?.message ??
      error.message ??
      '요청 처리 중 오류가 발생했습니다.';

    if (status === 401 && typeof window !== 'undefined') {
      useAuthStore.getState().logout();
      const isAuthPage =
        window.location.pathname === ROUTES.LOGIN ||
        window.location.pathname === ROUTES.SIGNUP;
      if (!isAuthPage) {
        window.location.href = ROUTES.LOGIN;
      }
    }

    return Promise.reject(new Error(message));
  },
);
