import type { Metadata } from 'next';
import Link from 'next/link';

import { Button, Input, Textarea } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: '글쓰기',
};

export default function PostWritePage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">글쓰기</h1>
        <p className="text-foreground/60 text-sm">
          읽은 책과 감상을 기록해 보세요.
        </p>
      </div>

      <form className="flex flex-col gap-5">
        <Input
          label="제목"
          name="title"
          type="text"
          required
          placeholder="제목을 입력하세요"
        />
        <Input
          label="책 제목 (선택)"
          name="bookTitle"
          type="text"
          placeholder="관련 책 제목"
        />
        <Textarea
          label="내용"
          name="content"
          required
          placeholder="내용을 입력하세요"
        />

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit">등록</Button>
          <Link href={ROUTES.POSTS}>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}
