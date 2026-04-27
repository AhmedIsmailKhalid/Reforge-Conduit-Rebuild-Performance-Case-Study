import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiTagsResponse } from '@/api/types'

const SKELETON_WIDTHS = ['48px', '64px', '56px', '72px', '48px', '60px', '52px', '68px']
const MAX_VISIBLE = 12

interface TagsSidebarProps {
  onTagClick: (tag: string) => void
  activeTag?: string
}

export function TagsSidebar({ onTagClick, activeTag }: TagsSidebarProps) {
  const [showAll, setShowAll] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiTagsResponse>(ENDPOINTS.TAGS)
      return data.tags
    },
    staleTime: 1000 * 60 * 5,
  })

  const visibleTags = data
    ? showAll ? data : data.slice(0, MAX_VISIBLE)
    : []

  return (
    <aside aria-label="Popular tags">
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-4"
        style={{ color: 'var(--text-muted)' }}
      >
        Popular Tags
      </p>

      {isLoading && (
        <div className="flex flex-wrap gap-2">
          {SKELETON_WIDTHS.map((width, i) => (
            <div
              key={i}
              className="h-6 rounded animate-pulse"
              style={{ width, background: 'rgba(148,163,184,0.06)' }}
            />
          ))}
        </div>
      )}

      {data && (
        <>
          <ul className="flex flex-wrap gap-1.5" role="list">
            {visibleTags.map((tag) => {
              const isActive = activeTag === tag
              return (
                <li key={tag}>
                  <button
                    onClick={() => { onTagClick(tag) }}
                    aria-pressed={isActive}
                    className="px-2.5 py-0.5 rounded text-xs font-medium transition-all duration-150"
                    style={{
                      background: isActive ? 'var(--color-accent)' : 'rgba(148,163,184,0.06)',
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(217,119,6,0.07)'
                        e.currentTarget.style.color = 'var(--color-accent)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(148,163,184,0.06)'
                        e.currentTarget.style.color = 'var(--text-muted)'
                      }
                    }}
                  >
                    {tag}
                  </button>
                </li>
              )
            })}
          </ul>

          {data.length > MAX_VISIBLE && (
            <button
              onClick={() => { setShowAll((prev) => !prev) }}
              className="mt-4 text-xs font-medium transition-colors duration-150 hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              {showAll ? 'Show less' : 'Explore more tags'}
            </button>
          )}
        </>
      )}
    </aside>
  )
}