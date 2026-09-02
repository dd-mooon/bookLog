import type { Metadata } from 'next';

import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: '로그인',
};

export default function LoginPage() {
  return (
    <section className="mx-auto w-full max-w-md">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
        <p className="text-foreground/60 text-sm">
          Book Log 계정으로 로그인하세요.
        </p>
      </div>
      <LoginForm />
    </section>
  );
}
