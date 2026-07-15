import type { Metadata } from 'next';
import Link from 'next/link';

import { EmptyState } from '@/components/common';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: '게시판',
};

export default function PostsPage() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            게시판
          </h1>
          <p className="text-foreground/60 text-sm">
            독서 기록과 감상을 공유해 보세요.
          </p>
        </div>
        <Link href={ROUTES.POST_WRITE}>
          <Button className="w-full sm:w-auto">글쓰기</Button>
        </Link>
      </div>

      <EmptyState
        title="아직 게시글이 없습니다"
        description="첫 번째 독서 기록을 작성해 보세요."
      />
    </section>
  );
}
