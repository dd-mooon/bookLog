export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  bookTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  bookTitle?: string;
}

export type UpdatePostPayload = Partial<CreatePostPayload>;
