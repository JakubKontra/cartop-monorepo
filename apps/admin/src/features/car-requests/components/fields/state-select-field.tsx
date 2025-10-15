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
import { GET_ALL_CAR_REQUEST_STATES } from '../../car-requests.graphql'
import { CAR_REQUEST_STATES, type CarRequestStateCode } from '../../constants/states'

interface StateSelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
}

export function StateSelectField({
  name,
  label = 'State',
  placeholder = 'Select a state',
  description,
}: StateSelectFieldProps) {
  const form = useFormContext()
  const { data, loading } = useQuery(GET_ALL_CAR_REQUEST_STATES)

  const states = data?.allCarRequestStates || []

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
                    <span>Loading states...</span>
                  </div>
                ) : (
                  <SelectValue placeholder={placeholder} />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {states.length === 0 && !loading && (
                <div className='px-2 py-1.5 text-sm text-muted-foreground'>
                  No states available
                </div>
              )}
              {states.map((state) => {
                const stateCode = state.code as CarRequestStateCode
                const stateConfig = CAR_REQUEST_STATES[stateCode]
                const Icon = stateConfig?.icon

                return (
                  <SelectItem key={state.id} value={state.id}>
                    <div className='flex items-center gap-2'>
                      {Icon && <Icon className='h-4 w-4' style={{ color: state.colorHex || undefined }} />}
                      <Badge
                        variant='outline'
                        className='text-xs'
                        style={{
                          borderColor: state.colorHex || undefined,
                          color: state.colorHex || undefined,
                        }}
                      >
                        {state.name}
                      </Badge>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
