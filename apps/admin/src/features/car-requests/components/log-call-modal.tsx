'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { CREATE_CAR_REQUEST_LOG } from '../car-requests.graphql'
import { Phone, Clock, Loader2 } from 'lucide-react'

interface LogCallModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  carRequestId: string
  onSuccess?: () => void
}

interface LogCallFormData {
  notes: string
  outcome: 'reached' | 'voicemail' | 'no_answer' | 'wrong_number' | 'other'
  duration?: string
}

interface ScheduleCallbackFormData {
  callbackDateTime: string
  notes: string
}

export function LogCallModal({
  open,
  onOpenChange,
  carRequestId,
  onSuccess,
}: LogCallModalProps) {
  const { auth } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'log-call' | 'schedule-callback'>('log-call')

  // Log Call Form
  const {
    register: registerLogCall,
    handleSubmit: handleSubmitLogCall,
    formState: { errors: logCallErrors },
    reset: resetLogCall,
    setValue: setLogCallValue,
    watch: watchLogCall,
  } = useForm<LogCallFormData>({
    defaultValues: {
      notes: '',
      outcome: 'reached',
      duration: '',
    },
  })

  // Schedule Callback Form
  const {
    register: registerCallback,
    handleSubmit: handleSubmitCallback,
    formState: { errors: callbackErrors },
    reset: resetCallback,
  } = useForm<ScheduleCallbackFormData>({
    defaultValues: {
      callbackDateTime: '',
      notes: '',
    },
  })

  const [createLog, { loading }] = useMutation(CREATE_CAR_REQUEST_LOG, {
    onCompleted: () => {
      const isLogCall = activeTab === 'log-call'
      toast.success(isLogCall
        ? 'Call has been logged successfully.'
        : 'Callback has been scheduled successfully.')
      resetLogCall()
      resetCallback()
      onOpenChange(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to save. Please try again.')
    },
  })

  const onSubmitLogCall = (data: LogCallFormData) => {
    const outcomeLabels = {
      reached: 'Reached',
      voicemail: 'Voicemail',
      no_answer: 'No Answer',
      wrong_number: 'Wrong Number',
      other: 'Other',
    }

    const message = `Call logged - ${outcomeLabels[data.outcome]}: ${data.notes}`

    createLog({
      variables: {
        input: {
          carRequestId,
          message,
          actionType: 'CALL_LOGGED',
          metadata: {
            outcome: data.outcome,
            duration: data.duration || null,
            notes: data.notes,
            loggedAt: new Date().toISOString(),
          },
          authorId: auth.user?.id,
        },
      },
    })
  }

  const onSubmitCallback = (data: ScheduleCallbackFormData) => {
    const callbackDate = new Date(data.callbackDateTime)
    const message = `Callback scheduled for ${callbackDate.toLocaleString()}: ${data.notes}`

    createLog({
      variables: {
        input: {
          carRequestId,
          message,
          actionType: 'CALLBACK_SCHEDULED',
          metadata: {
            callbackDateTime: data.callbackDateTime,
            notes: data.notes,
            scheduledAt: new Date().toISOString(),
          },
          authorId: auth.user?.id,
        },
      },
    })
  }

  const selectedOutcome = watchLogCall('outcome')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>Call Management</DialogTitle>
          <DialogDescription>
            Log a completed call or schedule a callback for this customer.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='log-call'>
              <Phone className='mr-2 h-4 w-4' />
              Log Call
            </TabsTrigger>
            <TabsTrigger value='schedule-callback'>
              <Clock className='mr-2 h-4 w-4' />
              Schedule Callback
            </TabsTrigger>
          </TabsList>

          <TabsContent value='log-call' className='space-y-4'>
            <form onSubmit={handleSubmitLogCall(onSubmitLogCall)} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='outcome'>
                  Call Outcome <span className='text-destructive'>*</span>
                </Label>
                <Select
                  value={selectedOutcome}
                  onValueChange={(value) =>
                    setLogCallValue('outcome', value as LogCallFormData['outcome'])
                  }
                >
                  <SelectTrigger id='outcome'>
                    <SelectValue placeholder='Select outcome' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='reached'>Reached - Spoke with customer</SelectItem>
                    <SelectItem value='voicemail'>Voicemail - Left message</SelectItem>
                    <SelectItem value='no_answer'>No Answer - No response</SelectItem>
                    <SelectItem value='wrong_number'>Wrong Number</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='duration'>Call Duration (Optional)</Label>
                <Input
                  id='duration'
                  type='text'
                  placeholder='e.g., 5 minutes, 10 min, 15m'
                  {...registerLogCall('duration')}
                />
                <p className='text-muted-foreground text-xs'>
                  Approximate duration of the call
                </p>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='log-notes'>
                  Call Notes <span className='text-destructive'>*</span>
                </Label>
                <Textarea
                  id='log-notes'
                  placeholder='What was discussed during the call?'
                  rows={5}
                  {...registerLogCall('notes', {
                    required: 'Call notes are required',
                    minLength: {
                      value: 3,
                      message: 'Notes must be at least 3 characters',
                    },
                  })}
                  className={logCallErrors.notes ? 'border-destructive' : ''}
                />
                {logCallErrors.notes && (
                  <p className='text-destructive text-sm'>{logCallErrors.notes.message}</p>
                )}
              </div>

              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={loading}>
                  {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  <Phone className='mr-2 h-4 w-4' />
                  Log Call
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value='schedule-callback' className='space-y-4'>
            <form onSubmit={handleSubmitCallback(onSubmitCallback)} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='callbackDateTime'>
                  Callback Date & Time <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='callbackDateTime'
                  type='datetime-local'
                  {...registerCallback('callbackDateTime', {
                    required: 'Callback date and time are required',
                    validate: (value) => {
                      const selectedDate = new Date(value)
                      const now = new Date()
                      if (selectedDate <= now) {
                        return 'Callback must be scheduled in the future'
                      }
                      return true
                    },
                  })}
                  className={callbackErrors.callbackDateTime ? 'border-destructive' : ''}
                />
                {callbackErrors.callbackDateTime && (
                  <p className='text-destructive text-sm'>
                    {callbackErrors.callbackDateTime.message}
                  </p>
                )}
                <p className='text-muted-foreground text-xs'>
                  When should we call this customer back?
                </p>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='callback-notes'>
                  Callback Notes <span className='text-destructive'>*</span>
                </Label>
                <Textarea
                  id='callback-notes'
                  placeholder='Why are we calling back? What needs to be discussed?'
                  rows={5}
                  {...registerCallback('notes', {
                    required: 'Callback notes are required',
                    minLength: {
                      value: 3,
                      message: 'Notes must be at least 3 characters',
                    },
                  })}
                  className={callbackErrors.notes ? 'border-destructive' : ''}
                />
                {callbackErrors.notes && (
                  <p className='text-destructive text-sm'>{callbackErrors.notes.message}</p>
                )}
              </div>

              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={loading}>
                  {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  <Clock className='mr-2 h-4 w-4' />
                  Schedule Callback
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
