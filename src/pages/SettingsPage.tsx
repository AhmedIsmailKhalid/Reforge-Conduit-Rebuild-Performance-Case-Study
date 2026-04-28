import { AuthGuard } from '@/features/auth/components/AuthGuard'
import { SettingsForm } from '@/features/settings/components/SettingsForm'
import { PageContainer } from '@/components/layout/PageContainer'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function SettingsPage() {
  usePageTitle('Settings')
  return (
    <AuthGuard>
      <PageContainer>
        <SettingsForm />
      </PageContainer>
    </AuthGuard>
  )
}