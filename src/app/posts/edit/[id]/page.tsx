import type { Metadata } from 'next';
import Link from 'next/link';

import { Button, Input, Textarea } from '@/components/ui';
import { ROUTES } from '@/constants';

interface PostEditPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PostEditPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `게시글 수정 ${id}`,
  };
}

export default async function PostEditPage({ params }: PostEditPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">글 수정</h1>
        <p className="text-foreground/60 text-sm">게시글 ID: {id}</p>
      </div>

      <form className="flex flex-col gap-5">
        <Input
          label="제목"
          name="title"
          type="text"
          required
          defaultValue=""
          placeholder="제목을 입력하세요"
        />
        <Input
          label="책 제목 (선택)"
          name="bookTitle"
          type="text"
          defaultValue=""
          placeholder="관련 책 제목"
        />
        <Textarea
          label="내용"
          name="content"
          required
          defaultValue=""
          placeholder="내용을 입력하세요"
        />

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit">수정 완료</Button>
          <Link href={ROUTES.POST_DETAIL(id)}>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}
