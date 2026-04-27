interface ArticleCardSkeletonProps {
  variant?: 'featured' | 'secondary' | 'compact'
}

export function ArticleCardSkeleton({ variant = 'secondary' }: ArticleCardSkeletonProps) {
  if (variant === 'featured') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-[var(--color-border)] dark:border-[var(--color-dark-border)] animate-pulse">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <div className="h-3 w-16 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
            <div className="h-10 w-full rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
            <div className="h-10 w-3/4 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
            <div className="h-4 w-full rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
            <div className="h-4 w-2/3 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
            <div className="h-3 w-24 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
          </div>
        </div>
        <div className="hidden md:block rounded-2xl bg-[var(--color-surface-alt)] dark:bg-[var(--color-dark-surface-alt)] min-h-64" />
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-4 py-4 border-b border-[var(--color-border)] dark:border-[var(--color-dark-border)] animate-pulse">
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
          <div className="h-4 w-full rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
          <div className="h-4 w-2/3 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
        </div>
        <div className="h-6 w-10 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 py-6 border-b border-[var(--color-border)] dark:border-[var(--color-dark-border)] animate-pulse">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
        <div className="h-3 w-32 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
      </div>
      <div className="space-y-2">
        <div className="h-6 w-3/4 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
        <div className="h-4 w-full rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
        <div className="h-4 w-2/3 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
      </div>
      <div className="h-3 w-16 rounded bg-[var(--color-surface-raised)] dark:bg-[var(--color-dark-surface-raised)]" />
    </div>
  )
}