import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiTagsResponse } from '@/api/types'

const SKELETON_WIDTHS = ['48px', '64px', '56px', '72px', '48px', '60px', '52px', '68px']

interface TagsSidebarProps {
  onTagClick: (tag: string) => void
  activeTag?: string
}

export function TagsSidebar({ onTagClick, activeTag }: TagsSidebarProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiTagsResponse>(ENDPOINTS.TAGS)
      return data.tags
    },
    staleTime: 1000 * 60 * 5,
  })

  return (
    <aside aria-label="Popular tags">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
          Popular Tags
        </h2>

        {isLoading && (
          <div className="flex flex-wrap gap-2">
            {SKELETON_WIDTHS.map((width, i) => (
              <div
                key={i}
                className="h-6 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"
                style={{ width }}
              />
            ))}
          </div>
        )}

        {data && (
          <ul className="flex flex-wrap gap-2" role="list">
            {data.map((tag) => (
              <li key={tag}>
                <button
                  onClick={() => { onTagClick(tag) }}
                  aria-pressed={activeTag === tag}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition
                    ${activeTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }
                  `}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}