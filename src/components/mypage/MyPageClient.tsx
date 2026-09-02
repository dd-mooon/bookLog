'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { AuthGuard } from '@/components/auth';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { authService, postService } from '@/services/api';
import { useAuthStore } from '@/store';
import type { Post, User } from '@/types';
import { formatDate } from '@/utils';

export function MyPageClient() {
  const { user, setUser, logout } = useAuthStore();
  const [profile, setProfile] = useState<User | null>(user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [me, myPosts] = await Promise.all([
          authService.me(),
          postService.getMyPosts(1, 10),
        ]);
        setProfile(me);
        setUser(me);
        setPosts(myPosts.items);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '정보를 불러오지 못했습니다.',
        );
      }
    }

    void fetchData();
  }, [setUser]);

  return (
    <AuthGuard>
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            마이페이지
          </h1>
          <p className="text-foreground/60 text-sm">
            내 프로필과 작성한 글을 관리합니다.
          </p>
        </div>

        <div className="border-foreground/10 flex flex-col gap-4 rounded-md border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-medium">{profile?.nickname ?? '사용자'}</p>
            <p className="text-foreground/60 text-sm">{profile?.email}</p>
          </div>
          <Button
            variant="secondary"
            onClick={logout}
            className="w-full sm:w-auto"
          >
            로그아웃
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">내 게시글</h2>
            <Link href={ROUTES.POST_WRITE}>
              <Button variant="secondary">새 글 작성</Button>
            </Link>
          </div>

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : posts.length === 0 ? (
            <p className="text-foreground/60 text-sm">작성한 글이 없습니다.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={ROUTES.POST_DETAIL(String(post.id))}
                    className="border-foreground/10 hover:bg-foreground/5 block rounded-md border p-4"
                  >
                    <p className="font-medium">{post.title}</p>
                    <p className="text-foreground/50 mt-1 text-xs">
                      {formatDate(post.createdAt)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </AuthGuard>
  );
}
