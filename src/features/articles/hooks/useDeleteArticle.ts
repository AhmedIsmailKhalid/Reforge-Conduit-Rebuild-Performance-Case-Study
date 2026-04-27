import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { articlesKey } from './useArticles'
import { ROUTES } from '@/router/routes'

export function useDeleteArticle() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (slug: string) => {
      await apiClient.delete(ENDPOINTS.ARTICLE(slug))
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: articlesKey.all })
      void navigate(ROUTES.HOME)
    },
  })
}