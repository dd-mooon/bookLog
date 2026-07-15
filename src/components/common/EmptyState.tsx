interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <p className="text-lg font-medium">{title}</p>
      {description ? (
        <p className="text-foreground/60 max-w-sm text-sm">{description}</p>
      ) : null}
    </div>
  );
}
