interface PaginationProps {
  currentPage: number
  totalCount: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize)

  if (totalPages <= 1) return null

  return (
    <nav aria-label="Article pagination">
      <ul className="flex flex-wrap gap-1.5" role="list">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              onClick={() => { onPageChange(page) }}
              aria-label={`Page ${page.toString()}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition
                ${currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600'
                }
              `}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}