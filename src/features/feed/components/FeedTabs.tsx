import { useAuthStore } from '@/store/authStore'

export type FeedTab = 'global' | 'personal' | 'tag'

interface FeedTabsProps {
  activeTab: FeedTab
  activeTag?: string
  onTabChange: (tab: FeedTab) => void
}

export function FeedTabs({ activeTab, activeTag, onTabChange }: FeedTabsProps) {
  const { token } = useAuthStore()

  const tabClass = (tab: FeedTab) =>
    `px-4 py-2.5 text-sm font-medium border-b-2 transition whitespace-nowrap
      ${activeTab === tab
        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
      }
    `

  return (
    <div
      className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto"
      role="tablist"
      aria-label="Feed tabs"
    >
      {token && (
        <button
          role="tab"
          aria-selected={activeTab === 'personal'}
          onClick={() => { onTabChange('personal') }}
          className={tabClass('personal')}
        >
          Your Feed
        </button>
      )}
      <button
        role="tab"
        aria-selected={activeTab === 'global'}
        onClick={() => { onTabChange('global') }}
        className={tabClass('global')}
      >
        Global Feed
      </button>
      {activeTab === 'tag' && activeTag && (
        <button
          role="tab"
          aria-selected={true}
          className={tabClass('tag')}
        >
          #{activeTag}
        </button>
      )}
    </div>
  )
}