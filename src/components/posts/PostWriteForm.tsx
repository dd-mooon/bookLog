'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthGuard } from '@/components/auth';
import { Button, Input, Textarea } from '@/components/ui';
import { ROUTES } from '@/constants';
import { postService } from '@/services/api';

export function PostWriteForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const post = await postService.createPost({
        title: String(formData.get('title')),
        content: String(formData.get('content')),
        bookTitle: String(formData.get('bookTitle') || '') || undefined,
      });
      router.push(ROUTES.POST_DETAIL(String(post.id)));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '게시글 등록에 실패했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthGuard>
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">글쓰기</h1>
          <p className="text-foreground/60 text-sm">
            읽은 책과 감상을 기록해 보세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input label="제목" name="title" type="text" required />
          <Input label="책 제목 (선택)" name="bookTitle" type="text" />
          <Textarea label="내용" name="content" required />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '등록'}
            </Button>
            <Link href={ROUTES.POSTS}>
              <Button type="button" variant="secondary">
                취소
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </AuthGuard>
  );
}
