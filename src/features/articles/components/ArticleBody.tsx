import { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

interface ArticleBodyProps {
  body: string
}

export function ArticleBody({ body }: ArticleBodyProps) {
  const sanitizedHtml = useMemo(() => {
    const rawHtml = marked.parse(body)
    if (typeof rawHtml !== 'string') return ''
    return DOMPurify.sanitize(rawHtml)
  }, [body])

  return (
    <div
      className="prose prose-slate dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}