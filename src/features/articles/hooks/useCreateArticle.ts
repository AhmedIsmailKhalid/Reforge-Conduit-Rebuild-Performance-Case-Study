import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiArticleResponse } from '@/api/types'
import { articlesKey } from './useArticles'
import { ROUTES } from '@/router/routes'

interface CreateArticleInput {
  title: string
  description: string
  body: string
  tagList: string[]
}

export function useCreateArticle() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (input: CreateArticleInput) => {
      const { data } = await apiClient.post<ApiArticleResponse>(ENDPOINTS.ARTICLES, {
        article: input,
      })
      return data.article
    },
    onSuccess: async (article) => {
      await queryClient.invalidateQueries({ queryKey: articlesKey.all })
      void navigate(ROUTES.ARTICLE.replace(':slug', article.slug))
    },
  })
}