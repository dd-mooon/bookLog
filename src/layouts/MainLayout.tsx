import type { PropsWithChildren } from 'react';
import Link from 'next/link';

import { ROUTES } from '@/constants';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-foreground/10 border-b">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <Link
            href={ROUTES.HOME}
            className="text-lg font-semibold tracking-tight"
          >
            Library Log
          </Link>
          <nav className="text-foreground/70 flex items-center gap-4 text-sm">
            <Link href={ROUTES.BOOKS} className="hover:text-foreground">
              도서 목록
            </Link>
            <Link href={ROUTES.BOOK_NEW} className="hover:text-foreground">
              추가하기
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {children}
      </main>

      <footer className="border-foreground/10 text-foreground/50 border-t py-6 text-center text-xs">
        Library Log — 나만의 독서 기록
      </footer>
    </div>
  );
}
