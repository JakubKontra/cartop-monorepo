'use client'

import { useMutation } from '@apollo/client/react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Mail, Loader2 } from 'lucide-react'
import { SEND_ONBOARDING_REMINDER, GET_ONBOARDING } from '../onboardings.graphql'

interface SendReminderButtonProps {
  onboardingId: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function SendReminderButton({
  onboardingId,
  variant = 'outline',
  size = 'default',
}: SendReminderButtonProps) {
  const [sendReminder, { loading }] = useMutation(SEND_ONBOARDING_REMINDER, {
    refetchQueries: [{ query: GET_ONBOARDING, variables: { id: onboardingId } }],
    onCompleted: () => {
      toast.success('Reminder email sent successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleSendReminder = () => {
    sendReminder({ variables: { onboardingId } })
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSendReminder}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Mail className='mr-2 h-4 w-4' />
      )}
      Send Reminder
    </Button>
  )
}
