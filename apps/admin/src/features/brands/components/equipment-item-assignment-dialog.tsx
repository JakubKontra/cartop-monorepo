'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { Check } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GET_ALL_EQUIPMENT_ITEMS } from '@/features/equipment-items/equipment-items.graphql'
import {
  UPDATE_BRAND_EQUIPMENT,
  GET_ALL_BRAND_EQUIPMENTS,
} from '@/features/brand-equipment/brand-equipment.graphql'
import { logger } from '@/lib/logger'
import { Loader2 } from 'lucide-react'

interface EquipmentItemAssignmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  equipment: any
}

export function EquipmentItemAssignmentDialog({
  open,
  onOpenChange,
  equipment,
}: EquipmentItemAssignmentDialogProps) {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])

  const { data: itemsData, loading: loadingItems } = useQuery(GET_ALL_EQUIPMENT_ITEMS, {
    variables: { limit: 1000, offset: 0 },
  })

  const [updateEquipment, { loading: updating }] = useMutation(UPDATE_BRAND_EQUIPMENT, {
    refetchQueries: [
      {
        query: GET_ALL_BRAND_EQUIPMENTS,
        variables: { brandId: equipment.brandId, limit: 100, offset: 0 },
      },
    ],
  })

  // Initialize selected items when equipment data changes
  useEffect(() => {
    if (equipment?.assignedItems) {
      setSelectedItemIds(equipment.assignedItems.map((item: any) => item.id))
    }
  }, [equipment])

  const allItems = itemsData?.allEquipmentItems || []

  const toggleItem = (itemId: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  const handleSave = async () => {
    try {
      // Note: This assumes the backend accepts assignedItemIds in the update input
      // If not, you may need to use a different approach or add a dedicated mutation
      const input = {
        assignedItemIds: selectedItemIds,
      }

      await updateEquipment({
        variables: { id: equipment.id, input },
      })

      toast.success('Equipment items assigned successfully')
      onOpenChange(false)
    } catch (error: unknown) {
      logger.error('Equipment item assignment failed', error, {
        equipmentId: equipment.id,
      })
      const message =
        error instanceof Error ? error.message : 'Failed to assign items'
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Assign Equipment Items</DialogTitle>
          <DialogDescription>
            Select items to assign to <span className='font-semibold'>{equipment?.name}</span>
          </DialogDescription>
        </DialogHeader>

        {loadingItems ? (
          <div className='flex h-64 items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <ScrollArea className='h-[400px] pr-4'>
            <div className='space-y-2'>
              {allItems.length === 0 ? (
                <p className='text-sm text-muted-foreground text-center py-8'>
                  No equipment items available. Create equipment items first.
                </p>
              ) : (
                allItems.map((item: any) => {
                  const isSelected = selectedItemIds.includes(item.id)
                  return (
                    <div
                      key={item.id}
                      className='flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer'
                      onClick={() => toggleItem(item.id)}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <div className='flex-1'>
                        <p className='font-medium'>{item.name}</p>
                        {item.legacySystemId && (
                          <p className='text-sm text-muted-foreground'>
                            ID: {item.legacySystemId}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <Check className='h-4 w-4 text-primary' />
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </ScrollArea>
        )}

        <DialogFooter>
          <div className='flex items-center justify-between w-full'>
            <p className='text-sm text-muted-foreground'>
              {selectedItemIds.length} item(s) selected
            </p>
            <div className='flex gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                disabled={updating}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={updating || loadingItems}>
                {updating ? 'Saving...' : 'Save Assignment'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
