'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { NAV_ITEMS, ROUTES } from '@/constants';
import { cn } from '@/lib';
import { useAuthStore } from '@/store';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { token, user, logout, isHydrated } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  function handleLogout() {
    logout();
    router.push(ROUTES.HOME);
  }

  const authArea =
    isHydrated && token && user ? (
      <div className="flex items-center gap-3">
        <Link
          href={ROUTES.MYPAGE}
          className="text-foreground/70 hover:text-foreground text-sm"
        >
          {user.nickname}
        </Link>
        <Button variant="secondary" className="h-9 px-4" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    ) : (
      <Link href={ROUTES.LOGIN}>
        <Button variant="secondary" className="h-9 px-4">
          로그인
        </Button>
      </Link>
    );

  return (
    <header className="border-foreground/10 bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={ROUTES.HOME}
          className="shrink-0 text-lg font-semibold tracking-tight"
          aria-label="Book Log 홈"
        >
          Book Log
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="주요 메뉴"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-colors',
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-foreground/70 hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">{authArea}</div>

        <button
          type="button"
          className="text-foreground inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">
            {isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          </span>
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                'absolute left-0 block h-0.5 w-5 bg-current transition-transform',
                isMenuOpen ? 'top-1.5 rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute top-1.5 left-0 block h-0.5 w-5 bg-current transition-opacity',
                isMenuOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 block h-0.5 w-5 bg-current transition-transform',
                isMenuOpen ? 'top-1.5 -rotate-45' : 'top-3',
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'border-foreground/10 overflow-hidden border-t transition-[max-height,opacity] duration-200 md:hidden',
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 border-t-0 opacity-0',
        )}
      >
        <nav
          className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-3 sm:px-6"
          aria-label="모바일 메뉴"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-3 text-sm transition-colors',
                  isActive
                    ? 'bg-foreground/5 text-foreground font-medium'
                    : 'text-foreground/80 hover:bg-foreground/5',
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-2 px-3 pb-1">
            {isHydrated && token && user ? (
              <div className="flex flex-col gap-2">
                <Link href={ROUTES.MYPAGE} className="text-sm font-medium">
                  {user.nickname} (마이페이지)
                </Link>
                <Button
                  variant="secondary"
                  className="h-10 w-full"
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <Link href={ROUTES.LOGIN}>
                <Button variant="secondary" className="h-10 w-full">
                  로그인
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
