import Link from 'next/link';

import { EmptyState } from '@/components/common';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export default function HomePage() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Library Log
        </h1>
        <p className="text-foreground/70 max-w-xl">
          읽고 싶은 책, 읽는 중인 책, 다 읽은 책을 한곳에서 기록하고 관리하세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={ROUTES.BOOKS}>
          <Button>도서 목록 보기</Button>
        </Link>
        <Link href={ROUTES.BOOK_NEW}>
          <Button variant="secondary">새 책 추가</Button>
        </Link>
      </div>

      <EmptyState
        title="아직 등록된 도서가 없습니다"
        description="첫 책을 추가하고 독서 기록을 시작해 보세요."
      />
    </section>
  );
}
