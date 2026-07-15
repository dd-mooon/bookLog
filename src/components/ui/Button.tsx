import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/lib';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-foreground text-background hover:opacity-90 disabled:opacity-50',
  secondary:
    'border border-foreground/20 bg-transparent hover:bg-foreground/5 disabled:opacity-50',
  ghost: 'bg-transparent hover:bg-foreground/5 disabled:opacity-50',
};

export function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-opacity',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
