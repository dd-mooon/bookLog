'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { EmptyState } from '@/components/common';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { postService } from '@/services/api';
import type { Post } from '@/types';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postService
      .getPosts(1, 3)
      .then((data) => setPosts(data.items))
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Book Log
        </h1>
        <p className="text-foreground/70 max-w-xl">
          읽고 싶은 책, 읽는 중인 책, 다 읽은 책을 한곳에서 기록하고 관리하세요.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={ROUTES.POSTS}>
          <Button>게시판 보기</Button>
        </Link>
        <Link href={ROUTES.POST_WRITE}>
          <Button variant="secondary">글쓰기</Button>
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-medium">최근 게시글</h2>
          <ul className="flex flex-col gap-2">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={ROUTES.POST_DETAIL(String(post.id))}
                  className="text-foreground/80 hover:text-foreground text-sm underline-offset-4 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <EmptyState
          title="아직 등록된 게시글이 없습니다"
          description="첫 게시글을 작성하고 독서 기록을 시작해 보세요."
        />
      )}
    </section>
  );
}
