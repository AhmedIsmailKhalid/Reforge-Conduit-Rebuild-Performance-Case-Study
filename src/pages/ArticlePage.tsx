import { useParams, useNavigate, Link } from 'react-router-dom'
import { useArticle } from '@/features/articles/hooks/useArticle'
import { useDeleteArticle } from '@/features/articles/hooks/useDeleteArticle'
import { ArticleBody } from '@/features/articles/components/ArticleBody'
import { ArticleMeta } from '@/components/article/ArticleMeta'
import { CommentSection } from '@/features/articles/components/CommentSection'
import { TagList } from '@/components/article/TagList'
import { PageContainer } from '@/components/layout/PageContainer'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/router/routes'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { data: article, isLoading, isError } = useArticle(slug ?? '')
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle()

  if (isLoading) {
    return (
      <PageContainer>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="space-y-2 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 rounded bg-slate-200 dark:bg-slate-700" />
            ))}
          </div>
        </div>
      </PageContainer>
    )
  }

  if (isError || !article) {
    return (
      <PageContainer>
        <div role="alert" className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Article not found or failed to load.
          </p>
          <Link to={ROUTES.HOME} className="text-blue-600 hover:underline text-sm">
            Back to home
          </Link>
        </div>
      </PageContainer>
    )
  }

  const isOwner = user?.username === article.author.username
  const editPath = ROUTES.EDITOR_EDIT.replace(':slug', article.slug)

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(article.slug)
    }
  }

  return (
    <div>
      <div className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ArticleMeta article={article} />
            {isOwner && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { void navigate(editPath) }}
                  className="px-3 py-1.5 text-sm border border-slate-400 hover:border-white text-slate-300 hover:text-white rounded-lg transition"
                >
                  Edit article
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-3 py-1.5 text-sm border border-red-400 hover:border-red-300 text-red-400 hover:text-red-300 rounded-lg transition disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete article'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <PageContainer className="max-w-4xl">
        <ArticleBody body={article.body} />

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <TagList tags={article.tagList} />
        </div>

        <div className="mt-12">
          <CommentSection slug={article.slug} />
        </div>
      </PageContainer>
    </div>
  )
}