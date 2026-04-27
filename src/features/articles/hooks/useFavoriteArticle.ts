import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiArticleResponse, ApiArticle } from '@/api/types'
import { articlesKey } from './useArticles'
import { feedKey } from '@/features/feed/hooks/useFeed'
import { articleKey } from './useArticle'

export function useFavoriteArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ slug, favorited }: { slug: string; favorited: boolean }) => {
      if (favorited) {
        const { data } = await apiClient.delete<ApiArticleResponse>(
          ENDPOINTS.FAVORITE(slug)
        )
        return data.article
      }
      const { data } = await apiClient.post<ApiArticleResponse>(
        ENDPOINTS.FAVORITE(slug)
      )
      return data.article
    },

    onMutate: async ({ slug, favorited }) => {
      await queryClient.cancelQueries({ queryKey: articlesKey.all })
      await queryClient.cancelQueries({ queryKey: feedKey.all })
      await queryClient.cancelQueries({ queryKey: articleKey.detail(slug) })

      const previousArticle = queryClient.getQueryData<ApiArticle>(
        articleKey.detail(slug)
      )

      queryClient.setQueryData<ApiArticle>(articleKey.detail(slug), (old) => {
        if (!old) return old
        return {
          ...old,
          favorited: !favorited,
          favoritesCount: favorited ? old.favoritesCount - 1 : old.favoritesCount + 1,
        }
      })

      return { previousArticle }
    },

    onError: (_err, { slug }, context) => {
      if (context?.previousArticle) {
        queryClient.setQueryData(articleKey.detail(slug), context.previousArticle)
      }
    },

    onSettled: async (_data, _err, { slug }) => {
      await queryClient.invalidateQueries({ queryKey: articleKey.detail(slug) })
      await queryClient.invalidateQueries({ queryKey: articlesKey.all })
      await queryClient.invalidateQueries({ queryKey: feedKey.all })
    },
  })
}