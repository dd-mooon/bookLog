import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata: Metadata = {
  title: '회원가입',
};

export default function SignupPage() {
  return (
    <section className="mx-auto w-full max-w-md">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">회원가입</h1>
        <p className="text-foreground/60 text-sm">
          Book Log에서 독서 기록을 시작해 보세요.
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm" htmlFor="nickname">
          <span className="font-medium">닉네임</span>
          <input
            id="nickname"
            name="nickname"
            type="text"
            autoComplete="nickname"
            required
            className="border-foreground/15 h-10 rounded-md border px-3 outline-none"
            placeholder="닉네임"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm" htmlFor="email">
          <span className="font-medium">이메일</span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="border-foreground/15 h-10 rounded-md border px-3 outline-none"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm" htmlFor="password">
          <span className="font-medium">비밀번호</span>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="border-foreground/15 h-10 rounded-md border px-3 outline-none"
            placeholder="••••••••"
          />
        </label>

        <label
          className="flex flex-col gap-1.5 text-sm"
          htmlFor="passwordConfirm"
        >
          <span className="font-medium">비밀번호 확인</span>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            autoComplete="new-password"
            required
            className="border-foreground/15 h-10 rounded-md border px-3 outline-none"
            placeholder="••••••••"
          />
        </label>

        <Button type="submit" className="mt-2 w-full">
          가입하기
        </Button>
      </form>

      <p className="text-foreground/60 mt-6 text-center text-sm">
        이미 계정이 있으신가요?{' '}
        <Link href={ROUTES.LOGIN} className="text-foreground underline">
          로그인
        </Link>
      </p>
    </section>
  );
}
