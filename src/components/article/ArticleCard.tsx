import { Link } from 'react-router-dom'
import type { ApiArticle } from '@/api/types'
import { FavoriteButton } from './FavoriteButton'
import { TagList } from './TagList'
import { ROUTES } from '@/router/routes'

interface ArticleCardProps {
  article: ApiArticle
  onTagClick?: (tag: string) => void
  activeTag?: string
  variant?: 'featured' | 'secondary' | 'compact'
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function AuthorRow({ article }: { article: ApiArticle }) {
  const profilePath = ROUTES.PROFILE.replace(':username', article.author.username)

  return (
    <div className="flex items-center gap-2.5">
      <Link to={profilePath} aria-label={`View ${article.author.username}'s profile`}>
        {article.author.image ? (
          <img
            src={article.author.image}
            alt={article.author.username}
            className="w-7 h-7 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: 'var(--color-accent-light)',
              color: 'var(--color-accent-muted)',
            }}
          >
            {article.author.username[0]?.toUpperCase()}
          </div>
        )}
      </Link>
      <div
        className="flex items-center gap-1.5 text-xs"
        style={{ color: 'var(--text-muted)' }}
      >
        <Link
          to={profilePath}
          className="font-medium transition-colors duration-150"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          {article.author.username}
        </Link>
        <span aria-hidden="true">·</span>
        <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
      </div>
    </div>
  )
}

function FeaturedImagePlaceholder({ title }: { title: string }) {
  const letter = title[0]?.toUpperCase() ?? '?'

  return (
    <div
      className="hidden md:block rounded-2xl overflow-hidden min-h-64 relative"
      style={{ background: 'var(--featured-placeholder-bg)' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 35%, rgba(217,119,6,0.06) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: 'var(--featured-placeholder-overlay)' }}
      />
      <div className="relative flex items-center justify-center min-h-64 select-none">
        <p
          className="font-serif font-bold leading-none"
          style={{
            fontSize: '8rem',
            color: 'var(--border-strong)',
            opacity: 0.2,
          }}
        >
          {letter}
        </p>
      </div>
    </div>
  )
}

function FeaturedCard({ article, onTagClick, activeTag }: Omit<ArticleCardProps, 'variant'>) {
  const articlePath = ROUTES.ARTICLE.replace(':slug', article.slug)

  return (
    <article
      className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 transition-transform duration-200"
      style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}
    >
      <div className="flex flex-col justify-between gap-6">
        <div>
          <span
            className="inline-block text-xs font-bold uppercase mb-4"
            style={{
              color: 'var(--color-accent)',
              letterSpacing: '0.22em',
            }}
          >
            Featured
          </span>
          <Link to={articlePath}>
            <h2
              className="font-serif text-3xl md:text-4xl leading-tight transition-colors duration-150 mb-3"
              style={{
                color: 'var(--text-primary)',
                fontWeight: 800,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
            >
              {article.title}
            </h2>
          </Link>
          <p
            className="leading-relaxed line-clamp-3 text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            {article.description}
          </p>
        </div>

        <div className="space-y-4">
          <TagList tags={article.tagList} onTagClick={onTagClick} activeTag={activeTag} />
          <div className="flex items-center justify-between">
            <AuthorRow article={article} />
            <FavoriteButton
              slug={article.slug}
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
              compact
            />
          </div>
        </div>
      </div>

      <Link to={articlePath} aria-hidden="true" tabIndex={-1} className="block">
        <FeaturedImagePlaceholder title={article.title} />
      </Link>
    </article>
  )
}

function SecondaryCard({ article, onTagClick, activeTag }: Omit<ArticleCardProps, 'variant'>) {
  const articlePath = ROUTES.ARTICLE.replace(':slug', article.slug)

  return (
    <article
      className="group flex flex-col gap-3 py-6 rounded-lg px-2 -mx-2 transition-all duration-150"
      style={{ borderBottom: '1px solid rgba(148,163,184,0.10)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--surface-alt)'
        e.currentTarget.style.paddingLeft = '12px'
        e.currentTarget.style.paddingRight = '12px'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.paddingLeft = '8px'
        e.currentTarget.style.paddingRight = '8px'
      }}
    >
      <AuthorRow article={article} />
      <Link to={articlePath}>
        <h2
          className="font-serif text-xl font-bold leading-snug transition-colors duration-150"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
        >
          {article.title}
        </h2>
        <p
          className="mt-1.5 text-sm line-clamp-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {article.description}
        </p>
      </Link>
      <div className="flex items-center justify-between mt-1">
        <TagList tags={article.tagList} onTagClick={onTagClick} activeTag={activeTag} />
        <FavoriteButton
          slug={article.slug}
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
          compact
        />
      </div>
    </article>
  )
}

function CompactCard({ article }: Omit<ArticleCardProps, 'variant'>) {
  const articlePath = ROUTES.ARTICLE.replace(':slug', article.slug)
  const profilePath = ROUTES.PROFILE.replace(':username', article.author.username)

  return (
    <article
      className="group flex items-start gap-4 py-4 rounded-lg px-2 -mx-2 transition-all duration-150"
      style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-alt)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      <div className="flex-1 min-w-0">
        <div
          className="flex items-center gap-1.5 text-xs mb-1.5"
          style={{ color: 'var(--text-muted)' }}
        >
          <Link
            to={profilePath}
            className="font-medium transition-colors duration-150"
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {article.author.username}
          </Link>
          <span aria-hidden="true">·</span>
          <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
        </div>
        <Link to={articlePath}>
          <h3
            className="font-semibold text-sm leading-snug transition-colors duration-150 line-clamp-2"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
          >
            {article.title}
          </h3>
        </Link>
      </div>
      <FavoriteButton
        slug={article.slug}
        favorited={article.favorited}
        favoritesCount={article.favoritesCount}
        compact
      />
    </article>
  )
}

export function ArticleCard({ article, onTagClick, activeTag, variant = 'secondary' }: ArticleCardProps) {
  if (variant === 'featured') {
    return <FeaturedCard article={article} onTagClick={onTagClick} activeTag={activeTag} />
  }
  if (variant === 'compact') {
    return <CompactCard article={article} onTagClick={onTagClick} activeTag={activeTag} />
  }
  return <SecondaryCard article={article} onTagClick={onTagClick} activeTag={activeTag} />
}