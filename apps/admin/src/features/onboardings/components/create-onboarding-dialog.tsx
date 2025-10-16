'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@apollo/client/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { onboardingCreateSchema, type OnboardingCreateFormValues } from '../data/schema'
import { toCreateOnboardingVariables } from '../data/transformers'
import { CREATE_ONBOARDING, GET_ALL_ONBOARDINGS } from '../onboardings.graphql'
import { GET_ALL_CAR_REQUESTS } from '@/features/car-requests/car-requests.graphql'

interface CreateOnboardingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  carRequestId?: string
}

export function CreateOnboardingDialog({
  open,
  onOpenChange,
  carRequestId,
}: CreateOnboardingDialogProps) {
  const { data: carRequestsData, loading: loadingCarRequests } = useQuery(GET_ALL_CAR_REQUESTS, {
    variables: { limit: 1000, offset: 0 },
  })
  const carRequests = carRequestsData?.allCarRequests || []

  const [createOnboarding, { loading }] = useMutation(CREATE_ONBOARDING, {
    refetchQueries: [{ query: GET_ALL_ONBOARDINGS }],
    onCompleted: (data) => {
      toast.success('Onboarding created successfully')
      form.reset()
      onOpenChange(false)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const form = useForm<OnboardingCreateFormValues>({
    resolver: zodResolver(onboardingCreateSchema),
    defaultValues: {
      carRequestId: carRequestId || '',
      expirationDays: 30,
    },
  })

  // Update form when carRequestId prop changes
  useEffect(() => {
    if (carRequestId) {
      form.setValue('carRequestId', carRequestId)
    }
  }, [carRequestId, form])

  const handleSubmit = (values: OnboardingCreateFormValues) => {
    const variables = toCreateOnboardingVariables(values)
    createOnboarding({ variables })
  }

  // Find selected car request for display
  const selectedCarRequest = carRequests.find((r) => r.id === (carRequestId || form.watch('carRequestId')))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Create Onboarding</DialogTitle>
          <DialogDescription>
            Create a new onboarding session for a car request. The customer will receive an email
            with a unique upload link.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            {carRequestId ? (
              // Show read-only info when car request is pre-selected
              <div className='rounded-lg border p-4 bg-muted/50'>
                <div className='text-sm font-medium mb-1'>Car Request</div>
                {selectedCarRequest ? (
                  <div className='text-sm'>
                    <div className='font-medium'>
                      {selectedCarRequest.requestFirstName} {selectedCarRequest.requestLastName}
                    </div>
                    <div className='text-muted-foreground'>
                      {selectedCarRequest.brand?.name} {selectedCarRequest.model?.name}
                    </div>
                    <div className='text-xs text-muted-foreground mt-1'>
                      {selectedCarRequest.requestEmail}
                    </div>
                  </div>
                ) : (
                  <div className='text-sm text-muted-foreground'>Loading...</div>
                )}
              </div>
            ) : (
              // Show selector when no car request is pre-selected
              <FormField
                control={form.control}
                name='carRequestId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Car Request <span className='text-destructive'>*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loading || loadingCarRequests}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a car request' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {carRequests.map((request) => (
                          <SelectItem key={request.id} value={request.id}>
                            {request.requestFirstName} {request.requestLastName} -{' '}
                            {request.brand?.name} {request.model?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The car request this onboarding is associated with
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name='expirationDays'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration (Days)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='30'
                      min={1}
                      max={365}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 30)}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of days before the onboarding link expires (default: 30 days)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                Create Onboarding
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
