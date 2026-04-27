import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiArticlesResponse } from '@/api/types'
import { useAuthStore } from '@/store/authStore'

interface UseFeedParams {
  page?: number
  limit?: number
}

export const feedKey = {
  all: ['feed'] as const,
  list: (params: UseFeedParams) => ['feed', 'list', params] as const,
}

export function useFeed(params: UseFeedParams = {}) {
  const { page = 1, limit = 10 } = params
  const { token } = useAuthStore()
  const offset = (page - 1) * limit

  return useQuery({
    queryKey: feedKey.list(params),
    queryFn: async () => {
      const { data } = await apiClient.get<ApiArticlesResponse>(ENDPOINTS.FEED, {
        params: { limit, offset },
      })
      return data
    },
    enabled: !!token,
  })
}