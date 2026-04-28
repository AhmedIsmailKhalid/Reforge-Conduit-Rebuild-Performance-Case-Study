import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { loginSchema, type LoginFormValues } from '../schemas/auth.schema'
import { useLogin } from '../hooks/useLogin'
import { ROUTES } from '@/router/routes'

export function LoginForm() {
  const { mutate: login, isPending, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (values: LoginFormValues) => {
    login(values)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12" style={{ background: 'var(--surface)' }}>
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Sign in
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link
              to={ROUTES.REGISTER}
              className="font-medium hover:underline"
              style={{ color: 'var(--accent-text)' }}
            >
              Sign up
            </Link>
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-lg text-sm"
            style={{
              background: 'rgba(220,38,38,0.08)',
              border: '1px solid rgba(220,38,38,0.2)',
              color: '#dc2626',
            }}
          >
            Invalid email or password. Please try again.
          </div>
        )}

        <form
          onSubmit={(e) => { void handleSubmit(onSubmit)(e) }}
          noValidate
          className="space-y-4 rounded-2xl p-6 md:p-8"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-150"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
              }}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              className="w-full px-3 py-2 rounded-lg text-sm transition-all duration-150"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
              }}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs" style={{ color: '#dc2626' }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 px-4 rounded-lg text-sm font-bold text-white transition-all duration-150 disabled:opacity-60"
            style={{ background: isPending ? 'var(--accent-bg)' : 'var(--accent-bg)' }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              if (!isPending) e.currentTarget.style.background = 'var(--accent-bg-hover)'
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.background = 'var(--accent-bg)'
            }}
          >
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}