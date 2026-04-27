import { useState } from 'react'
import { GlobalFeed } from '@/features/feed/components/GlobalFeed'
import { TagsSidebar } from '@/features/feed/components/TagsSidebar'
import { PageContainer } from '@/components/layout/PageContainer'

export default function HomePage() {
  const [activeTag, setActiveTag] = useState<string | undefined>(undefined)

  return (
    <div>
      <div className="bg-blue-600 dark:bg-blue-700 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Reforge</h1>
        <p className="text-blue-100 text-lg">A place to share knowledge.</p>
      </div>

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          <GlobalFeed initialTag={activeTag} />
          <TagsSidebar onTagClick={setActiveTag} activeTag={activeTag} />
        </div>
      </PageContainer>
    </div>
  )
}