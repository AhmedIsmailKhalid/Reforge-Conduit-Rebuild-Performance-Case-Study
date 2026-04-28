import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { ProfileHeader } from '@/features/profile/components/ProfileHeader'
import { ProfileArticles } from '@/features/profile/components/ProfileArticles'
import { PageContainer } from '@/components/layout/PageContainer'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ROUTES } from '@/router/routes'

type ProfileTab = 'authored' | 'favorited'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [activeTab, setActiveTab] = useState<ProfileTab>('authored')
  const { data: profile, isLoading, isError } = useProfile(username ?? '')

  usePageTitle(profile ? `@${profile.username}` : undefined)

  const tabStyle = (tab: ProfileTab) => ({
    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
    borderBottom: activeTab === tab ? '2.5px solid var(--color-accent)' : '2.5px solid transparent',
  })

  if (isLoading) {
    return (
      <div>
        <div
          className="border-b py-12 px-4"
          style={{
            background: 'var(--surface-alt)',
            borderColor: 'rgba(148,163,184,0.12)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center animate-pulse">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4"
              style={{ background: 'var(--surface-raised)' }}
            />
            <div
              className="h-6 w-32 rounded mx-auto mb-2"
              style={{ background: 'var(--surface-raised)' }}
            />
            <div
              className="h-4 w-48 rounded mx-auto"
              style={{ background: 'var(--surface-raised)' }}
            />
          </div>
        </div>
        <PageContainer>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-2xl animate-pulse"
                style={{ background: 'var(--surface-raised)' }}
              />
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
          <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
            Profile not found.
          </p>
          <Link
            to={ROUTES.HOME}
            className="text-sm hover:underline"
            style={{ color: 'var(--color-accent)' }}
          >
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
          className="flex gap-6 mb-8"
          style={{ borderBottom: '1px solid rgba(148,163,184,0.08)' }}
          role="tablist"
          aria-label="Profile tabs"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'authored'}
            onClick={() => { setActiveTab('authored') }}
            className="pb-3 text-sm font-semibold transition-colors duration-150 outline-none"
            style={tabStyle('authored')}
          >
            My Articles
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'favorited'}
            onClick={() => { setActiveTab('favorited') }}
            className="pb-3 text-sm font-semibold transition-colors duration-150 outline-none"
            style={tabStyle('favorited')}
          >
            Favorited Articles
          </button>
        </div>

        <ProfileArticles username={profile.username} mode={activeTab} />
      </PageContainer>
    </div>
  )
}