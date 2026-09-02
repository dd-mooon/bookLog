'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { authService } from '@/services/api';

export function VerifyPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('이메일 인증 중...');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage('유효하지 않은 인증 링크입니다.');
      setIsError(true);
      return;
    }

    authService
      .verify(token)
      .then(() => {
        setMessage('이메일 인증이 완료되었습니다. 로그인해 주세요.');
        setTimeout(() => router.push(ROUTES.LOGIN), 1500);
      })
      .catch((err) => {
        setIsError(true);
        setMessage(
          err instanceof Error ? err.message : '이메일 인증에 실패했습니다.',
        );
      });
  }, [token, router]);

  return (
    <section className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">이메일 인증</h1>
      <p className={isError ? 'text-red-600' : 'text-foreground/70'}>
        {message}
      </p>
      <Link href={ROUTES.LOGIN}>
        <Button variant="secondary">로그인으로 이동</Button>
      </Link>
    </section>
  );
}
