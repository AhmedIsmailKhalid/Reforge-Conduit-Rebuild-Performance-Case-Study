import { useState } from 'react'
import { useArticles } from '@/features/articles/hooks/useArticles'
import { ArticleCard } from '@/components/article/ArticleCard'
import { ArticleCardSkeleton } from '@/components/article/ArticleCardSkeleton'
import { Pagination } from '@/features/feed/components/Pagination'

interface ProfileArticlesProps {
  username: string
  mode: 'authored' | 'favorited'
}

const PAGE_SIZE = 10

export function ProfileArticles({ username, mode }: ProfileArticlesProps) {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useArticles({
    author: mode === 'authored' ? username : undefined,
    favorited: mode === 'favorited' ? username : undefined,
    page,
    limit: PAGE_SIZE,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="text-center py-12 text-slate-500 dark:text-slate-400">
        Failed to load articles.
      </div>
    )
  }

  if (!data?.articles.length) {
    return (
      <p className="text-center py-12 text-slate-500 dark:text-slate-400">
        {mode === 'authored' ? 'No articles published yet.' : 'No favorited articles yet.'}
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {data.articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
      {data.articlesCount > PAGE_SIZE && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalCount={data.articlesCount}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}