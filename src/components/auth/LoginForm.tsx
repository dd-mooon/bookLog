'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';
import { authService } from '@/services/api';
import { useAuthStore } from '@/store';
import {
  clearLoginCredentials,
  loadLoginCredentials,
  saveLoginCredentials,
} from '@/utils';

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = loadLoginCredentials();
    if (!saved) return;

    setEmail(saved.email);
    setPassword(saved.password);
    setRememberMe(true);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await authService.login({ email, password });
      setAuth(result.token, result.user);

      if (rememberMe) {
        saveLoginCredentials({ email, password });
      } else {
        clearLoginCredentials();
      }

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
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        label="비밀번호"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        placeholder="••••••••"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          className="border-foreground/15 accent-foreground size-4 rounded border"
        />
        <span className="text-foreground/80">아이디/비밀번호 저장</span>
      </label>
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
