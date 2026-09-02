import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해 주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다.').max(50),
});

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해 주세요.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

export const createPostSchema = z.object({
  title: z.string().min(1, '제목을 입력해 주세요.').max(200),
  content: z.string().min(1, '내용을 입력해 주세요.'),
  bookTitle: z.string().max(200).optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  bookTitle: z.string().max(200).optional(),
});

export const createCommentSchema = z.object({
  content: z.string().min(1, '댓글 내용을 입력해 주세요.'),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, '댓글 내용을 입력해 주세요.'),
});
