import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiProfileResponse, ApiProfile } from '@/api/types'
import { profileKey } from './useProfile'

export function useFollowUser(username: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (following: boolean) => {
      if (following) {
        const { data } = await apiClient.delete<ApiProfileResponse>(
          ENDPOINTS.FOLLOW(username)
        )
        return data.profile
      }
      const { data } = await apiClient.post<ApiProfileResponse>(
        ENDPOINTS.FOLLOW(username)
      )
      return data.profile
    },

    onMutate: async (following) => {
      await queryClient.cancelQueries({ queryKey: profileKey.detail(username) })
      const previousProfile = queryClient.getQueryData<ApiProfile>(
        profileKey.detail(username)
      )
      queryClient.setQueryData<ApiProfile>(profileKey.detail(username), (old) => {
        if (!old) return old
        return { ...old, following: !following }
      })
      return { previousProfile }
    },

    onError: (_err, _following, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(profileKey.detail(username), context.previousProfile)
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: profileKey.detail(username) })
    },
  })
}