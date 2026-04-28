import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useArticle } from '@/features/articles/hooks/useArticle'
import { useDeleteArticle } from '@/features/articles/hooks/useDeleteArticle'
import { ArticleBody } from '@/features/articles/components/ArticleBody'
import { ArticleMeta } from '@/components/article/ArticleMeta'
import { CommentSection } from '@/features/articles/components/CommentSection'
import { TagList } from '@/components/article/TagList'
import { PageContainer } from '@/components/layout/PageContainer'
import { useAuthStore } from '@/store/authStore'
import { usePageTitle } from '@/hooks/usePageTitle'
import { buildArticleJsonLD } from '@/lib/seo'
import { ROUTES } from '@/router/routes'

const BASE_URL = 'https://reforge.vercel.app'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { data: article, isLoading, isError } = useArticle(slug ?? '')
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle()

  usePageTitle(article?.title)

  useEffect(() => {
    if (!article) return

    const existing = document.querySelectorAll('meta[data-dynamic]')
    existing.forEach((el) => { el.remove() })

    const articleUrl = `${BASE_URL}/article/${article.slug}`
    const jsonLD = buildArticleJsonLD({
      title: article.title,
      description: article.description,
      author: article.author.username,
      publishedTime: article.createdAt,
      url: articleUrl,
    })

    const tags: Array<{ tag: string; attrs: Record<string, string> }> = [
      { tag: 'meta', attrs: { name: 'description', content: article.description } },
      { tag: 'meta', attrs: { property: 'og:title', content: `${article.title} — Reforge` } },
      { tag: 'meta', attrs: { property: 'og:description', content: article.description } },
      { tag: 'meta', attrs: { property: 'og:type', content: 'article' } },
      { tag: 'meta', attrs: { property: 'og:url', content: articleUrl } },
      { tag: 'meta', attrs: { property: 'article:published_time', content: article.createdAt } },
      { tag: 'meta', attrs: { property: 'article:author', content: article.author.username } },
      { tag: 'meta', attrs: { name: 'twitter:title', content: `${article.title} — Reforge` } },
      { tag: 'meta', attrs: { name: 'twitter:description', content: article.description } },
    ]

    tags.forEach(({ tag, attrs }) => {
      const el = document.createElement(tag)
      Object.entries(attrs).forEach(([k, v]) => { el.setAttribute(k, v) })
      el.setAttribute('data-dynamic', 'true')
      document.head.appendChild(el)
    })

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-dynamic', 'true')
    script.textContent = jsonLD
    document.head.appendChild(script)

    return () => {
      document.querySelectorAll('[data-dynamic]').forEach((el) => { el.remove() })
    }
  }, [article])

  if (isLoading) {
    return (
      <PageContainer>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 rounded" style={{ background: 'var(--surface-raised)' }} />
          <div className="h-4 w-1/3 rounded" style={{ background: 'var(--surface-raised)' }} />
          <div className="space-y-2 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 rounded" style={{ background: 'var(--surface-raised)' }} />
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
          <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
            Article not found or failed to load.
          </p>
          <Link
            to={ROUTES.HOME}
            className="text-sm hover:underline"
            style={{ color: 'var(--color-accent)' }}
          >
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
      <div
        className="py-12 px-4"
        style={{ background: 'var(--surface-alt)', borderBottom: '1px solid rgba(148,163,184,0.12)' }}
      >
        <div className="max-w-4xl mx-auto">
          <h1
            className="font-serif text-3xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--text-primary)', fontWeight: 800 }}
          >
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ArticleMeta article={article} />
            {isOwner && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { void navigate(editPath) }}
                  className="px-3 py-1.5 text-sm rounded-lg transition-all duration-150"
                  style={{
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-primary)'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                  }}
                >
                  Edit article
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-3 py-1.5 text-sm rounded-lg transition-all duration-150 disabled:opacity-50"
                  style={{
                    border: '1px solid rgba(239,68,68,0.4)',
                    color: '#ef4444',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ef4444'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'
                  }}
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

        <div
          className="mt-8 pt-8"
          style={{ borderTop: '1px solid rgba(148,163,184,0.12)' }}
        >
          <TagList tags={article.tagList} />
        </div>

        <div className="mt-12">
          <CommentSection slug={article.slug} />
        </div>
      </PageContainer>
    </div>
  )
}