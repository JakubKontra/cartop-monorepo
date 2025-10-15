'use client'

import { useQuery } from '@apollo/client/react'
import { useFormContext } from 'react-hook-form'
import {
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
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import { GET_ALL_CAR_REQUEST_STATUSES } from '../../car-requests.graphql'

interface StatusSelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
}

export function StatusSelectField({
  name,
  label = 'Status',
  placeholder = 'Select a status',
  description,
}: StatusSelectFieldProps) {
  const form = useFormContext()
  const { data, loading } = useQuery(GET_ALL_CAR_REQUEST_STATUSES)

  const statuses = data?.allCarRequestStatuses || []

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value ?? ''}
            disabled={loading}
          >
            <FormControl>
              <SelectTrigger>
                {loading ? (
                  <div className='flex items-center gap-2'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    <span>Loading statuses...</span>
                  </div>
                ) : (
                  <SelectValue placeholder={placeholder} />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {statuses.length === 0 && !loading && (
                <div className='px-2 py-1.5 text-sm text-muted-foreground'>
                  No statuses available
                </div>
              )}
              {statuses.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='outline'
                      className='text-xs'
                      style={{
                        borderColor: status.colorHex || undefined,
                        color: status.colorHex || undefined,
                      }}
                    >
                      {status.name}
                    </Badge>
                    {status.isFinal && (
                      <span className='text-xs text-muted-foreground'>(Final)</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
