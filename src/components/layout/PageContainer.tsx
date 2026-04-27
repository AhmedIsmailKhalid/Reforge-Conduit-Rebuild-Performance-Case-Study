import type { ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className={`max-w-6xl mx-auto px-4 py-8 ${className}`}>
      {children}
    </main>
  )
}