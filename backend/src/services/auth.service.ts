import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { pool } from '../db/pool';
import { AppError } from '../utils/errors';
import { mapUser } from '../utils/mappers';
import { signToken } from '../utils/jwt';

import { sendVerificationEmail } from './email.service';

export async function signup(input: {
  email: string;
  password: string;
  nickname: string;
}) {
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [
    input.email,
  ]);

  if (existing.rowCount && existing.rowCount > 0) {
    throw new AppError('이미 사용 중인 이메일입니다.', 409);
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const verificationToken = uuidv4();

  const result = await pool.query(
    `INSERT INTO users (email, password_hash, nickname, verification_token)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, nickname, is_verified, created_at, updated_at`,
    [input.email, passwordHash, input.nickname, verificationToken],
  );

  await sendVerificationEmail(input.email, verificationToken);

  return mapUser(result.rows[0]);
}

export async function login(input: { email: string; password: string }) {
  const result = await pool.query(
    `SELECT id, email, nickname, password_hash, is_verified, created_at, updated_at
     FROM users WHERE email = $1`,
    [input.email],
  );

  if (!result.rowCount) {
    throw new AppError('이메일 또는 비밀번호가 올바르지 않습니다.', 401);
  }

  const user = result.rows[0];
  const isValid = await bcrypt.compare(input.password, user.password_hash);

  if (!isValid) {
    throw new AppError('이메일 또는 비밀번호가 올바르지 않습니다.', 401);
  }

  if (!user.is_verified) {
    throw new AppError('이메일 인증 후 로그인할 수 있습니다.', 403);
  }

  const token = signToken({ userId: user.id, email: user.email });

  return {
    token,
    user: mapUser(user),
  };
}

export async function verifyEmail(token: string) {
  const result = await pool.query(
    `UPDATE users
     SET is_verified = TRUE, verification_token = NULL, updated_at = NOW()
     WHERE verification_token = $1
     RETURNING id, email, nickname, is_verified, created_at, updated_at`,
    [token],
  );

  if (!result.rowCount) {
    throw new AppError('유효하지 않은 인증 토큰입니다.', 400);
  }

  return mapUser(result.rows[0]);
}

export async function getMe(userId: number) {
  const result = await pool.query(
    `SELECT id, email, nickname, is_verified, created_at, updated_at
     FROM users WHERE id = $1`,
    [userId],
  );

  if (!result.rowCount) {
    throw new AppError('사용자를 찾을 수 없습니다.', 404);
  }

  return mapUser(result.rows[0]);
}
