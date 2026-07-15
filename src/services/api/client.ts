import axios from 'axios';

import { API_BASE_URL } from '@/constants';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      '요청 처리 중 오류가 발생했습니다.';

    return Promise.reject(new Error(message));
  },
);
