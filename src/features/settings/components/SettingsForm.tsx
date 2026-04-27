import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/router/routes'

const settingsSchema = z.object({
  image: z.string().check(z.url('Enter a valid URL')).or(z.literal('')),
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters'),
  bio: z.string().max(500, 'Bio must be at most 500 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .check(z.email('Enter a valid email address')),
  password: z
    .string()
    .refine((val) => val === '' || val.length >= 8, {
      message: 'Password must be at least 8 characters',
    }),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

export function SettingsForm() {
  const { data: currentUser } = useCurrentUser()
  const { mutate: updateUser, isPending, error, isSuccess } = useUpdateUser()
  const { clearAuth } = useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (currentUser) {
      reset({
        image: currentUser.image ?? '',
        username: currentUser.username,
        bio: currentUser.bio ?? '',
        email: currentUser.email,
        password: '',
      })
    }
  }, [currentUser, reset])

  const onSubmit = (values: SettingsFormValues) => {
    updateUser({
      image: values.image,
      username: values.username,
      bio: values.bio,
      email: values.email,
      password: values.password || undefined,
    })
  }

  const handleLogout = () => {
    clearAuth()
    void navigate(ROUTES.HOME)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
        Settings
      </h1>

      {isSuccess && (
        <div
          role="status"
          className="mb-6 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm"
        >
          Settings updated successfully.
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
        >
          Failed to update settings. Please try again.
        </div>
      )}

      <form
        onSubmit={(e) => { void handleSubmit(onSubmit)(e) }}
        noValidate
        className="space-y-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8"
      >
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Profile picture URL
          </label>
          <input
            id="image"
            type="url"
            {...register('image')}
            placeholder="https://example.com/avatar.jpg"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.image.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            {...register('bio')}
            placeholder="A short bio about yourself"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.bio.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            New password
            <span className="ml-1 text-slate-400 font-normal">(leave blank to keep current)</span>
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register('password')}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isPending ? 'Saving...' : 'Save settings'}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}