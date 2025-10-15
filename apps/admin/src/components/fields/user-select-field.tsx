'use client'

import { useQuery } from '@apollo/client/react'
import { useFormContext } from 'react-hook-form'
import { SelectDropdown } from '@/components/select-dropdown'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { GET_ALL_USERS } from '@/features/users/users.graphql'

interface UserSelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean
  /** Only show active users */
  activeOnly?: boolean
}

/**
 * UserSelectField - Form field for selecting a user
 * Fetches all users and displays them in a searchable dropdown
 */
export function UserSelectField({
  name,
  label = 'User',
  placeholder = 'Select a user',
  description,
  disabled = false,
  required = false,
  activeOnly = true,
}: UserSelectFieldProps) {
  const form = useFormContext()

  const { data: usersData, loading: loadingUsers } = useQuery(GET_ALL_USERS, {
    variables: { limit: 1000, offset: 0 },
  })

  const users = usersData?.users || []
  const filteredUsers = activeOnly ? users.filter((user) => user.isActive) : users

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className='text-destructive'> *</span>}
          </FormLabel>
          <FormControl>
            <SelectDropdown
              defaultValue={field.value}
              onValueChange={field.onChange}
              placeholder={loadingUsers ? 'Loading users...' : placeholder}
              disabled={disabled || loadingUsers}
              items={filteredUsers.map((user) => ({
                label: `${user.firstName} ${user.lastName} (${user.email})`,
                value: user.id,
              }))}
              isControlled
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
