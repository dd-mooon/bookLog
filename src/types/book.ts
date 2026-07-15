export type ReadingStatus = 'wishlist' | 'reading' | 'completed';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  coverUrl?: string;
  status: ReadingStatus;
  rating?: number;
  memo?: string;
  startedAt?: string;
  finishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookPayload {
  title: string;
  author: string;
  isbn?: string;
  coverUrl?: string;
  status?: ReadingStatus;
  memo?: string;
}

export interface UpdateBookPayload extends Partial<CreateBookPayload> {
  rating?: number;
  startedAt?: string;
  finishedAt?: string;
}
