import type { Metadata } from 'next';

import { SignupForm } from '@/components/auth/SignupForm';

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
      <SignupForm />
    </section>
  );
}
