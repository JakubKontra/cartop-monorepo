'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@apollo/client/react'
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
import { UserSelectField, EmployeeSelectField } from '@/components/fields'
import { StatusSelectField, StateSelectField } from './fields'
import { carRequestSchema, type CarRequestFormValues } from '../data/schema'
import { GET_ALL_LEASING_COMPANIES } from '@/features/leasing-companies/leasing-companies.graphql'
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
      // Request Information
      requestEmail: '',
      requestPhone: '',
      requestFirstName: '',
      requestLastName: '',
      requestNewsletter: false,
      requestPostalCode: '',
      // Car Details
      brandId: '',
      modelId: '',
      financingType: 'cash',
      // Leasing
      leasingCompanyId: '',
      // Customer & Agent
      customerId: '',
      assignedAgentId: '',
      // Workflow & Status
      statusId: '',
      stateId: '',
      waitingForOffer: false,
      // Notes
      notes: '',
      noteInternal: '',
      gclid: '',
      // Cancellation
      cancellationReason: undefined,
      cancellationNote: '',
      // Legacy
      legacySystemId: '',
      isFromLegacySystem: false,
    },
  })

  // Fetch leasing companies for the select dropdown
  const { data: leasingCompaniesData } = useQuery(GET_ALL_LEASING_COMPANIES)
  const leasingCompanies = leasingCompaniesData?.leasingCompanies || []

  // Watch financingType to show/hide leasing company field
  const financingType = form.watch('financingType')

  // Cancellation reason options
  const cancellationReasonOptions = [
    { label: 'Other', value: 'other' },
    { label: 'No Interest', value: 'no_interest' },
    { label: 'No Time', value: 'no_time' },
    { label: 'No Money', value: 'no_money' },
    { label: 'No Need', value: 'no_need' },
    { label: 'No Opportunity', value: 'no_opportunity' },
    { label: 'No Other', value: 'no_other' },
    { label: 'Rejected by Finance', value: 'rejected_by_finance' },
    { label: 'Bad Credit Score', value: 'bad_credit_score' },
    { label: 'Ineligible Customer', value: 'ineligible_customer' },
    { label: 'Price Too High', value: 'price_too_high' },
    { label: 'Car Unavailable', value: 'car_unavailable' },
    { label: 'Wait Time Too Long', value: 'wait_time_too_long' },
    { label: 'Competitor Offer', value: 'competitor_offer' },
    { label: 'Changed Mind', value: 'changed_mind' },
    { label: 'Invalid Contact', value: 'invalid_contact' },
    { label: 'Duplicate Request', value: 'duplicate_request' },
    { label: 'Internal Error', value: 'internal_error' },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* Customer & Agent */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>Customer & Agent</CardTitle>
            <CardDescription className='text-xs'>
              Assignment information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <UserSelectField
              name='customerId'
              label='Customer'
              placeholder='Select a customer'
              description='Link this request to an existing customer account'
            />

            <EmployeeSelectField
              name='assignedAgentId'
              label='Assigned Agent'
              placeholder='Select an agent'
              description='Assign a sales representative to handle this request'
            />
          </CardContent>
        </Card>

        {/* Car Details */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>Car Details</CardTitle>
            <CardDescription className='text-xs'>
              Vehicle and financing information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='financingType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financing Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? 'cash'}
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
                  <FormDescription>
                    How the customer plans to finance the vehicle
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {financingType === 'leasing' && (
              <FormField
                control={form.control}
                name='leasingCompanyId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leasing Company</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select leasing company' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leasingCompanies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the leasing company for this request
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        {/* Status & Workflow */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>Status & Workflow</CardTitle>
            <CardDescription className='text-xs'>
              Current status and state of the request
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <StatusSelectField
                name='statusId'
                label='Status'
                placeholder='Select status'
                description='Overall status of the request'
              />

              <StateSelectField
                name='stateId'
                label='State'
                placeholder='Select state'
                description='Current workflow state'
              />
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>Notes</CardTitle>
            <CardDescription className='text-xs'>
              Additional information and comments
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
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
                      rows={3}
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
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Cancellation */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>Cancellation</CardTitle>
            <CardDescription className='text-xs'>
              Cancellation details (if applicable)
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='cancellationReason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cancellation Reason</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select reason' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cancellationReasonOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
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
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Advanced */}
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base'>Advanced</CardTitle>
            <CardDescription className='text-xs'>
              Technical and tracking information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
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

            {!isEdit && (
              <>
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
              </>
            )}
          </CardContent>
        </Card>

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
