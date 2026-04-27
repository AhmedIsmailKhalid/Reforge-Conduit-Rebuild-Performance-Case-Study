import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { ROUTES } from '@/router/routes'

export function Navbar() {
  const { token, clearAuth } = useAuthStore()
  const { data: currentUser } = useCurrentUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    void navigate(ROUTES.HOME)
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-slate-600 dark:text-slate-400'
    }`

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <nav
        className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          to={ROUTES.HOME}
          className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
        >
          Reforge
        </Link>

        <ul className="flex items-center gap-6" role="list">
          <li>
            <NavLink to={ROUTES.HOME} className={navLinkClass} end>
              Home
            </NavLink>
          </li>

          {!token ? (
            <>
              <li>
                <NavLink to={ROUTES.LOGIN} className={navLinkClass}>
                  Sign in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.REGISTER}
                  className="text-sm font-medium px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  Sign up
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={ROUTES.EDITOR_NEW} className={navLinkClass}>
                  New article
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.SETTINGS}
                  className={navLinkClass}
                >
                  Settings
                </NavLink>
              </li>
              {currentUser && (
                <li>
                  <NavLink
                    to={ROUTES.PROFILE.replace(':username', currentUser.username)}
                    className={navLinkClass}
                  >
                    {currentUser.image ? (
                      <img
                        src={currentUser.image}
                        alt={currentUser.username}
                        className="w-7 h-7 rounded-full object-cover inline-block mr-1.5"
                      />
                    ) : null}
                    {currentUser.username}
                  </NavLink>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                >
                  Sign out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}