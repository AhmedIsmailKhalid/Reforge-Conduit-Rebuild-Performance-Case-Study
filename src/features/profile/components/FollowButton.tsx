import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { useFollowUser } from '../hooks/useFollowUser'

interface FollowButtonProps {
  username: string
  following: boolean
}

export function FollowButton({ username, following }: FollowButtonProps) {
  const { token } = useAuthStore()
  const navigate = useNavigate()
  const { mutate: toggleFollow, isPending } = useFollowUser(username)

  const handleClick = () => {
    if (!token) {
      void navigate(ROUTES.LOGIN)
      return
    }
    toggleFollow(following)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={following}
      aria-label={following ? `Unfollow ${username}` : `Follow ${username}`}
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border text-sm font-medium transition
        ${following
          ? 'bg-slate-600 border-slate-600 text-white hover:bg-slate-700 hover:border-slate-700'
          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600'
        }
        ${isPending ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  )
}