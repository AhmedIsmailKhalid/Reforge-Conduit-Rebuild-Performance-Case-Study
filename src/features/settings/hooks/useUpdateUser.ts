import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiUserResponse } from '@/api/types'
import { useAuthStore } from '@/store/authStore'
import { CURRENT_USER_KEY } from '@/features/auth/hooks/useCurrentUser'

interface UpdateUserInput {
  email: string
  username: string
  bio: string
  image: string
  password?: string
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { setAuth, token } = useAuthStore()

  return useMutation({
    mutationFn: async (input: UpdateUserInput) => {
      const payload = {
        user: {
          ...input,
          ...(input.password ? { password: input.password } : {}),
        },
      }
      const { data } = await apiClient.put<ApiUserResponse>(ENDPOINTS.UPDATE_USER, payload)
      return data.user
    },
    onSuccess: (user) => {
      if (token) {
        setAuth(user, user.token)
      }
      void queryClient.invalidateQueries({ queryKey: CURRENT_USER_KEY })
    },
  })
}