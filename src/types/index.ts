export type {
  Book,
  CreateBookPayload,
  ReadingStatus,
  UpdateBookPayload,
} from './book';
export type { CreatePostPayload, Post, UpdatePostPayload } from './post';

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
