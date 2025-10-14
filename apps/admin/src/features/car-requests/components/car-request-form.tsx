'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/date-picker'
import { BrandModelSelector } from '@/components/brand-model-selector'
import { carRequestSchema, type CarRequestFormValues } from '../data/schema'
import { Loader2 } from 'lucide-react'

interface CarRequestFormProps {
  /** Initial values for the form (for editing) */
  defaultValues?: Partial<CarRequestFormValues>
  /** Whether this is an edit form */
  isEdit?: boolean
  /** Loading state */
  loading?: boolean
  /** Submit handler */
  onSubmit: (values: CarRequestFormValues) => void | Promise<void>
  /** Cancel handler */
  onCancel: () => void
}

export function CarRequestForm({
  defaultValues,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
}: CarRequestFormProps) {
  const form = useForm<CarRequestFormValues>({
    resolver: zodResolver(carRequestSchema),
    defaultValues: defaultValues || {
      requestEmail: '',
      requestPhone: '',
      requestFirstName: '',
      requestLastName: '',
      requestNewsletter: false,
      requestPostalCode: '',
      brandId: '',
      modelId: '',
      financingType: 'cash',
      leasingCompanyId: '',
      customerId: '',
      assignedAgentId: '',
      statusId: '',
      stateId: '',
      order: 0,
      displayOrder: 0,
      waitingForOffer: false,
      notes: '',
      noteInternal: '',
      gclid: '',
      isFromLegacySystem: false,
      legacySystemId: '',
    },
  })

  const financingType = form.watch('financingType')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Request Information */}
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
            <CardDescription>
              Contact information from the request
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='requestFirstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='requestLastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Doe'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='requestEmail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='john.doe@example.com'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='requestPhone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='+420 123 456 789'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='requestPostalCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='12000'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='requestNewsletter'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>Newsletter</FormLabel>
                      <FormDescription>
                        {field.value ? 'Subscribed' : 'Not subscribed'}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Car Details */}
        <Card>
          <CardHeader>
            <CardTitle>Car Details</CardTitle>
            <CardDescription>
              Vehicle information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='financingType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Financing Type <span className='text-destructive'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select financing type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='cash'>Cash</SelectItem>
                      <SelectItem value='leasing'>Leasing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <BrandModelSelector
              brandValue={form.watch('brandId')}
              modelValue={form.watch('modelId')}
              onBrandChange={(value) => form.setValue('brandId', value)}
              onModelChange={(value) => form.setValue('modelId', value)}
            />

            {financingType === 'leasing' && (
              <FormField
                control={form.control}
                name='leasingCompanyId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leasing Company</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Leasing Company ID'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      TODO: Replace with selector component
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        {/* Customer & Agent */}
        <Card>
          <CardHeader>
            <CardTitle>Customer & Agent</CardTitle>
            <CardDescription>
              Assignment information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='customerId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Customer ID'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    TODO: Replace with customer selector
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='assignedAgentId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Agent</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Agent ID'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    TODO: Replace with agent selector
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Workflow & Status */}
        <Card>
          <CardHeader>
            <CardTitle>Workflow & Status</CardTitle>
            <CardDescription>
              Status and scheduling information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='statusId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Status ID'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      TODO: Replace with status selector
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='stateId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='State ID'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      TODO: Replace with state selector
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='nextCallAt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Call At</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='waitingForOffer'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>Waiting for Offer</FormLabel>
                      <FormDescription>
                        {field.value ? 'Yes' : 'No'}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='confirmedAt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmed At</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='relayedAt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relayed At</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='feedbackAt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback At</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='completedAt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completed At</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='closedAt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closed At</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>
              Additional information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Notes visible to customer...'
                      className='resize-none'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='noteInternal'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Internal Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Internal notes for staff only...'
                      className='resize-none'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gclid'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GCLID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Google Click ID'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Google Ads Click ID for tracking
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Cancellation */}
        <Card>
          <CardHeader>
            <CardTitle>Cancellation</CardTitle>
            <CardDescription>
              Cancellation details (if applicable)
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='cancellationReason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cancellation Reason</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select reason' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='other'>Other</SelectItem>
                      <SelectItem value='no_interest'>No Interest</SelectItem>
                      <SelectItem value='no_time'>No Time</SelectItem>
                      <SelectItem value='no_money'>No Money</SelectItem>
                      <SelectItem value='no_need'>No Need</SelectItem>
                      <SelectItem value='no_opportunity'>No Opportunity</SelectItem>
                      <SelectItem value='no_other'>No Other</SelectItem>
                      <SelectItem value='rejected_by_finance'>Rejected by Finance</SelectItem>
                      <SelectItem value='bad_credit_score'>Bad Credit Score</SelectItem>
                      <SelectItem value='ineligible_customer'>Ineligible Customer</SelectItem>
                      <SelectItem value='price_too_high'>Price Too High</SelectItem>
                      <SelectItem value='car_unavailable'>Car Unavailable</SelectItem>
                      <SelectItem value='wait_time_too_long'>Wait Time Too Long</SelectItem>
                      <SelectItem value='competitor_offer'>Competitor Offer</SelectItem>
                      <SelectItem value='changed_mind'>Changed Mind</SelectItem>
                      <SelectItem value='invalid_contact'>Invalid Contact</SelectItem>
                      <SelectItem value='duplicate_request'>Duplicate Request</SelectItem>
                      <SelectItem value='internal_error'>Internal Error</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='cancellationNote'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cancellation Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Additional details about cancellation...'
                      className='resize-none'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Legacy System Fields (only for create) */}
        {!isEdit && (
          <Card>
            <CardHeader>
              <CardTitle>Legacy System</CardTitle>
              <CardDescription>
                Optional fields for migration from legacy systems
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <FormField
                control={form.control}
                name='legacySystemId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-muted-foreground'>
                      Legacy System ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Optional'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      ID from the previous system
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isFromLegacySystem'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>From Legacy System</FormLabel>
                      <FormDescription>
                        {field.value ? 'Migrated from old system' : 'Created in new system'}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {/* Form Actions */}
        <div className='flex items-center justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isEdit ? 'Update Request' : 'Create Request'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
