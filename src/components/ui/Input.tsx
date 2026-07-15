import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={inputId}>
      <span className="font-medium">{label}</span>
      <input
        id={inputId}
        className={cn(
          'border-foreground/15 bg-background focus:border-foreground/40 h-10 rounded-md border px-3 transition-colors outline-none',
          className,
        )}
        {...props}
      />
    </label>
  );
}
