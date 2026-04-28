import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useThemeStore } from '@/store/themeStore'
import { ROUTES } from '@/router/routes'

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useThemeStore()
  const resolved = resolvedTheme()

  const cycle = () => {
    if (theme === 'system') setTheme(resolved === 'dark' ? 'light' : 'dark')
    else if (theme === 'light') setTheme('dark')
    else setTheme('system')
  }

  return (
    <button
      onClick={cycle}
      aria-label={`Switch theme, current: ${theme}`}
      className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 shrink-0"
      style={{
        color: 'var(--text-muted)',
        background: 'transparent',
        border: 'none',
        outline: 'none',
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.color = 'var(--text-secondary)'
        e.currentTarget.style.background = 'var(--surface-raised)'
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.color = 'var(--text-muted)'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      {resolved === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  )
}

export function Navbar() {
  const { token, clearAuth } = useAuthStore()
  const { data: currentUser } = useCurrentUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAuth()
    void navigate(ROUTES.HOME)
  }

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'var(--accent-text)' : 'var(--text-secondary)',
  })

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'var(--surface)',
        borderColor: 'rgba(148,163,184,0.12)',
      }}
    >
      <nav
        className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <Link
          to={ROUTES.HOME}
          className="font-serif text-lg md:text-xl font-bold tracking-tight transition-colors duration-150 shrink-0"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.color = 'var(--accent-text)'
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.color = 'var(--text-primary)'
          }}
        >
          Reforge
        </Link>

        <ul className="flex items-center gap-0.5 md:gap-1 overflow-x-auto" role="list">
          <li className="hidden sm:block">
            <NavLink
              to={ROUTES.HOME}
              end
              className="text-sm font-medium px-2 md:px-3 py-1.5 rounded-lg transition-all duration-150 block whitespace-nowrap"
              style={navLinkStyle}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = 'var(--surface-raised)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Home
            </NavLink>
          </li>

          {!token ? (
            <>
              <li>
                <NavLink
                  to={ROUTES.LOGIN}
                  className="text-sm font-medium px-2 md:px-3 py-1.5 rounded-lg transition-all duration-150 block whitespace-nowrap"
                  style={navLinkStyle}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'var(--surface-raised)'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  Sign in
                </NavLink>
              </li>
              <li className="ml-1">
                <NavLink
                  to={ROUTES.REGISTER}
                  className="text-sm font-bold px-3 py-1.5 rounded-lg text-white transition-all duration-150 whitespace-nowrap"
                  style={{ background: 'var(--accent-bg)' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'var(--accent-bg-hover)'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'var(--accent-bg)'
                  }}
                >
                  Sign up
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to={ROUTES.EDITOR_NEW}
                  className="text-sm font-medium px-2 md:px-3 py-1.5 rounded-lg transition-all duration-150 block whitespace-nowrap"
                  style={navLinkStyle}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'var(--surface-raised)'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  Write
                </NavLink>
              </li>

              {currentUser && (
                <li>
                  <NavLink
                    to={ROUTES.PROFILE.replace(':username', currentUser.username)}
                    className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg transition-all duration-150 text-sm font-medium whitespace-nowrap"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.background = 'var(--surface-raised)'
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    {currentUser.image ? (
                      <img
                        src={currentUser.image}
                        alt={currentUser.username}
                        className="w-6 h-6 rounded-full object-cover shrink-0"
                        style={{ boxShadow: '0 0 0 2px var(--color-accent-light)' }}
                      />
                    ) : (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          background: 'var(--color-accent-light)',
                          color: 'var(--color-accent-muted)',
                        }}
                      >
                        {currentUser.username[0]?.toUpperCase()}
                      </div>
                    )}
                    <span className="hidden sm:inline">{currentUser.username}</span>
                  </NavLink>
                </li>
              )}

              <li className="hidden sm:block">
                <NavLink
                  to={ROUTES.SETTINGS}
                  className="text-sm font-medium px-2 md:px-3 py-1.5 rounded-lg transition-all duration-150 block whitespace-nowrap"
                  style={navLinkStyle}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'var(--surface-raised)'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  Settings
                </NavLink>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="px-2 md:px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.color = '#ef4444'
                    e.currentTarget.style.background = 'var(--surface-raised)'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  Sign out
                </button>
              </li>
            </>
          )}

          <li className="ml-1 pl-1 md:ml-2 md:pl-2 shrink-0" style={{ borderLeft: '1px solid rgba(148,163,184,0.15)' }}>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}