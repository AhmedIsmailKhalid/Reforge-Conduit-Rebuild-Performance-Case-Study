import { useState } from 'react'
import { useArticles } from '@/features/articles/hooks/useArticles'
import { useFeed } from '../hooks/useFeed'
import { ArticleCard } from '@/components/article/ArticleCard'
import { ArticleCardSkeleton } from '@/components/article/ArticleCardSkeleton'
import { Pagination } from './Pagination'
import { FeedTabs, type FeedTab } from './FeedTabs'
import { useAuthStore } from '@/store/authStore'

const PAGE_SIZE = 10

interface GlobalFeedProps {
  initialTag?: string
}

export function GlobalFeed({ initialTag }: GlobalFeedProps) {
  const { token } = useAuthStore()
  const [activeTab, setActiveTab] = useState<FeedTab>(
    initialTag ? 'tag' : token ? 'personal' : 'global'
  )
  const [activeTag, setActiveTag] = useState<string | undefined>(initialTag)
  const [page, setPage] = useState(1)

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
    setActiveTab(tab)
    setPage(1)
    if (tab !== 'tag') setActiveTag(undefined)
  }

  const handleTagClick = (tag: string) => {
    setActiveTag(tag)
    setActiveTab('tag')
    setPage(1)
  }

  return (
    <section aria-label="Article feed">
      <FeedTabs
        activeTab={activeTab}
        activeTag={activeTag}
        onTabChange={handleTabChange}
      />

      <div className="mt-6 space-y-4">
        {isLoading && (
          Array.from({ length: 5 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))
        )}

        {isError && (
          <div role="alert" className="text-center py-12 text-slate-500 dark:text-slate-400">
            Failed to load articles. Please try again.
          </div>
        )}

        {!isLoading && !isError && data?.articles.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            No articles found.
          </div>
        )}

        {data?.articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            onTagClick={handleTagClick}
            activeTag={activeTag}
          />
        ))}
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