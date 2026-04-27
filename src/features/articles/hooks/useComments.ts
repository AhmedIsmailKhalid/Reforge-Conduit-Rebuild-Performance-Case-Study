import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiCommentsResponse } from '@/api/types'

export const commentsKey = {
  all: ['comments'] as const,
  list: (slug: string) => ['comments', slug] as const,
}

export function useComments(slug: string) {
  return useQuery({
    queryKey: commentsKey.list(slug),
    queryFn: async () => {
      const { data } = await apiClient.get<ApiCommentsResponse>(
        ENDPOINTS.COMMENTS(slug)
      )
      return data.comments
    },
    enabled: !!slug,
  })
}