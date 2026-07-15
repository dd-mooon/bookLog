export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  POSTS: '/posts',
  POST_DETAIL: (id: string) => `/posts/${id}`,
  POST_WRITE: '/posts/write',
  POST_EDIT: (id: string) => `/posts/edit/${id}`,
  MYPAGE: '/mypage',
  BOARD: '/posts',
  RECOMMEND: '/recommend',
  BOOKS: '/books',
  BOOK_DETAIL: (id: string) => `/books/${id}`,
  BOOK_NEW: '/books/new',
} as const;

export const NAV_ITEMS = [
  { label: '게시판', href: ROUTES.POSTS },
  { label: '추천도서', href: ROUTES.RECOMMEND },
] as const;
