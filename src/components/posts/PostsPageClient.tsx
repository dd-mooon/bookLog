'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { EmptyState } from '@/components/common';
import { Button, Pagination } from '@/components/ui';
import { ROUTES } from '@/constants';
import { postService } from '@/services/api';
import type { Post } from '@/types';
import { formatDate } from '@/utils';

export function PostsPageClient() {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      setIsLoading(true);
      setError('');
      try {
        const data = await postService.getPosts(page, 10);
        if (isMounted) {
          setPosts(data.items);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : '게시글을 불러오지 못했습니다.',
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [page]);

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

      {isLoading ? (
        <p className="text-foreground/60 py-10 text-center text-sm">
          불러오는 중...
        </p>
      ) : error ? (
        <p className="py-10 text-center text-sm text-red-600">{error}</p>
      ) : posts.length === 0 ? (
        <EmptyState
          title="아직 게시글이 없습니다"
          description="첫 번째 독서 기록을 작성해 보세요."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={ROUTES.POST_DETAIL(String(post.id))}
                className="border-foreground/10 hover:bg-foreground/5 block rounded-md border p-4 transition-colors"
              >
                <h2 className="font-medium">{post.title}</h2>
                <p className="text-foreground/60 mt-2 line-clamp-2 text-sm">
                  {post.content}
                </p>
                <div className="text-foreground/50 mt-3 flex flex-wrap gap-x-2 text-xs">
                  <span>{post.authorName}</span>
                  <span aria-hidden>·</span>
                  <span>{formatDate(post.createdAt)}</span>
                  {post.bookTitle ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>{post.bookTitle}</span>
                    </>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination page={page} totalPages={totalPages} />
    </section>
  );
}
