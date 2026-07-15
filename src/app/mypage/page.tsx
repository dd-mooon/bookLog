import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: '마이페이지',
};

export default function MyPage() {
  return (
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
          <p className="font-medium">닉네임</p>
          <p className="text-foreground/60 text-sm">guest@example.com</p>
        </div>
        <Link href={ROUTES.LOGIN}>
          <Button variant="secondary" className="w-full sm:w-auto">
            로그인하기
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">내 활동</h2>
        <ul className="text-foreground/70 flex flex-col gap-2 text-sm">
          <li>
            <Link href={ROUTES.POSTS} className="hover:text-foreground">
              내 게시글 보기 →
            </Link>
          </li>
          <li>
            <Link href={ROUTES.POST_WRITE} className="hover:text-foreground">
              새 글 작성하기 →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
