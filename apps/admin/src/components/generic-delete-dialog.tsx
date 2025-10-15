'use client'

import { useState, useEffect } from 'react'
import { type DocumentNode } from 'graphql'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { useMutation, type MutationHookOptions } from '@apollo/client/react'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { logger } from '@/lib/logger'
import { extractGraphQLErrorMessage } from '@/lib/extract-graphql-error'

type GenericDeleteDialogProps<TData = Record<string, unknown>> = {
  /** Dialog open state */
  open: boolean
  /** Function to toggle dialog open state */
  onOpenChange: (open: boolean) => void
  /** Entity type for display (e.g., 'user', 'brand', 'model') */
  entityType: string
  /** Specific entity instance to delete */
  entity: TData
  /** Field name to use for confirmation input (e.g., 'email', 'name') */
  confirmField: keyof TData
  /** GraphQL mutation document */
  mutation: DocumentNode
  /** Mutation options (for refetchQueries, etc.) */
  mutationOptions?: MutationHookOptions
  /** Variable name for the ID in the mutation (default: 'id') */
  idVariableName?: string
  /** Custom success message (optional) */
  successMessage?: string
  /** Custom error message prefix (optional) */
  errorMessagePrefix?: string
  /** Additional warning text (optional) */
  warningText?: React.ReactNode
  /** Custom render function for the entity description */
  renderEntityDescription?: (entity: TData) => React.ReactNode
}

/**
 * Generic Delete Dialog Component
 *
 * A reusable confirmation dialog for deleting entities with GraphQL mutations.
 * Requires user to type the confirmation field value to prevent accidental deletions.
 *
 * @example
 * ```tsx
 * <GenericDeleteDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   entityType="brand"
 *   entity={currentBrand}
 *   confirmField="name"
 *   mutation={DELETE_CATALOG_BRAND}
 *   mutationOptions={{
 *     refetchQueries: [{ query: GET_ALL_BRANDS }]
 *   }}
 * />
 * ```
 */
export function GenericDeleteDialog<TData extends Record<string, unknown> = Record<string, unknown>>({
  open,
  onOpenChange,
  entityType,
  entity,
  confirmField,
  mutation,
  mutationOptions,
  idVariableName = 'id',
  successMessage,
  errorMessagePrefix,
  warningText,
  renderEntityDescription,
}: GenericDeleteDialogProps<TData>) {
  const [value, setValue] = useState('')

  const [deleteEntity, { loading }] = useMutation(mutation, mutationOptions)

  // Reset input value when dialog closes
  useEffect(() => {
    if (!open) {
      setValue('')
    }
  }, [open])

  const confirmValue = String(entity[confirmField])
  const entityName = String(entity.name || entity[confirmField] || entityType)

  const handleDelete = async () => {
    if (value.trim() !== confirmValue) return

    try {
      const result = await deleteEntity({
        variables: {
          [idVariableName]: entity.id,
        },
      })

      // Check if there are errors in the result (Apollo errorPolicy: 'all' returns both data and errors)
      if (result.errors && result.errors.length > 0) {
        throw result.errors[0]
      }

      const message = successMessage || `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} "${entityName}" deleted successfully`
      toast.success(message)

      setValue('')
      onOpenChange(false)
    } catch (error: unknown) {
      logger.error(`Delete ${entityType} failed`, error, { entityType, entityId: entity.id })

      // Extract the actual error message from nested GraphQL errors
      const extractedMessage = extractGraphQLErrorMessage(error)

      // Provide user-friendly message for common errors
      let displayMessage = extractedMessage

      if (extractedMessage.includes('foreign key constraint')) {
        // Extract the referenced table name if possible
        const tableMatch = extractedMessage.match(/on table "(\w+)"/)
        const referencedTable = tableMatch ? tableMatch[1] : 'other records'

        displayMessage = `Cannot delete: This ${entityType} is being used by ${referencedTable}. Please remove those references first.`
      } else if (errorMessagePrefix) {
        displayMessage = `${errorMessagePrefix}: ${extractedMessage}`
      }

      toast.error(displayMessage)
    }
  }

  const defaultEntityDescription = renderEntityDescription
    ? renderEntityDescription(entity)
    : (
      <p className='mb-2'>
        Are you sure you want to delete{' '}
        <span className='font-bold'>{entityName}</span>?
        <br />
        This action will permanently remove the {entityType} from the system. This
        cannot be undone.
      </p>
    )

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== confirmValue || loading}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          Delete {entityType.charAt(0).toUpperCase() + entityType.slice(1)}
        </span>
      }
      desc={
        <div className='space-y-4'>
          {defaultEntityDescription}

          <Label className='my-2'>
            {String(confirmField).charAt(0).toUpperCase() + String(confirmField).slice(1)}:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Enter ${String(confirmField)} to confirm deletion.`}
              disabled={loading}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              {warningText || 'Please be careful, this operation can not be rolled back.'}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={
        loading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Deleting...
          </>
        ) : (
          'Delete'
        )
      }
      destructive
    />
  )
}
