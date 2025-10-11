'use client'

import { useMutation } from '@apollo/client/react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { IMPERSONATE_USER_MUTATION } from '@/features/auth/impersonation.graphql'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { type User } from '../data/schema'

type ImpersonateDialogProps = {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImpersonateDialog({
  user,
  open,
  onOpenChange,
}: ImpersonateDialogProps) {
  const { auth } = useAuthStore()
  const [impersonateUser, { loading }] = useMutation(IMPERSONATE_USER_MUTATION)

  if (!user) return null

  const handleImpersonate = async () => {
    try {
      const result = await impersonateUser({
        variables: {
          input: {
            targetUserId: user.id,
          },
        },
      })

      if (result.data?.impersonateUser) {
        const { accessToken, refreshToken, impersonatedUser, originalUser } =
          result.data.impersonateUser

        // Store original admin user
        auth.setOriginalUser({
          id: originalUser.id,
          email: originalUser.email,
          firstName: originalUser.firstName,
          lastName: originalUser.lastName,
          roles: originalUser.roles,
        })

        // Set impersonated user as current user
        auth.setUser({
          id: impersonatedUser.id,
          email: impersonatedUser.email,
          firstName: impersonatedUser.firstName,
          lastName: impersonatedUser.lastName,
          roles: impersonatedUser.roles,
        })

        // Update tokens
        auth.setAccessToken(accessToken)
        auth.setRefreshToken(refreshToken)

        // Set impersonating flag
        auth.setIsImpersonating(true)

        toast.success(
          `Now impersonating ${impersonatedUser.firstName} ${impersonatedUser.lastName}`
        )

        onOpenChange(false)

        // Reload the page to apply new permissions
        window.location.reload()
      }
    } catch (error: any) {
      console.error('Impersonation error:', error)
      toast.error(error.message || 'Failed to impersonate user')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Impersonate User</DialogTitle>
          <DialogDescription>
            You are about to impersonate this user. You will be logged in as them and
            see the application from their perspective.
          </DialogDescription>
        </DialogHeader>

        <Alert className='border-amber-600 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100'>
          <AlertTriangle className='h-4 w-4' />
          <AlertDescription>
            All actions you perform while impersonating will be attributed to this user.
            Use this feature responsibly.
          </AlertDescription>
        </Alert>

        <div className='rounded-lg border bg-muted p-4'>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm font-medium text-muted-foreground'>Name:</span>
              <span className='text-sm font-semibold'>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm font-medium text-muted-foreground'>Email:</span>
              <span className='text-sm'>{user.email}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm font-medium text-muted-foreground'>Roles:</span>
              <span className='text-sm capitalize'>{user.roles.join(', ')}</span>
            </div>
          </div>
        </div>

        <DialogFooter className='gap-2'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImpersonate} disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Start Impersonation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
