import { pool } from '../db/pool';
import { AppError } from '../utils/errors';
import { mapPost } from '../utils/mappers';

export async function listPosts(page: number, limit: number) {
  const offset = (page - 1) * limit;

  const [itemsResult, countResult] = await Promise.all([
    pool.query(
      `SELECT p.id, p.user_id, p.title, p.content, p.book_title, p.created_at, p.updated_at,
              u.nickname AS author_name
       FROM posts p
       JOIN users u ON u.id = p.user_id
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    ),
    pool.query('SELECT COUNT(*)::int AS total FROM posts'),
  ]);

  const total = countResult.rows[0].total as number;

  return {
    items: itemsResult.rows.map(mapPost),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

export async function getPostById(id: number) {
  const result = await pool.query(
    `SELECT p.id, p.user_id, p.title, p.content, p.book_title, p.created_at, p.updated_at,
            u.nickname AS author_name
     FROM posts p
     JOIN users u ON u.id = p.user_id
     WHERE p.id = $1`,
    [id],
  );

  if (!result.rowCount) {
    throw new AppError('게시글을 찾을 수 없습니다.', 404);
  }

  return mapPost(result.rows[0]);
}

export async function createPost(
  userId: number,
  input: { title: string; content: string; bookTitle?: string },
) {
  const result = await pool.query(
    `INSERT INTO posts (user_id, title, content, book_title)
     VALUES ($1, $2, $3, $4)
     RETURNING id, user_id, title, content, book_title, created_at, updated_at`,
    [userId, input.title, input.content, input.bookTitle ?? null],
  );

  const post = result.rows[0];
  const author = await pool.query('SELECT nickname FROM users WHERE id = $1', [
    userId,
  ]);

  return mapPost({ ...post, author_name: author.rows[0].nickname });
}

export async function updatePost(
  postId: number,
  userId: number,
  input: { title?: string; content?: string; bookTitle?: string },
) {
  const existing = await pool.query('SELECT user_id FROM posts WHERE id = $1', [
    postId,
  ]);

  if (!existing.rowCount) {
    throw new AppError('게시글을 찾을 수 없습니다.', 404);
  }

  if (existing.rows[0].user_id !== userId) {
    throw new AppError('수정 권한이 없습니다.', 403);
  }

  const result = await pool.query(
    `UPDATE posts
     SET title = COALESCE($1, title),
         content = COALESCE($2, content),
         book_title = COALESCE($3, book_title),
         updated_at = NOW()
     WHERE id = $4
     RETURNING id, user_id, title, content, book_title, created_at, updated_at`,
    [input.title ?? null, input.content ?? null, input.bookTitle ?? null, postId],
  );

  const author = await pool.query('SELECT nickname FROM users WHERE id = $1', [
    userId,
  ]);

  return mapPost({ ...result.rows[0], author_name: author.rows[0].nickname });
}

export async function deletePost(postId: number, userId: number) {
  const existing = await pool.query('SELECT user_id FROM posts WHERE id = $1', [
    postId,
  ]);

  if (!existing.rowCount) {
    throw new AppError('게시글을 찾을 수 없습니다.', 404);
  }

  if (existing.rows[0].user_id !== userId) {
    throw new AppError('삭제 권한이 없습니다.', 403);
  }

  await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
}

export async function listPostsByUser(userId: number, page: number, limit: number) {
  const offset = (page - 1) * limit;

  const [itemsResult, countResult] = await Promise.all([
    pool.query(
      `SELECT p.id, p.user_id, p.title, p.content, p.book_title, p.created_at, p.updated_at,
              u.nickname AS author_name
       FROM posts p
       JOIN users u ON u.id = p.user_id
       WHERE p.user_id = $1
       ORDER BY p.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset],
    ),
    pool.query('SELECT COUNT(*)::int AS total FROM posts WHERE user_id = $1', [
      userId,
    ]),
  ]);

  const total = countResult.rows[0].total as number;

  return {
    items: itemsResult.rows.map(mapPost),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}
