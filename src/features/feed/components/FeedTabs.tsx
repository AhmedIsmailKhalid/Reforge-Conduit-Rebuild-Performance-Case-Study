import { useAuthStore } from '@/store/authStore'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'

export type FeedTab = 'global' | 'personal' | 'tag'

interface FeedTabsProps {
  activeTab: FeedTab
  activeTag?: string
  onTabChange: (tab: FeedTab) => void
}

export function FeedTabs({ activeTab, activeTag, onTabChange }: FeedTabsProps) {
  const { token } = useAuthStore()

  const tabStyle = (tab: FeedTab) => ({
    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
  })

  return (
    <div
      className="flex gap-6"
      style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}
      role="tablist"
      aria-label="Feed tabs"
    >
      {token && (
        <button
          role="tab"
          aria-selected={activeTab === 'personal'}
          onClick={() => { onTabChange('personal') }}
          className="relative pb-3 text-sm font-semibold transition-colors duration-150 outline-none"
          style={tabStyle('personal')}
        >
          Your Feed
          {activeTab === 'personal' && (
            <span
              className="absolute bottom-0 left-0 right-0 rounded-full"
              style={{ height: '2.5px', background: 'var(--color-accent)' }}
            />
          )}
        </button>
      )}

      <button
        role="tab"
        aria-selected={activeTab === 'global'}
        onClick={() => { onTabChange('global') }}
        className="relative pb-3 text-sm font-semibold transition-colors duration-150"
        style={tabStyle('global')}
      >
        Global Feed
        {activeTab === 'global' && (
          <span
            className="absolute bottom-0 left-0 right-0 rounded-full"
            style={{ height: '2.5px', background: 'var(--color-accent)' }}
          />
        )}
      </button>

      {activeTab === 'tag' && activeTag && (
        <button
          role="tab"
          aria-selected={true}
          className="relative pb-3 text-sm font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          <span style={{ color: 'var(--color-accent)' }}>#</span>
          {activeTag}
          <span
            className="absolute bottom-0 left-0 right-0 rounded-full"
            style={{ height: '2.5px', background: 'var(--color-accent)' }}
          />
        </button>
      )}

      {!token && (
        <div className="ml-auto pb-3 flex items-center">
          <Link
            to={ROUTES.LOGIN}
            className="text-xs font-medium transition-colors duration-150 hover:underline"
            style={{ color: 'var(--text-muted)' }}
          >
            Sign in to see your feed
          </Link>
        </div>
      )}
    </div>
  )
}