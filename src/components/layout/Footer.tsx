import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to={ROUTES.HOME}
          className="text-sm font-bold text-blue-600 dark:text-blue-400"
        >
          Reforge
        </Link>

        <p className="text-xs text-slate-400 dark:text-slate-600">
          A performance case study, rebuilt from{' '}
          <a
            href="https://conduit-realworld-example-app.fly.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-600 dark:hover:text-slate-400 transition"
          >
            Conduit RealWorld
          </a>
        </p>
      </div>
    </footer>
  )
}