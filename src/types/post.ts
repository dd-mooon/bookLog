export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  authorName: string;
  bookTitle?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  bookTitle?: string;
}

export type UpdatePostPayload = Partial<CreatePostPayload>;

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedPosts {
  items: Post[];
  pagination: Pagination;
}
