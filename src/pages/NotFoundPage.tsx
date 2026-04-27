import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'
import { PageContainer } from '@/components/layout/PageContainer'

export default function NotFoundPage() {
  return (
    <PageContainer>
      <div className="text-center py-24">
        <p className="text-8xl font-bold text-slate-200 dark:text-slate-700 mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Page not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to={ROUTES.HOME}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Back to home
        </Link>
      </div>
    </PageContainer>
  )
}