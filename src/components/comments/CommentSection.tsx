'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { commentService } from '@/services/api';
import { useAuthStore } from '@/store';
import type { Comment } from '@/types';
import { formatDate } from '@/utils';

interface CommentSectionProps {
  postId: number;
  initialComments: Comment[];
}

export function CommentSection({
  postId,
  initialComments,
}: CommentSectionProps) {
  const { token, user } = useAuthStore();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const comment = await commentService.createComment(postId, { content });
      setComments((prev) => [...prev, comment]);
      setContent('');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '댓글 등록에 실패했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(commentId: number) {
    if (!window.confirm('댓글을 삭제할까요?')) {
      return;
    }

    try {
      await commentService.deleteComment(commentId);
      setComments((prev) => prev.filter((item) => item.id !== commentId));
    } catch (err) {
      alert(err instanceof Error ? err.message : '댓글 삭제에 실패했습니다.');
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-medium">댓글 {comments.length}</h2>

      {token ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            placeholder="댓글을 입력하세요"
            className="border-foreground/15 min-h-24 rounded-md border px-3 py-2 text-sm outline-none"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" disabled={isSubmitting} className="w-fit">
            {isSubmitting ? '등록 중...' : '댓글 등록'}
          </Button>
        </form>
      ) : (
        <p className="text-foreground/60 text-sm">
          <Link href={ROUTES.LOGIN} className="text-foreground underline">
            로그인
          </Link>
          후 댓글을 작성할 수 있습니다.
        </p>
      )}

      <ul className="flex flex-col gap-4">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="border-foreground/10 rounded-md border p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="text-sm">
                <span className="font-medium">{comment.authorName}</span>
                <span className="text-foreground/50 ml-2">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              {user?.id === comment.userId ? (
                <button
                  type="button"
                  onClick={() => handleDelete(comment.id)}
                  className="text-foreground/50 hover:text-foreground text-xs"
                >
                  삭제
                </button>
              ) : null}
            </div>
            <p className="text-sm leading-6 whitespace-pre-wrap">
              {comment.content}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
