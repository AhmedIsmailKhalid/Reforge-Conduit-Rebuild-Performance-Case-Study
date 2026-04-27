import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiCommentResponse } from '@/api/types'
import { commentsKey } from './useComments'

export function useAddComment(slug: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: string) => {
      const { data } = await apiClient.post<ApiCommentResponse>(
        ENDPOINTS.COMMENTS(slug),
        { comment: { body } }
      )
      return data.comment
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: commentsKey.list(slug) })
    },
  })
}