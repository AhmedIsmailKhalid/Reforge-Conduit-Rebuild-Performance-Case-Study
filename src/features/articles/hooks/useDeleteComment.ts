import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { commentsKey } from './useComments'

export function useDeleteComment(slug: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (commentId: number) => {
      await apiClient.delete(ENDPOINTS.COMMENT(slug, commentId))
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commentsKey.list(slug) })
    },
  })
}