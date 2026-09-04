'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { postService } from '@/services/api';
import type { Post } from '@/types';
import { formatDate } from '@/utils';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    postService
      .getPosts(1, 5)
      .then((data) => {
        if (isMounted) {
          setPosts(data.items);
        }
      })
      .catch(() => {
        if (isMounted) {
          setPosts([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-14 sm:gap-16">
      <section className="border-foreground/10 relative overflow-hidden rounded-lg border px-5 py-10 sm:px-8 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(26,26,26,0.06),_transparent_55%),linear-gradient(180deg,_rgba(255,255,255,0.55)_0%,_transparent_70%)]"
        />
        <div className="relative flex flex-col gap-6">
          <p className="text-foreground/45 text-xs tracking-[0.18em] uppercase">
            Reading journal
          </p>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Book Log
            </h1>
            <p className="text-foreground/65 max-w-lg text-base leading-7 sm:text-lg">
              읽고 싶은 책, 읽는 중인 책, 다 읽은 책을 한곳에서 기록하세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={ROUTES.POSTS}>
              <Button>게시판 보기</Button>
            </Link>
            <Link href={ROUTES.POST_WRITE}>
              <Button variant="secondary">글쓰기</Button>
            </Link>
            <Link
              href={ROUTES.RECOMMEND}
              className="text-foreground/55 hover:text-foreground inline-flex h-10 items-center px-1 text-sm underline-offset-4 hover:underline"
            >
              추천도서
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium tracking-tight">최근 게시글</h2>
            <p className="text-foreground/50 text-sm">
              멤버들이 남긴 최근 독서 기록입니다.
            </p>
          </div>
          <Link
            href={ROUTES.POSTS}
            className="text-foreground/55 hover:text-foreground shrink-0 text-sm underline-offset-4 hover:underline"
          >
            전체 보기
          </Link>
        </div>

        {isLoading ? (
          <p className="text-foreground/50 py-8 text-sm">불러오는 중...</p>
        ) : posts.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {posts.map((post, index) => (
              <li key={post.id}>
                <Link
                  href={ROUTES.POST_DETAIL(String(post.id))}
                  className="border-foreground/10 hover:bg-foreground/5 flex gap-4 rounded-md border p-4 transition-colors sm:gap-5"
                >
                  <span className="text-foreground/35 w-8 shrink-0 font-mono text-sm tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium tracking-tight">{post.title}</h3>
                    <p className="text-foreground/60 mt-1.5 line-clamp-2 text-sm leading-6">
                      {post.content}
                    </p>
                    <div className="text-foreground/45 mt-3 flex flex-wrap gap-x-2 text-xs">
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
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-foreground/10 flex flex-col items-start gap-4 rounded-md border border-dashed px-5 py-10">
            <div className="flex flex-col gap-1">
              <p className="font-medium">아직 등록된 게시글이 없습니다</p>
              <p className="text-foreground/55 text-sm">
                첫 감상 기록을 남기고 독서 로그를 시작해 보세요.
              </p>
            </div>
            <Link href={ROUTES.POST_WRITE}>
              <Button>첫 글 쓰기</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
