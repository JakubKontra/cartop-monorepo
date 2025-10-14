'use client'

import { useQuery } from '@apollo/client/react'
import { useFormContext } from 'react-hook-form'
import { useMemo } from 'react'
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
import { UserRole } from '@/gql/graphql'

interface EmployeeSelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean
}

/**
 * EmployeeSelectField - Form field for selecting an employee/agent
 * Filters users to show only those with sales or admin roles
 */
export function EmployeeSelectField({
  name,
  label = 'Assigned Agent',
  placeholder = 'Select an agent',
  description,
  disabled = false,
  required = false,
}: EmployeeSelectFieldProps) {
  const form = useFormContext()

  const { data: usersData, loading: loadingUsers } = useQuery(GET_ALL_USERS, {
    variables: { limit: 1000, offset: 0 },
  })

  // Filter for employees with appropriate roles
  const employees = useMemo(() => {
    const users = usersData?.users || []
    return users.filter(
      (user) =>
        user.isActive &&
        user.roles.some(
          (role) =>
            role === UserRole.Admin ||
            role === UserRole.SalesRepresentative ||
            role === UserRole.JuniorSalesRepresentative
        )
    )
  }, [usersData?.users])

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
              placeholder={loadingUsers ? 'Loading agents...' : placeholder}
              disabled={disabled || loadingUsers}
              items={employees.map((employee) => ({
                label: `${employee.firstName} ${employee.lastName} (${employee.email})`,
                value: employee.id,
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
