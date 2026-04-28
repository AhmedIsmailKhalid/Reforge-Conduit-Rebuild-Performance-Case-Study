import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'

export function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{ borderTop: '1px solid rgba(148,163,184,0.12)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to={ROUTES.HOME}
          className="text-sm font-bold font-serif transition-colors duration-150"
          style={{ color: 'var(--accent-text)' }}
        >
          Reforge
        </Link>

        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          A performance case study, rebuilt from{' '}
          <a
            href="https://conduit-realworld-example-app.fly.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors duration-150"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent-text)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Conduit RealWorld
          </a>
        </p>
      </div>
    </footer>
  )
}