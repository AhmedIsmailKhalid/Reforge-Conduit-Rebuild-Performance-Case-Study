import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  email: string
  token: string
  username: string
  bio: string | null
  image: string | null
}

interface AuthState {
  user: AuthUser | null
  token: string | null
  setAuth: (user: AuthUser, token: string) => void
  clearAuth: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setAuth: (user, token) => {
        set({ user, token })
      },

      clearAuth: () => {
        set({ user: null, token: null })
      },

      isAuthenticated: () => {
        return get().token !== null
      },
    }),
    {
      name: 'reforge-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
)