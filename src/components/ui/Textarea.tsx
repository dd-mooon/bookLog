import type { TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, id, className, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={textareaId}>
      <span className="font-medium">{label}</span>
      <textarea
        id={textareaId}
        className={cn(
          'border-foreground/15 bg-background focus:border-foreground/40 min-h-40 rounded-md border px-3 py-2 transition-colors outline-none',
          className,
        )}
        {...props}
      />
    </label>
  );
}
