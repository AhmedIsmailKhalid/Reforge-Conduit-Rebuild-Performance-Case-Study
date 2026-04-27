import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiProfileResponse } from '@/api/types'

export const profileKey = {
  all: ['profile'] as const,
  detail: (username: string) => ['profile', username] as const,
}

export function useProfile(username: string) {
  return useQuery({
    queryKey: profileKey.detail(username),
    queryFn: async () => {
      const { data } = await apiClient.get<ApiProfileResponse>(
        ENDPOINTS.PROFILE(username)
      )
      return data.profile
    },
    enabled: !!username,
  })
}