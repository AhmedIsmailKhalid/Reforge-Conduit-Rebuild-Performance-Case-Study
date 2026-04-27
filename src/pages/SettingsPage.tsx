import { AuthGuard } from '@/features/auth/components/AuthGuard'
import { SettingsForm } from '@/features/settings/components/SettingsForm'
import { PageContainer } from '@/components/layout/PageContainer'

export default function SettingsPage() {
  return (
    <AuthGuard>
      <PageContainer>
        <SettingsForm />
      </PageContainer>
    </AuthGuard>
  )
}