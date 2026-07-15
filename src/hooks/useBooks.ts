'use client';

import { useEffect } from 'react';

import { bookService } from '@/services/api';
import { useBookStore } from '@/store';

export function useBooks() {
  const {
    books,
    selectedStatus,
    isLoading,
    setBooks,
    setIsLoading,
    setSelectedStatus,
  } = useBookStore();

  useEffect(() => {
    let isMounted = true;

    async function fetchBooks() {
      setIsLoading(true);
      try {
        const data = await bookService.getBooks();
        if (isMounted) {
          setBooks(data);
        }
      } catch (error) {
        console.error('도서 목록 조회 실패:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchBooks();

    return () => {
      isMounted = false;
    };
  }, [setBooks, setIsLoading]);

  const filteredBooks =
    selectedStatus === 'all'
      ? books
      : books.filter((book) => book.status === selectedStatus);

  return {
    books: filteredBooks,
    selectedStatus,
    isLoading,
    setSelectedStatus,
  };
}
