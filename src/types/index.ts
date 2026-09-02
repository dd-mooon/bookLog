export type {
  CreatePostPayload,
  PaginatedPosts,
  Pagination,
  Post,
  UpdatePostPayload,
} from './post';
export type {
  Comment,
  CreateCommentPayload,
  UpdateCommentPayload,
} from './comment';
export type { LoginPayload, LoginResponse, SignupPayload, User } from './auth';

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
