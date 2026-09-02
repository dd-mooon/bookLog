import { API_ENDPOINTS } from '@/constants';
import type {
  ApiResponse,
  Comment,
  CreateCommentPayload,
  UpdateCommentPayload,
} from '@/types';

import { apiClient } from './client';

export const commentService = {
  getComments: async (postId: number | string) => {
    const { data } = await apiClient.get<ApiResponse<Comment[]>>(
      API_ENDPOINTS.POST_COMMENTS(postId),
    );
    return data.data;
  },

  createComment: async (
    postId: number | string,
    payload: CreateCommentPayload,
  ) => {
    const { data } = await apiClient.post<ApiResponse<Comment>>(
      API_ENDPOINTS.POST_COMMENTS(postId),
      payload,
    );
    return data.data;
  },

  updateComment: async (id: number | string, payload: UpdateCommentPayload) => {
    const { data } = await apiClient.patch<ApiResponse<Comment>>(
      API_ENDPOINTS.COMMENT_BY_ID(id),
      payload,
    );
    return data.data;
  },

  deleteComment: async (id: number | string) => {
    await apiClient.delete(API_ENDPOINTS.COMMENT_BY_ID(id));
  },
};
