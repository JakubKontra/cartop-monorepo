'use client'

import { FormDescription } from '@/components/ui/form'
import { MultiSelect } from '@/components/multi-select'
import { roles } from '../data/data'

interface RoleSelectProps {
  value: string[]
  onChange: (values: string[]) => void
  disabled?: boolean
  placeholder?: string
}

export function RoleSelect({
  value,
  onChange,
  disabled = false,
  placeholder = 'Select roles...',
}: RoleSelectProps) {
  return (
    <div className='space-y-1'>
      <MultiSelect
        options={roles.map(({ label, value, icon }) => ({
          label,
          value,
          icon,
        }))}
        selected={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <FormDescription className='text-xs'>
        {disabled
          ? 'Only admins can change user roles.'
          : 'Select one or more roles. Users with multiple roles get the union of all permissions.'}
      </FormDescription>
    </div>
  )
}
