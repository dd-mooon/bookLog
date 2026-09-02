import type { Metadata } from 'next';
import { Suspense } from 'react';

import { VerifyPageClient } from '@/components/auth/VerifyPageClient';

export const metadata: Metadata = {
  title: '이메일 인증',
};

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <p className="text-foreground/60 py-10 text-center text-sm">
          인증 처리 중...
        </p>
      }
    >
      <VerifyPageClient />
    </Suspense>
  );
}
