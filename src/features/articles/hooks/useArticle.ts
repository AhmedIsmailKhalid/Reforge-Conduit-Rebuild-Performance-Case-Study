import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiArticleResponse } from '@/api/types'

export const articleKey = {
  all: ['article'] as const,
  detail: (slug: string) => ['article', slug] as const,
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: articleKey.detail(slug),
    queryFn: async () => {
      const { data } = await apiClient.get<ApiArticleResponse>(
        ENDPOINTS.ARTICLE(slug)
      )
      return data.article
    },
    enabled: !!slug,
  })
}