'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import slugifyLib from 'slugify'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { logger } from '@/lib/logger'

interface SlugInputProps extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
  /** The name of the field in the form that should be watched and slugified */
  deriveFrom: string
  /** The name of the slug field itself */
  name: string
  /** Optional custom validation function that checks if slug is unique */
  onValidateUnique?: (slug: string) => Promise<boolean>
  /** Debounce delay for validation in milliseconds */
  debounceMs?: number
  /** Initial slug value (for edit mode) - validation will be skipped if slug matches this */
  initialSlug?: string
}

/**
 * SlugInput component that automatically generates and validates slugs
 *
 * Features:
 * - Auto-generates slug from a source field (e.g., name)
 * - Disabled by default (users can't edit manually)
 * - Debounced uniqueness validation
 * - Integrates with React Hook Form
 */
export function SlugInput({
  deriveFrom,
  name,
  onValidateUnique,
  debounceMs = 500,
  initialSlug,
  className,
  ...props
}: SlugInputProps) {
  const { watch, setValue, setError, clearErrors } = useFormContext()
  const [isValidating, setIsValidating] = React.useState(false)
  const validationTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  // Watch the field we're deriving the slug from
  const sourceValue = watch(deriveFrom)
  const currentSlug = watch(name)

  // Generate slug whenever source value changes
  React.useEffect(() => {
    if (sourceValue && typeof sourceValue === 'string') {
      const newSlug = slugifyLib(sourceValue, {
        lower: true,
        strict: true,
        trim: true,
      })

      // Only update if the slug has changed
      if (newSlug !== currentSlug) {
        setValue(name, newSlug, { shouldValidate: true })
      }
    }
  }, [sourceValue, name, setValue, currentSlug])

  // Debounced uniqueness validation
  React.useEffect(() => {
    if (!currentSlug || !onValidateUnique) {
      return
    }

    // Skip validation if the slug matches the initial slug (edit mode)
    if (initialSlug && currentSlug === initialSlug) {
      clearErrors(name)
      return
    }

    // Clear any existing timeout
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current)
    }

    // Set up new debounced validation
    validationTimeoutRef.current = setTimeout(async () => {
      setIsValidating(true)
      try {
        const isUnique = await onValidateUnique(currentSlug)

        if (!isUnique) {
          setError(name, {
            type: 'manual',
            message: 'This slug is already in use',
          })
        } else {
          clearErrors(name)
        }
      } catch (error) {
        logger.error('Error validating slug uniqueness', error, { slug: currentSlug })
      } finally {
        setIsValidating(false)
      }
    }, debounceMs)

    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug, debounceMs, name, initialSlug])

  return (
    <div className="relative">
      <Input
        className={cn(
          'disabled:opacity-70',
          isValidating && 'pr-10',
          className
        )}
        value={currentSlug || ''}
        disabled
        {...props}
      />
      {isValidating && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        </div>
      )}
    </div>
  )
}
