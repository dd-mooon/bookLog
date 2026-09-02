export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentPayload {
  content: string;
}

export interface UpdateCommentPayload {
  content: string;
}
