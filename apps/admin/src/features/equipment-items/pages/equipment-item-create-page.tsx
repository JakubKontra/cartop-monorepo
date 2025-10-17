'use client'

import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { EquipmentItemForm } from '../components/equipment-item-form'
import { type EquipmentItemFormValues } from '../data/schema'
import { CREATE_EQUIPMENT_ITEM, GET_ALL_EQUIPMENT_ITEMS } from '../equipment-items.graphql'
import { logger } from '@/lib/logger'

export function EquipmentItemCreatePage() {
  const navigate = useNavigate()

  const [createItem, { loading }] = useMutation(CREATE_EQUIPMENT_ITEM, {
    refetchQueries: [{ query: GET_ALL_EQUIPMENT_ITEMS, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: EquipmentItemFormValues) => {
    try {
      const input = {
        name: values.name,
        legacySystemId: values.legacySystemId || undefined,
      }

      await createItem({ variables: { input } })
      toast.success('Equipment item created successfully')
      navigate({ to: '/equipment-items' })
    } catch (error: unknown) {
      logger.error('Equipment item creation failed', error, { itemName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to create equipment item'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/equipment-items' })
  }

  return (
    <CrudPageLayout
      title="Create Equipment Item"
      description="Add a new equipment item to the catalog"
      backUrl="/equipment-items"
      backButtonLabel="Back to Equipment Items"
    >
      <EquipmentItemForm
        isEdit={false}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </CrudPageLayout>
  )
}
