import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import type { ApiUserResponse } from '@/api/types'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/router/routes'
import type { RegisterFormValues } from '../schemas/auth.schema'

export function useRegister() {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: RegisterFormValues) => {
      const { data } = await apiClient.post<ApiUserResponse>(ENDPOINTS.REGISTER, {
        user: credentials,
      })
      return data.user
    },
    onSuccess: (user) => {
      setAuth(user, user.token)
      void navigate(ROUTES.HOME)
    },
  })
}