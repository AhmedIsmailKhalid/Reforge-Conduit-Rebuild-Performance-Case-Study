import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiArticleResponse } from '@/api/types'
import { articlesKey } from './useArticles'
import { articleKey } from './useArticle'
import { ROUTES } from '@/router/routes'

interface UpdateArticleInput {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
}

export function useUpdateArticle() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({ slug, ...input }: UpdateArticleInput) => {
      const { data } = await apiClient.put<ApiArticleResponse>(
        ENDPOINTS.ARTICLE(slug),
        { article: input }
      )
      return data.article
    },
    onSuccess: async (article) => {
      await queryClient.invalidateQueries({ queryKey: articlesKey.all })
      await queryClient.invalidateQueries({ queryKey: articleKey.detail(article.slug) })
      void navigate(ROUTES.ARTICLE.replace(':slug', article.slug))
    },
  })
}