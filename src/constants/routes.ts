export const ROUTES = {
  HOME: '/',
  BOARD: '/board',
  RECOMMEND: '/recommend',
  LOGIN: '/login',
  BOOKS: '/books',
  BOOK_DETAIL: (id: string) => `/books/${id}`,
  BOOK_NEW: '/books/new',
} as const;

export const NAV_ITEMS = [
  { label: '게시판', href: ROUTES.BOARD },
  { label: '추천도서', href: ROUTES.RECOMMEND },
] as const;
