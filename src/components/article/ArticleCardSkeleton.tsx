export function ArticleCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="ml-auto h-7 w-16 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="flex gap-2">
          <div className="h-5 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-5 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  )
}