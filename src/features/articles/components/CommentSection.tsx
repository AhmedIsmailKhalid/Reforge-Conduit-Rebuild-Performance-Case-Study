import { CommentForm } from './CommentForm'
import { CommentCard } from './CommentCard'
import { useComments } from '../hooks/useComments'

interface CommentSectionProps {
  slug: string
}

export function CommentSection({ slug }: CommentSectionProps) {
  const { data: comments, isLoading, isError } = useComments(slug)

  return (
    <section aria-label="Comments" className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-400 (not 500)">
        Comments
      </h2>

      <CommentForm slug={slug} />

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 animate-pulse"
            >
              <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700 mb-2" />
              <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div role="alert" className="text-sm text-red-600 dark:text-red-400">
          Failed to load comments.
        </div>
      )}

      {comments && comments.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
          No comments yet. Be the first to comment.
        </p>
      )}

      {comments?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} slug={slug} />
      ))}
    </section>
  )
}