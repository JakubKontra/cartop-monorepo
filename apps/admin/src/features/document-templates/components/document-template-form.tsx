'use client'

import { useState, useEffect } from 'react'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MultiSelect, type Option } from '@/components/multi-select'
import { documentTemplateSchema, type DocumentTemplateFormValues } from '../data/schema'
import { GET_ALL_LEASING_COMPANIES } from '@/features/leasing-companies/leasing-companies.graphql'
import { Loader2 } from 'lucide-react'

interface DocumentTemplateFormProps {
  /** Initial values for the form (for editing) */
  defaultValues?: Partial<DocumentTemplateFormValues>
  /** Whether this is an edit form */
  isEdit?: boolean
  /** Loading state */
  loading?: boolean
  /** Submit handler */
  onSubmit: (values: DocumentTemplateFormValues) => void | Promise<void>
  /** Cancel handler */
  onCancel: () => void
}

const FILE_FORMAT_OPTIONS: Option[] = [
  { label: 'PDF', value: 'pdf' },
  { label: 'JPG', value: 'jpg' },
  { label: 'JPEG', value: 'jpeg' },
  { label: 'PNG', value: 'png' },
  { label: 'WebP', value: 'webp' },
  { label: 'GIF', value: 'gif' },
  { label: 'SVG', value: 'svg' },
  { label: 'DOC', value: 'doc' },
  { label: 'DOCX', value: 'docx' },
  { label: 'XLS', value: 'xls' },
  { label: 'XLSX', value: 'xlsx' },
]

export function DocumentTemplateForm({
  defaultValues,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
}: DocumentTemplateFormProps) {
  const { data: leasingCompaniesData } = useQuery(GET_ALL_LEASING_COMPANIES)
  const leasingCompanies = leasingCompaniesData?.leasingCompanies || []

  const form = useForm<DocumentTemplateFormValues>({
    resolver: zodResolver(documentTemplateSchema),
    defaultValues: defaultValues || {
      leasingCompanyId: '',
      isGlobal: false,
      name: '',
      fieldName: '',
      description: '',
      helpText: '',
      isRequired: true,
      acceptedFormats: ['pdf', 'jpg', 'png'],
      maxSizeBytes: 5242880, // 5MB
      displayOrder: 0,
    },
  })

  const maxSizeBytes = form.watch('maxSizeBytes')
  const maxSizeMB = maxSizeBytes ? (maxSizeBytes / 1048576).toFixed(2) : '0'
  const isGlobal = form.watch('isGlobal')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Define the document template details
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='isGlobal'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        // Clear leasing company ID when making global
                        if (checked) {
                          form.setValue('leasingCompanyId', '')
                        }
                      }}
                      disabled={loading || isEdit}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Global Template</FormLabel>
                    <FormDescription>
                      Make this template available to all leasing companies
                      {isEdit && ' (cannot be changed)'}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {!isGlobal && (
              <FormField
                control={form.control}
                name='leasingCompanyId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Leasing Company <span className='text-destructive'>*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading || isEdit}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a leasing company' />
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
                      The leasing company this document template belongs to
                      {isEdit && ' (cannot be changed)'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Document Name <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., ID Card (Front)'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name shown to users
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='fieldName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Field Name <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='e.g., id_card_front'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Unique identifier (lowercase, alphanumeric with underscores only)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe what this document is for...'
                      className='resize-none'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Brief description of the document
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='helpText'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Help Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Provide guidance on what to upload...'
                      className='resize-none'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Additional instructions shown to users during upload
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Validation Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Validation Rules</CardTitle>
            <CardDescription>
              Configure upload requirements and restrictions
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='isRequired'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Required Document</FormLabel>
                    <FormDescription>
                      Mark this document as mandatory for onboarding completion
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='acceptedFormats'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Accepted Formats <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={FILE_FORMAT_OPTIONS}
                      selected={field.value}
                      onChange={field.onChange}
                      placeholder='Select file formats...'
                      disabled={loading}
                    />
                  </FormControl>
                  <FormDescription>
                    File formats that users can upload
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='maxSizeBytes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Maximum File Size <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='5242880'
                      min={1024}
                      max={10485760}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum file size in bytes (currently: {maxSizeMB} MB, min: 1KB, max: 10MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='displayOrder'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='0'
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Order in which this document appears (lower numbers appear first)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            {isEdit ? 'Update Document Template' : 'Create Document Template'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
