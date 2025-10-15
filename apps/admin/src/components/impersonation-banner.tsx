'use client'

import { useMutation } from '@apollo/client/react'
import { AlertTriangle, UserX } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { STOP_IMPERSONATION_MUTATION } from '@/features/auth/impersonation.graphql'
import { Button } from './ui/button'
import { logger } from '@/lib/logger'

export function ImpersonationBanner() {
  const { auth } = useAuthStore()
  const [stopImpersonation, { loading }] = useMutation(STOP_IMPERSONATION_MUTATION)

  if (!auth.isImpersonating || !auth.user || !auth.originalUser) {
    return null
  }

  const handleStopImpersonation = async () => {
    try {
      const result = await stopImpersonation()

      if (result.data?.stopImpersonation) {
        const { accessToken, refreshToken, user } = result.data.stopImpersonation

        // Restore admin session
        auth.setAccessToken(accessToken)
        auth.setRefreshToken(refreshToken)
        auth.setUser({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
        })
        auth.stopImpersonation()

        toast.success(`Stopped impersonating. Welcome back, ${user.firstName}!`)
      }
    } catch (error: unknown) {
      logger.error('Failed to stop impersonation', error)
      const message = error instanceof Error ? error.message : 'Failed to stop impersonation'
      toast.error(message)
    }
  }

  return (
    <div className='fixed bottom-4 left-1/2 z-50 -translate-x-1/2'>
      <div className='flex items-center gap-3 rounded-full border border-border bg-background/95 px-4 py-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80'>
        <div className='flex items-center gap-2 text-sm'>
          <AlertTriangle className='h-4 w-4 text-muted-foreground' />
          <span className='text-muted-foreground'>
            Impersonating:{' '}
          </span>
          <span className='font-medium'>
            {auth.user.firstName} {auth.user.lastName}
          </span>
        </div>
        <Button
          onClick={handleStopImpersonation}
          disabled={loading}
          variant='outline'
          size='sm'
          className='h-7 gap-2'
        >
          <UserX className='h-3 w-3' />
          Stop
        </Button>
      </div>
    </div>
  )
}
