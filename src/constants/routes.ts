export const ROUTES = {
  HOME: '/',
  BOOKS: '/books',
  BOOK_DETAIL: (id: string) => `/books/${id}`,
  BOOK_NEW: '/books/new',
} as const;
