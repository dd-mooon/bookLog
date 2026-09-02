'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';
import { authService } from '@/services/api';
import { useAuthStore } from '@/store';

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await authService.login({
        email: String(formData.get('email')),
        password: String(formData.get('password')),
      });
      setAuth(result.token, result.user);
      router.push(ROUTES.POSTS);
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="이메일"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="demo@booklog.com"
      />
      <Input
        label="비밀번호"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        placeholder="••••••••"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>
      <p className="text-foreground/60 text-center text-sm">
        계정이 없으신가요?{' '}
        <Link href={ROUTES.SIGNUP} className="text-foreground underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
