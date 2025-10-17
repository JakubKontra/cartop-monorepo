import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { UserRole, hasAnyRole } from '@/lib/permissions'
import { CarRequestsDashboardPage } from '@/features/car-requests-dashboard/car-requests-dashboard-page'

function HomePage() {
  const { auth } = useAuthStore()

  // Dashboard je viditelný pouze pro adminy
  // Používáme hasAnyRole pro case-insensitive porovnání
  if (auth.user?.roles && hasAnyRole(auth.user.roles, [UserRole.ADMIN])) {
    return <CarRequestsDashboardPage />
  }

  // Pro ostatní uživatele prázdná stránka
  return (
    <div className='container mx-auto p-6'>
      <div className='flex min-h-[60vh] flex-col items-center justify-center text-center'>
        <h1 className='mb-4 text-3xl font-bold'>Vítejte v administraci</h1>
        <p className='text-muted-foreground'>
          Použijte navigaci v levém menu pro přístup k funkcím.
        </p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/')({
  component: HomePage,
})
