import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { useFavoriteArticle } from '@/features/articles/hooks/useFavoriteArticle'

interface FavoriteButtonProps {
  slug: string
  favorited: boolean
  favoritesCount: number
  compact?: boolean
}

export function FavoriteButton({
  slug,
  favorited,
  favoritesCount,
  compact = false,
}: FavoriteButtonProps) {
  const { token } = useAuthStore()
  const navigate = useNavigate()
  const { mutate: toggleFavorite, isPending } = useFavoriteArticle()

  const handleClick = () => {
    if (!token) {
      void navigate(ROUTES.LOGIN)
      return
    }
    toggleFavorite({ slug, favorited })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={favorited}
      className={`inline-flex items-center gap-1.5 rounded-lg transition-all duration-150 font-medium text-sm
        ${favorited
          ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white hover:opacity-90'
          : 'bg-transparent border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-raised)]'
        }
        ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1.5'}
        ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={favorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {!compact && <span>{favoritesCount}</span>}
    </button>
  )
}