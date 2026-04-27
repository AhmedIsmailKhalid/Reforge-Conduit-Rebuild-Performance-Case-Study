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
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition
                ${activeTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }
              `}
            >
              {tag}
            </button>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
              {tag}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}