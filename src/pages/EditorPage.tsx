import { useParams } from 'react-router-dom'
import { ArticleEditor } from '@/features/articles/components/ArticleEditor'
import { useArticle } from '@/features/articles/hooks/useArticle'
import { PageContainer } from '@/components/layout/PageContainer'
import { AuthGuard } from '@/features/auth/components/AuthGuard'

export default function EditorPage() {
  const { slug } = useParams<{ slug?: string }>()
  const { data: article, isLoading } = useArticle(slug ?? '')

  return (
    <AuthGuard>
      <PageContainer>
        {isLoading ? (
          <div className="max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-8 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded bg-slate-200 dark:bg-slate-700" />
            ))}
          </div>
        ) : (
          <ArticleEditor existingArticle={slug ? article : undefined} />
        )}
      </PageContainer>
    </AuthGuard>
  )
}