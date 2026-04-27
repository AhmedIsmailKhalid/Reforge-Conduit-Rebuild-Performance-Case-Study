import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiArticlesResponse } from '@/api/types'

interface UseArticlesParams {
  tag?: string
  author?: string
  favorited?: string
  page?: number
  limit?: number
}

export const articlesKey = {
  all: ['articles'] as const,
  list: (params: UseArticlesParams) => ['articles', 'list', params] as const,
}

export function useArticles(params: UseArticlesParams = {}) {
  const { tag, author, favorited, page = 1, limit = 10 } = params
  const offset = (page - 1) * limit

  return useQuery({
    queryKey: articlesKey.list(params),
    queryFn: async () => {
      const { data } = await apiClient.get<ApiArticlesResponse>(ENDPOINTS.ARTICLES, {
        params: {
          tag,
          author,
          favorited,
          limit,
          offset,
        },
      })
      return data
    },
  })
}