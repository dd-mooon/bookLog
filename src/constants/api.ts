export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';

export const API_ENDPOINTS = {
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGIN: '/auth/login',
  AUTH_VERIFY: (token: string) => `/auth/verify/${token}`,
  AUTH_ME: '/auth/me',
  POSTS: '/posts',
  POSTS_ME: '/posts/me/list',
  POST_BY_ID: (id: number | string) => `/posts/${id}`,
  POST_COMMENTS: (id: number | string) => `/posts/${id}/comments`,
  COMMENT_BY_ID: (id: number | string) => `/comments/${id}`,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
