import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useAddComment } from '../hooks/useAddComment'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'

interface CommentFormProps {
  slug: string
}

export function CommentForm({ slug }: CommentFormProps) {
  const { token, user } = useAuthStore()
  const [body, setBody] = useState('')
  const { mutate: addComment, isPending } = useAddComment(slug)

  if (!token) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
        <Link to={ROUTES.LOGIN} className="text-blue-600 hover:underline">
          Sign in
        </Link>
        {' or '}
        <Link to={ROUTES.REGISTER} className="text-blue-600 hover:underline">
          sign up
        </Link>
        {' to add comments.'}
      </p>
    )
  }

  const handleSubmit = () => {
    if (!body.trim()) return
    addComment(body.trim(), {
      onSuccess: () => { setBody('') },
    })
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-4">
        <label htmlFor="comment-body" className="sr-only">
          Write a comment
        </label>
        <textarea
          id="comment-body"
          rows={3}
          value={body}
          onChange={(e) => { setBody(e.target.value) }}
          placeholder="Write a comment..."
          className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-400 (not 500) placeholder-slate-400 resize-none focus:outline-none"
        />
      </div>
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
        {user?.image ? (
          <img
            src={user.image}
            alt={user.username}
            className="w-7 h-7 rounded-full object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-medium text-slate-500">
            {user?.username[0]?.toUpperCase()}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={isPending || !body.trim()}
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition"
        >
          {isPending ? 'Posting...' : 'Post comment'}
        </button>
      </div>
    </div>
  )
}