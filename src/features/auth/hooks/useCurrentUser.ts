import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiUserResponse } from '@/api/types'
import { useAuthStore } from '@/store/authStore'

export const CURRENT_USER_KEY = ['currentUser'] as const

export function useCurrentUser() {
  const { token } = useAuthStore()

  return useQuery({
    queryKey: CURRENT_USER_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<ApiUserResponse>(ENDPOINTS.CURRENT_USER)
      return data.user
    },
    enabled: !!token,
  })
}