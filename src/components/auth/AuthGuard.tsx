'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated && !token) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isHydrated, token, router]);

  if (!isHydrated) {
    return (
      <p className="text-foreground/60 py-10 text-center text-sm">로딩 중...</p>
    );
  }

  if (!token) {
    return null;
  }

  return children;
}
