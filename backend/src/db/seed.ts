import bcrypt from 'bcrypt';

import { pool } from './pool';

async function seed() {
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM users');
  const userCount = rows[0]?.count ?? 0;

  if (userCount > 0) {
    console.log('ℹ️  Seed skipped — users already exist.');
    return;
  }

  const passwordHash = await bcrypt.hash('password123', 10);

  const userResult = await pool.query(
    `INSERT INTO users (email, password_hash, nickname, is_verified, verification_token)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    ['demo@booklog.com', passwordHash, '데모유저', true, null],
  );

  const userId = userResult.rows[0].id as number;

  await pool.query(
    `INSERT INTO posts (user_id, title, content, book_title)
     VALUES
       ($1, $2, $3, $4),
       ($1, $5, $6, $7)`,
    [
      userId,
      '첫 번째 독서 기록',
      'Book Log에 첫 글을 남깁니다. 독서 습관을 기록해 보세요.',
      '데미안',
      'PostgreSQL 공부 중',
      'FullStack 과제를 위해 DB 스키마를 설계했습니다.',
      'PostgreSQL 실전',
    ],
  );

  const postResult = await pool.query(
    'SELECT id FROM posts WHERE user_id = $1 ORDER BY id ASC LIMIT 1',
    [userId],
  );
  const postId = postResult.rows[0].id as number;

  await pool.query(
    `INSERT INTO comments (post_id, user_id, content)
     VALUES ($1, $2, $3)`,
    [postId, userId, '첫 댓글입니다. API 연동 후 실제로 보일 예정입니다.'],
  );

  console.log('✅ Seed data inserted.');
  console.log('   demo@booklog.com / password123');
}

seed()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
