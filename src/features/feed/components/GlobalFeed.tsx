import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useArticles } from '@/features/articles/hooks/useArticles'
import { useFeed } from '../hooks/useFeed'
import { ArticleCard } from '@/components/article/ArticleCard'
import { ArticleCardSkeleton } from '@/components/article/ArticleCardSkeleton'
import { Pagination } from './Pagination'
import { FeedTabs, type FeedTab } from './FeedTabs'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/router/routes'

const PAGE_SIZE = 10

interface EmptyStateProps {
  onSwitchToGlobal: () => void
}

function EmptyPersonalFeed({ onSwitchToGlobal }: EmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <p
        className="font-serif text-2xl font-bold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        Your feed is empty
      </p>
      <p
        className="text-sm mb-6 max-w-xs mx-auto leading-relaxed"
        style={{ color: 'var(--text-muted)' }}
      >
        Follow authors or explore articles to build a feed that matters to you.
      </p>
      <button
        onClick={onSwitchToGlobal}
        className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition"
        style={{ background: 'var(--color-accent)' }}
      >
        Explore articles
      </button>
    </div>
  )
}

function EmptyTagFeed({ onSwitchToGlobal }: EmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <p
        className="font-serif text-2xl font-bold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        No articles for this tag
      </p>
      <p
        className="text-sm mb-6"
        style={{ color: 'var(--text-muted)' }}
      >
        Try a different tag or browse the global feed.
      </p>
      <button
        onClick={onSwitchToGlobal}
        className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition"
        style={{ background: 'var(--color-accent)' }}
      >
        Global Feed
      </button>
    </div>
  )
}

function EmptyGlobalFeed() {
  return (
    <div className="py-20 text-center">
      <p
        className="font-serif text-2xl font-bold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        Nothing here yet
      </p>
      <p
        className="text-sm mb-6"
        style={{ color: 'var(--text-muted)' }}
      >
        Be the first to write something worth reading.
      </p>
      <Link
        to={ROUTES.EDITOR_NEW}
        className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition inline-block"
        style={{ background: 'var(--color-accent)' }}
      >
        Write an article
      </Link>
    </div>
  )
}

interface GlobalFeedProps {
  activeTag?: string
  onTagClick: (tag: string) => void
}

export function GlobalFeed({ activeTag, onTagClick }: GlobalFeedProps) {
  const { token } = useAuthStore()
  const [manualTab, setManualTab] = useState<FeedTab | null>(null)
  const [page, setPage] = useState(1)

  const activeTab: FeedTab = activeTag
    ? 'tag'
    : manualTab ?? (token ? 'personal' : 'global')

  const globalQuery = useArticles({
    tag: activeTab === 'tag' ? activeTag : undefined,
    page,
    limit: PAGE_SIZE,
  })

  const feedQuery = useFeed({ page, limit: PAGE_SIZE })

  const isPersonal = activeTab === 'personal'
  const query = isPersonal ? feedQuery : globalQuery
  const { data, isLoading, isError } = query

  const handleTabChange = (tab: FeedTab) => {
    setManualTab(tab)
    setPage(1)
  }

  const handleSwitchToGlobal = () => { handleTabChange('global') }

  const articles = data?.articles ?? []
  const featured = articles[0]
  const secondary = articles.slice(1, 4)
  const compact = articles.slice(4)

  return (
    <section aria-label="Article feed">
      <FeedTabs
        activeTab={activeTab}
        activeTag={activeTag}
        onTabChange={handleTabChange}
      />

      <div className="mt-8">
        {isLoading && (
          <div>
            <ArticleCardSkeleton variant="featured" />
            <div className="mt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <ArticleCardSkeleton key={i} variant="secondary" />
              ))}
            </div>
          </div>
        )}

        {isError && (
          <div
            role="alert"
            className="text-center py-16 text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Failed to load articles. Please try again.
          </div>
        )}

        {!isLoading && !isError && articles.length === 0 && (
          <>
            {activeTab === 'personal' && (
              <EmptyPersonalFeed onSwitchToGlobal={handleSwitchToGlobal} />
            )}
            {activeTab === 'tag' && (
              <EmptyTagFeed onSwitchToGlobal={handleSwitchToGlobal} />
            )}
            {activeTab === 'global' && <EmptyGlobalFeed />}
          </>
        )}

        {featured && (
          <ArticleCard
            article={featured}
            variant="featured"
            onTagClick={onTagClick}
            activeTag={activeTag}
          />
        )}

        {secondary.length > 0 && (
          <div className="mt-2">
            {secondary.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                variant="secondary"
                onTagClick={onTagClick}
                activeTag={activeTag}
              />
            ))}
          </div>
        )}

        {compact.length > 0 && (
          <div className="mt-2">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2 pt-6 pb-2 border-t border-[var(--color-border)] dark:border-[var(--color-dark-border)]"
              style={{ color: 'var(--text-muted)' }}
            >
              More articles
            </p>
            {compact.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                variant="compact"
                onTagClick={onTagClick}
                activeTag={activeTag}
              />
            ))}
          </div>
        )}
      </div>

      {data && data.articlesCount > PAGE_SIZE && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalCount={data.articlesCount}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      )}
    </section>
  )
}