import { Link } from 'react-router-dom'
import type { ApiArticle } from '@/api/types'
import { FavoriteButton } from './FavoriteButton'
import { TagList } from './TagList'
import { ROUTES } from '@/router/routes'

interface ArticleCardProps {
  article: ApiArticle
  onTagClick?: (tag: string) => void
  activeTag?: string
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ArticleCard({ article, onTagClick, activeTag }: ArticleCardProps) {
  const profilePath = ROUTES.PROFILE.replace(':username', article.author.username)
  const articlePath = ROUTES.ARTICLE.replace(':slug', article.slug)

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4 hover:border-slate-300 dark:hover:border-slate-600 transition">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link to={profilePath} aria-label={`View ${article.author.username}'s profile`}>
            {article.author.image ? (
              <img
                src={article.author.image}
                alt={article.author.username}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center text-sm font-medium text-slate-500">
                {article.author.username[0]?.toUpperCase()}
              </div>
            )}
          </Link>
          <div className="min-w-0">
            <Link
              to={profilePath}
              className="block text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 truncate transition"
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
          compact
        />
      </div>

      <div>
        <Link to={articlePath}>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition mb-1 line-clamp-2">
            {article.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {article.description}
          </p>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4 mt-auto">
        <Link
          to={articlePath}
          className="text-xs text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Read more
        </Link>
        <TagList tags={article.tagList} onTagClick={onTagClick} activeTag={activeTag} />
      </div>
    </article>
  )
}