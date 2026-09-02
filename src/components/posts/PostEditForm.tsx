'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthGuard } from '@/components/auth';
import { Button, Input, Textarea } from '@/components/ui';
import { ROUTES } from '@/constants';
import { postService } from '@/services/api';
import { useAuthStore } from '@/store';

export function PostEditForm({ postId }: { postId: string }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    postService
      .getPostById(postId)
      .then((post) => {
        setTitle(post.title);
        setContent(post.content);
        setBookTitle(post.bookTitle ?? '');
        setUserId(post.userId);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : '게시글을 불러오지 못했습니다.',
        );
      })
      .finally(() => setIsLoading(false));
  }, [postId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await postService.updatePost(postId, { title, content, bookTitle });
      router.push(ROUTES.POST_DETAIL(postId));
    } catch (err) {
      setError(err instanceof Error ? err.message : '수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('게시글을 삭제할까요?')) {
      return;
    }

    try {
      await postService.deletePost(postId);
      router.push(ROUTES.POSTS);
    } catch (err) {
      alert(err instanceof Error ? err.message : '삭제에 실패했습니다.');
    }
  }

  if (isLoading) {
    return (
      <p className="text-foreground/60 py-10 text-center text-sm">
        불러오는 중...
      </p>
    );
  }

  if (userId && user && userId !== user.id) {
    return (
      <p className="py-10 text-center text-sm text-red-600">
        수정 권한이 없습니다.
      </p>
    );
  }

  return (
    <AuthGuard>
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">글 수정</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="제목"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <Input
            label="책 제목 (선택)"
            name="bookTitle"
            value={bookTitle}
            onChange={(event) => setBookTitle(event.target.value)}
          />
          <Textarea
            label="내용"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '수정 완료'}
            </Button>
            <Link href={ROUTES.POST_DETAIL(postId)}>
              <Button type="button" variant="secondary">
                취소
              </Button>
            </Link>
            <Button type="button" variant="ghost" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </form>
      </section>
    </AuthGuard>
  );
}
