'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CommentSection } from '@/components/comments';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { commentService, postService } from '@/services/api';
import { useAuthStore } from '@/store';
import type { Comment, Post } from '@/types';
import { formatDate } from '@/utils';

export function PostDetailClient({ postId }: { postId: string }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError('');
      try {
        const [postData, commentData] = await Promise.all([
          postService.getPostById(postId),
          commentService.getComments(postId),
        ]);
        setPost(postData);
        setComments(commentData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '게시글을 불러오지 못했습니다.',
        );
      } finally {
        setIsLoading(false);
      }
    }

    void fetchData();
  }, [postId]);

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

  if (error || !post) {
    return <p className="py-10 text-center text-sm text-red-600">{error}</p>;
  }

  const isOwner = user?.id === post.userId;

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
            {post.title}
          </h1>
          <div className="text-foreground/50 flex flex-wrap gap-x-3 gap-y-1 text-sm">
            <span>{post.authorName}</span>
            <span aria-hidden>|</span>
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
            {post.bookTitle ? (
              <>
                <span aria-hidden>|</span>
                <span>{post.bookTitle}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-foreground/10 min-h-40 rounded-md border p-5 text-sm leading-7 whitespace-pre-wrap">
        {post.content}
      </div>

      {isOwner ? (
        <div className="flex flex-wrap gap-3">
          <Link href={ROUTES.POST_EDIT(String(post.id))}>
            <Button variant="secondary">수정</Button>
          </Link>
          <Button variant="ghost" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      ) : null}

      <CommentSection postId={post.id} initialComments={comments} />
    </article>
  );
}
