'use client'

import { useNavigate, useParams } from '@tanstack/react-router'
import { useMutation, useQuery } from '@apollo/client/react'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { EquipmentItemForm } from '../components/equipment-item-form'
import { type EquipmentItemFormValues } from '../data/schema'
import { UPDATE_EQUIPMENT_ITEM, GET_EQUIPMENT_ITEM, GET_ALL_EQUIPMENT_ITEMS } from '../equipment-items.graphql'
import { logger } from '@/lib/logger'

export function EquipmentItemEditPage() {
  const navigate = useNavigate()
  const { itemId } = useParams({ strict: false }) as { itemId: string }

  const { data, loading, error } = useQuery(GET_EQUIPMENT_ITEM, {
    variables: { id: itemId },
    skip: !itemId,
  })

  const [updateItem, { loading: updating }] = useMutation(UPDATE_EQUIPMENT_ITEM, {
    refetchQueries: [
      { query: GET_ALL_EQUIPMENT_ITEMS, variables: { limit: 1000, offset: 0 } },
      { query: GET_EQUIPMENT_ITEM, variables: { id: itemId } },
    ],
  })

  const handleSubmit = async (values: EquipmentItemFormValues) => {
    try {
      const input = {
        name: values.name,
      }

      await updateItem({ variables: { id: itemId, input } })
      toast.success('Equipment item updated successfully')
      navigate({ to: '/equipment-items' })
    } catch (error: unknown) {
      logger.error('Equipment item update failed', error, { itemId, itemName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to update equipment item'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/equipment-items' })
  }

  const item = data?.equipmentItem

  return (
    <CrudPageLayout
      title="Edit Equipment Item"
      description={item ? `Update ${item.name} information` : undefined}
      backUrl="/equipment-items"
      loading={loading}
      loadingMessage="Loading equipment item..."
      error={error || (!item ? new Error('Equipment item not found') : null)}
      errorMessage={error?.message || 'Equipment item not found'}
      backButtonLabel="Back to Equipment Items"
    >
      {item && (
        <EquipmentItemForm
          defaultValues={{
            name: item.name,
          }}
          isEdit={true}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={updating}
        />
      )}
    </CrudPageLayout>
  )
}
