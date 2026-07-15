export type {
  Book,
  CreateBookPayload,
  ReadingStatus,
  UpdateBookPayload,
} from './book';

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
