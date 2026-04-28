import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { PageContainer } from '@/components/layout/PageContainer'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Page not found')
  return (
    <PageContainer>
      <div className="text-center py-24">
        <p
          className="text-8xl font-bold mb-4 select-none"
          style={{ color: 'var(--surface-raised)' }}
        >
          404
        </p>
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Page not found
        </h1>
        <p
          className="mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to={ROUTES.HOME}
          className="px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-150 inline-block"
          style={{ background: 'var(--color-accent)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-accent-hover)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-accent)' }}
        >
          Back to home
        </Link>
      </div>
    </PageContainer>
  )
}