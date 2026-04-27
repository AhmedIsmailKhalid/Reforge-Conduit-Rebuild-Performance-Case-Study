import type { ApiProfile } from '@/api/types'
import { FollowButton } from './FollowButton'
import { useAuthStore } from '@/store/authStore'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/router/routes'

interface ProfileHeaderProps {
  profile: ApiProfile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { user } = useAuthStore()
  const isOwner = user?.username === profile.username

  return (
    <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {profile.image ? (
          <img
            src={profile.image}
            alt={profile.username}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-white dark:border-slate-700 shadow"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-slate-300 dark:bg-slate-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-slate-500 dark:text-slate-400 border-4 border-white dark:border-slate-700 shadow">
            {profile.username[0]?.toUpperCase()}
          </div>
        )}

        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-400 (not 500) mb-2">
          {profile.username}
        </h1>

        {profile.bio && (
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-4">
            {profile.bio}
          </p>
        )}

        <div className="flex items-center justify-center gap-3 mt-4">
          {isOwner ? (
            <Link
              to={ROUTES.SETTINGS}
              className="px-4 py-1.5 text-sm border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-400 rounded-lg transition"
            >
              Edit profile settings
            </Link>
          ) : (
            <FollowButton
              username={profile.username}
              following={profile.following}
            />
          )}
        </div>
      </div>
    </div>
  )
}