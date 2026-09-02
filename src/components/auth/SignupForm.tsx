'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@/components/ui';
import { ROUTES } from '@/constants';
import { authService } from '@/services/api';

export function SignupForm() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get('password'));
    const passwordConfirm = String(formData.get('passwordConfirm'));

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsSubmitting(false);
      return;
    }

    try {
      await authService.signup({
        email: String(formData.get('email')),
        password,
        nickname: String(formData.get('nickname')),
      });
      setMessage('가입 완료! 이메일 인증 후 로그인해 주세요.');
      setTimeout(() => router.push(ROUTES.LOGIN), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="닉네임" name="nickname" type="text" required />
      <Input
        label="이메일"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <Input
        label="비밀번호"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        placeholder="8자 이상"
      />
      <Input
        label="비밀번호 확인"
        name="passwordConfirm"
        type="password"
        autoComplete="new-password"
        required
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting ? '가입 중...' : '가입하기'}
      </Button>
      <p className="text-foreground/60 text-center text-sm">
        이미 계정이 있으신가요?{' '}
        <Link href={ROUTES.LOGIN} className="text-foreground underline">
          로그인
        </Link>
      </p>
    </form>
  );
}
