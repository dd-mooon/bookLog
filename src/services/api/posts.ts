import { API_ENDPOINTS } from '@/constants';
import type {
  ApiResponse,
  CreatePostPayload,
  PaginatedPosts,
  Post,
  UpdatePostPayload,
} from '@/types';

import { apiClient } from './client';

export const postService = {
  getPosts: async (page = 1, limit = 10) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedPosts>>(
      API_ENDPOINTS.POSTS,
      { params: { page, limit } },
    );
    return data.data;
  },

  getMyPosts: async (page = 1, limit = 10) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedPosts>>(
      API_ENDPOINTS.POSTS_ME,
      { params: { page, limit } },
    );
    return data.data;
  },

  getPostById: async (id: number | string) => {
    const { data } = await apiClient.get<ApiResponse<Post>>(
      API_ENDPOINTS.POST_BY_ID(id),
    );
    return data.data;
  },

  createPost: async (payload: CreatePostPayload) => {
    const { data } = await apiClient.post<ApiResponse<Post>>(
      API_ENDPOINTS.POSTS,
      payload,
    );
    return data.data;
  },

  updatePost: async (id: number | string, payload: UpdatePostPayload) => {
    const { data } = await apiClient.patch<ApiResponse<Post>>(
      API_ENDPOINTS.POST_BY_ID(id),
      payload,
    );
    return data.data;
  },

  deletePost: async (id: number | string) => {
    await apiClient.delete(API_ENDPOINTS.POST_BY_ID(id));
  },
};
