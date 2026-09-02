import Link from 'next/link';

import { cn } from '@/lib';
import { ROUTES } from '@/constants';

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({
  page,
  totalPages,
  basePath = ROUTES.POSTS,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="페이지네이션"
    >
      <PageLink
        href={`${basePath}?page=${page - 1}`}
        disabled={page <= 1}
        label="이전"
      />
      {pages.map((pageNumber) => (
        <PageLink
          key={pageNumber}
          href={`${basePath}?page=${pageNumber}`}
          active={pageNumber === page}
          label={String(pageNumber)}
        />
      ))}
      <PageLink
        href={`${basePath}?page=${page + 1}`}
        disabled={page >= totalPages}
        label="다음"
      />
    </nav>
  );
}

function PageLink({
  href,
  label,
  active,
  disabled,
}: {
  href: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <span className="text-foreground/30 inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm">
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm transition-colors',
        active
          ? 'bg-foreground text-background'
          : 'border-foreground/15 hover:bg-foreground/5 border',
      )}
      aria-current={active ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}
