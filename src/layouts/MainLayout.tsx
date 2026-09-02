import type { PropsWithChildren } from 'react';

import { AuthProvider } from '@/components/auth';

import { Footer } from './Footer';
import { Header } from './Header';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
