import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalFeed } from '@/features/feed/components/GlobalFeed'
import { TagsSidebar } from '@/features/feed/components/TagsSidebar'
import { PageContainer } from '@/components/layout/PageContainer'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { ROUTES } from '@/router/routes'

export default function HomePage() {
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined)
  const { token } = useAuthStore()
  const { resolvedTheme } = useThemeStore()
  const isDark = resolvedTheme() === 'dark'

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? undefined : tag))
  }

  const heroStyle = isDark
    ? {
        background:
          'radial-gradient(ellipse at 75% 50%, rgba(217,119,6,0.05) 0%, transparent 65%), linear-gradient(180deg, #1e293b 0%, #1a2535 100%)',
        borderBottom: '1px solid rgba(51,65,85,0.6)',
      }
    : {
        background:
          'linear-gradient(135deg, #f8fafc 0%, #f4f7fa 60%, rgba(254,243,199,0.35) 100%)',
        borderBottom: '1px solid rgba(226,232,240,0.8)',
      }

  return (
    <div>
      <div style={heroStyle}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <h1
            className="font-serif text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            Reforge
          </h1>
          <p
            className="text-xl md:text-2xl max-w-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Ideas worth sharing.{' '}
            <span style={{ color: 'var(--text-muted)' }}>
              Writing worth reading.
            </span>
          </p>
          {!token && (
            <div className="flex items-center gap-3 mt-8">
              <Link
                to={ROUTES.REGISTER}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-150"
                style={{ background: 'var(--color-accent)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-accent-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-accent)'
                }}
              >
                Start reading
              </Link>
              <Link
                to={ROUTES.LOGIN}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150"
                style={{
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: 'var(--surface)' }}>
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-16">
            <GlobalFeed activeTag={activeTag} onTagClick={handleTagClick} />
            <aside>
              <div className="sticky top-20">
                <TagsSidebar onTagClick={handleTagClick} activeTag={activeTag} />
              </div>
            </aside>
          </div>
        </PageContainer>
      </div>
    </div>
  )
}