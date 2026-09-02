import { pool } from '../db/pool';
import { AppError } from '../utils/errors';
import { mapComment } from '../utils/mappers';

async function ensurePostExists(postId: number) {
  const result = await pool.query('SELECT id FROM posts WHERE id = $1', [postId]);
  if (!result.rowCount) {
    throw new AppError('게시글을 찾을 수 없습니다.', 404);
  }
}

export async function listComments(postId: number) {
  await ensurePostExists(postId);

  const result = await pool.query(
    `SELECT c.id, c.post_id, c.user_id, c.content, c.created_at, c.updated_at,
            u.nickname AS author_name
     FROM comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.post_id = $1
     ORDER BY c.created_at ASC`,
    [postId],
  );

  return result.rows.map(mapComment);
}

export async function createComment(
  postId: number,
  userId: number,
  content: string,
) {
  await ensurePostExists(postId);

  const result = await pool.query(
    `INSERT INTO comments (post_id, user_id, content)
     VALUES ($1, $2, $3)
     RETURNING id, post_id, user_id, content, created_at, updated_at`,
    [postId, userId, content],
  );

  const author = await pool.query('SELECT nickname FROM users WHERE id = $1', [
    userId,
  ]);

  return mapComment({ ...result.rows[0], author_name: author.rows[0].nickname });
}

export async function updateComment(
  commentId: number,
  userId: number,
  content: string,
) {
  const existing = await pool.query(
    'SELECT user_id FROM comments WHERE id = $1',
    [commentId],
  );

  if (!existing.rowCount) {
    throw new AppError('댓글을 찾을 수 없습니다.', 404);
  }

  if (existing.rows[0].user_id !== userId) {
    throw new AppError('수정 권한이 없습니다.', 403);
  }

  const result = await pool.query(
    `UPDATE comments
     SET content = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, post_id, user_id, content, created_at, updated_at`,
    [content, commentId],
  );

  const author = await pool.query('SELECT nickname FROM users WHERE id = $1', [
    userId,
  ]);

  return mapComment({ ...result.rows[0], author_name: author.rows[0].nickname });
}

export async function deleteComment(commentId: number, userId: number) {
  const existing = await pool.query(
    'SELECT user_id FROM comments WHERE id = $1',
    [commentId],
  );

  if (!existing.rowCount) {
    throw new AppError('댓글을 찾을 수 없습니다.', 404);
  }

  if (existing.rows[0].user_id !== userId) {
    throw new AppError('삭제 권한이 없습니다.', 403);
  }

  await pool.query('DELETE FROM comments WHERE id = $1', [commentId]);
}
