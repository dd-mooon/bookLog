interface UserRow {
  id: number;
  email: string;
  nickname: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

interface PostRow {
  id: number;
  user_id: number;
  title: string;
  content: string;
  book_title: string | null;
  author_name?: string;
  created_at: Date;
  updated_at: Date;
}

interface CommentRow {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  author_name?: string;
  created_at: Date;
  updated_at: Date;
}

export function mapUser(row: UserRow) {
  return {
    id: row.id,
    email: row.email,
    nickname: row.nickname,
    isVerified: row.is_verified,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export function mapPost(row: PostRow) {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    content: row.content,
    bookTitle: row.book_title,
    authorName: row.author_name ?? '',
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export function mapComment(row: CommentRow) {
  return {
    id: row.id,
    postId: row.post_id,
    userId: row.user_id,
    content: row.content,
    authorName: row.author_name ?? '',
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}
