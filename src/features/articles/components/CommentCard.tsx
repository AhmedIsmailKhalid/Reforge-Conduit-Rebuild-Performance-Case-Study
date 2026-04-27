import type { ApiComment } from '@/api/types'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { useAuthStore } from '@/store/authStore'
import { useDeleteComment } from '../hooks/useDeleteComment'

interface CommentCardProps {
  comment: ApiComment
  slug: string
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function CommentCard({ comment, slug }: CommentCardProps) {
  const { user } = useAuthStore()
  const { mutate: deleteComment, isPending } = useDeleteComment(slug)
  const isOwner = user?.username === comment.author.username
  const profilePath = ROUTES.PROFILE.replace(':username', comment.author.username)

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {comment.body}
        </p>
      </div>
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex items-center gap-3">
        <Link to={profilePath} aria-label={`View ${comment.author.username}'s profile`}>
          {comment.author.image ? (
            <img
              src={comment.author.image}
              alt={comment.author.username}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-medium text-slate-500">
              {comment.author.username[0]?.toUpperCase()}
            </div>
          )}
        </Link>
        <Link
          to={profilePath}
          className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          {comment.author.username}
        </Link>
        <time
          dateTime={comment.createdAt}
          className="text-xs text-slate-400 dark:text-slate-500"
        >
          {formatDate(comment.createdAt)}
        </time>
        {isOwner && (
          <button
            onClick={() => { deleteComment(comment.id) }}
            disabled={isPending}
            aria-label="Delete comment"
            className="ml-auto text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition disabled:opacity-50"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  )
}