import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { formatDate } from '@/utils';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `게시글 ${id}`,
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;

  return (
    <article className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link
          href={ROUTES.POSTS}
          className="text-foreground/60 hover:text-foreground w-fit text-sm"
        >
          ← 목록으로
        </Link>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            게시글 상세
          </h1>
          <div className="text-foreground/50 flex flex-wrap gap-x-3 gap-y-1 text-sm">
            <span>ID: {id}</span>
            <span aria-hidden>|</span>
            <time dateTime={new Date().toISOString()}>
              {formatDate(new Date())}
            </time>
          </div>
        </div>
      </div>

      <div className="border-foreground/10 min-h-40 rounded-md border p-5 text-sm leading-7 whitespace-pre-wrap">
        게시글 내용이 여기에 표시됩니다.
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={ROUTES.POST_EDIT(id)}>
          <Button variant="secondary">수정</Button>
        </Link>
        <Link href={ROUTES.POSTS}>
          <Button variant="ghost">목록</Button>
        </Link>
      </div>
    </article>
  );
}
