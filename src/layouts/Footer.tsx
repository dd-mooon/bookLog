import Link from 'next/link';

import { ROUTES } from '@/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-foreground/10 mt-auto border-t">
      <div className="text-foreground/60 mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <Link
          href={ROUTES.HOME}
          className="text-foreground/80 hover:text-foreground font-medium"
        >
          Book Log
        </Link>
        <p className="text-center text-xs sm:text-left sm:text-sm">
          © {year} Book Log. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
