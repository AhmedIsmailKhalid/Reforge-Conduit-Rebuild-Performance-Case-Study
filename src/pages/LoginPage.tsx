import { LoginForm } from '@/features/auth/components/LoginForm'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function LoginPage() {
  usePageTitle('Sign in')
  return <LoginForm />
}