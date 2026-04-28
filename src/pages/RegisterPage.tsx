import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function RegisterPage() {
  usePageTitle('Create an account')
  return <RegisterForm />
}