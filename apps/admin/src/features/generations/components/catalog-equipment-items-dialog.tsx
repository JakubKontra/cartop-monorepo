'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { toast } from 'sonner'
import { Check, Info } from 'lucide-react'
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
import { Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface CatalogEquipmentItemsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  equipment: any
  onSuccess?: () => void
}

export function CatalogEquipmentItemsDialog({
  open,
  onOpenChange,
  equipment,
  onSuccess,
}: CatalogEquipmentItemsDialogProps) {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([])

  const { data: itemsData, loading: loadingItems } = useQuery(GET_ALL_EQUIPMENT_ITEMS, {
    variables: { limit: 1000, offset: 0 },
  })

  // Initialize selected items when equipment data changes
  useEffect(() => {
    if (equipment?.items) {
      setSelectedItemIds(equipment.items.map((item: any) => item.id))
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
      // TODO: This requires backend support for assigning items to catalog equipment
      // For now, this is a placeholder that will need to be implemented when the backend
      // mutation is available. The mutation should accept itemIds array.

      toast.info('Item assignment feature requires backend implementation')
      onOpenChange(false)

      // When implemented, it should look like:
      // await updateEquipment({
      //   variables: {
      //     id: equipment.id,
      //     input: { itemIds: selectedItemIds }
      //   },
      // })
      // toast.success('Equipment items assigned successfully')
      // onSuccess?.()
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to assign items'
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Manage Equipment Items</DialogTitle>
          <DialogDescription>
            View items for <span className='font-semibold'>{equipment?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <Info className='h-4 w-4' />
          <AlertDescription>
            Item assignment is currently view-only. Backend support for managing item assignments
            can be added if needed.
          </AlertDescription>
        </Alert>

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
                      className='flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer opacity-60'
                      onClick={() => toggleItem(item.id)}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleItem(item.id)}
                        disabled
                      />
                      <div className='flex-1'>
                        <p className='font-medium'>{item.name}</p>
                        {item.legacySystemId && (
                          <p className='text-xs text-muted-foreground'>
                            ID: {item.legacySystemId}
                          </p>
                        )}
                      </div>
                      {isSelected && <Check className='h-4 w-4 text-primary' />}
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
              {selectedItemIds.length} item(s) currently assigned
            </p>
            <div className='flex gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
              {/* Uncomment when backend support is added */}
              {/* <Button onClick={handleSave} disabled={loadingItems}>
                Save Assignment
              </Button> */}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
