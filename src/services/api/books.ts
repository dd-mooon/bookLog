import { API_ENDPOINTS } from '@/constants';
import type {
  ApiResponse,
  Book,
  CreateBookPayload,
  UpdateBookPayload,
} from '@/types';

import { apiClient } from './client';

export const bookService = {
  getBooks: async () => {
    const { data } = await apiClient.get<ApiResponse<Book[]>>(
      API_ENDPOINTS.BOOKS,
    );
    return data.data;
  },

  getBookById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Book>>(
      API_ENDPOINTS.BOOK_BY_ID(id),
    );
    return data.data;
  },

  createBook: async (payload: CreateBookPayload) => {
    const { data } = await apiClient.post<ApiResponse<Book>>(
      API_ENDPOINTS.BOOKS,
      payload,
    );
    return data.data;
  },

  updateBook: async (id: string, payload: UpdateBookPayload) => {
    const { data } = await apiClient.patch<ApiResponse<Book>>(
      API_ENDPOINTS.BOOK_BY_ID(id),
      payload,
    );
    return data.data;
  },

  deleteBook: async (id: string) => {
    await apiClient.delete(API_ENDPOINTS.BOOK_BY_ID(id));
  },
};
