import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'
import { ProfileArticles } from '@/features/profile/components/ProfileArticles'
import { PageContainer } from '@/components/layout/PageContainer'
import { ROUTES } from '@/router/routes'

type ProfileTab = 'authored' | 'favorited'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [activeTab, setActiveTab] = useState<ProfileTab>('authored')
  const { data: profile, isLoading, isError } = useProfile(username ?? '')

  const tabClass = (tab: ProfileTab) =>
    `px-4 py-2.5 text-sm font-medium border-b-2 transition
      ${activeTab === tab
        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
      }
    `

  if (isLoading) {
    return (
      <div>
        <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-12 px-4">
          <div className="max-w-4xl mx-auto text-center animate-pulse">
            <div className="w-20 h-20 rounded-full bg-slate-300 dark:bg-slate-600 mx-auto mb-4" />
            <div className="h-6 w-32 rounded bg-slate-300 dark:bg-slate-600 mx-auto mb-2" />
            <div className="h-4 w-48 rounded bg-slate-300 dark:bg-slate-600 mx-auto" />
          </div>
        </div>
        <PageContainer>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            ))}
          </div>
        </PageContainer>
      </div>
    )
  }

  if (isError || !profile) {
    return (
      <PageContainer>
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Profile not found.
          </p>
          <Link to={ROUTES.HOME} className="text-blue-600 hover:underline text-sm">
            Back to home
          </Link>
        </div>
      </PageContainer>
    )
  }

  return (
    <div>
      <ProfileHeader profile={profile} />
      <PageContainer className="max-w-4xl">
        <div
          className="flex border-b border-slate-200 dark:border-slate-700 mb-6"
          role="tablist"
          aria-label="Profile tabs"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'authored'}
            onClick={() => { setActiveTab('authored') }}
            className={tabClass('authored')}
          >
            My Articles
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'favorited'}
            onClick={() => { setActiveTab('favorited') }}
            className={tabClass('favorited')}
          >
            Favorited Articles
          </button>
        </div>

        <ProfileArticles username={profile.username} mode={activeTab} />
      </PageContainer>
    </div>
  )
}