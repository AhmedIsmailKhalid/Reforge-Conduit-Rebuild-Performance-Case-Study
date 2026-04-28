interface TagListProps {
  tags: string[]
  onTagClick?: (tag: string) => void
  activeTag?: string
}

export function TagList({ tags, onTagClick, activeTag }: TagListProps) {
  if (tags.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-1.5" role="list" aria-label="Article tags">
      {tags.map((tag) => (
        <li key={tag}>
          {onTagClick ? (
            <button
              onClick={() => { onTagClick(tag) }}
              aria-pressed={activeTag === tag}
              className="px-2.5 py-0.5 rounded text-xs font-medium transition-all duration-150"
              style={{
                background: activeTag === tag ? 'var(--accent-bg)' : 'var(--surface-raised)',
                color: activeTag === tag ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                if (activeTag !== tag) {
                  e.currentTarget.style.background = 'rgba(217,119,6,0.07)'
                  e.currentTarget.style.color = 'var(--accent-text)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTag !== tag) {
                  e.currentTarget.style.background = 'var(--surface-raised)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }
              }}
            >
              {tag}
            </button>
          ) : (
            <span
              className="px-2.5 py-0.5 rounded text-xs font-medium"
              style={{
                background: 'var(--surface-raised)',
                color: 'var(--text-secondary)',
              }}
            >
              {tag}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}