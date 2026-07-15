import { create } from 'zustand';

import type { Book, ReadingStatus } from '@/types';

interface BookState {
  books: Book[];
  selectedStatus: ReadingStatus | 'all';
  isLoading: boolean;
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  removeBook: (id: string) => void;
  setSelectedStatus: (status: ReadingStatus | 'all') => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  selectedStatus: 'all',
  isLoading: false,

  setBooks: (books) => set({ books }),

  addBook: (book) =>
    set((state) => ({
      books: [book, ...state.books],
    })),

  updateBook: (id, updated) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, ...updated } : book,
      ),
    })),

  removeBook: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
    })),

  setSelectedStatus: (selectedStatus) => set({ selectedStatus }),

  setIsLoading: (isLoading) => set({ isLoading }),
}));
