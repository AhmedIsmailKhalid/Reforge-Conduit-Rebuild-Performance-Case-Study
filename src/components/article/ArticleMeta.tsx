import { Link } from 'react-router-dom'
import type { ApiArticle } from '@/api/types'
import { FavoriteButton } from './FavoriteButton'
import { ROUTES } from '@/router/routes'

interface ArticleMetaProps {
  article: ApiArticle
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ArticleMeta({ article }: ArticleMetaProps) {
  const profilePath = ROUTES.PROFILE.replace(':username', article.author.username)

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3">
        <Link to={profilePath} aria-label={`View ${article.author.username}'s profile`}>
          {article.author.image ? (
            <img
              src={article.author.image}
              alt={article.author.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-medium text-slate-500">
              {article.author.username[0]?.toUpperCase()}
            </div>
          )}
        </Link>
        <div>
          <Link
            to={profilePath}
            className="block text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {article.author.username}
          </Link>
          <time
            dateTime={article.createdAt}
            className="text-xs text-slate-500 dark:text-slate-400"
          >
            {formatDate(article.createdAt)}
          </time>
        </div>
      </div>

      <FavoriteButton
        slug={article.slug}
        favorited={article.favorited}
        favoritesCount={article.favoritesCount}
      />
    </div>
  )
}