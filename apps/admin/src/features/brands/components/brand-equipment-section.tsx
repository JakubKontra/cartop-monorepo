'use client'

import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { Plus, Settings, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GET_ALL_BRAND_EQUIPMENTS } from '@/features/brand-equipment/brand-equipment.graphql'
import { BrandEquipmentFormDialog } from './brand-equipment-form-dialog'
import { EquipmentItemAssignmentDialog } from './equipment-item-assignment-dialog'

interface BrandEquipmentSectionProps {
  brandId: string
}

export function BrandEquipmentSection({ brandId }: BrandEquipmentSectionProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)

  const { data, loading, error } = useQuery(GET_ALL_BRAND_EQUIPMENTS, {
    variables: { brandId, limit: 100, offset: 0 },
  })

  const handleEdit = (equipment: any) => {
    setSelectedEquipment(equipment)
    setEditDialogOpen(true)
  }

  const handleAssignItems = (equipment: any) => {
    setSelectedEquipment(equipment)
    setAssignDialogOpen(true)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Brand Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex h-32 items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Brand Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-destructive'>Error loading equipment: {error.message}</p>
        </CardContent>
      </Card>
    )
  }

  const equipments = data?.allBrandEquipments || []

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Brand Equipment</CardTitle>
              <p className='text-sm text-muted-foreground mt-1'>
                Equipment categories and their assigned items for this brand
              </p>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)} size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add Equipment Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {equipments.length === 0 ? (
            <div className='text-center py-8 text-muted-foreground'>
              <Settings className='mx-auto h-12 w-12 mb-2 opacity-20' />
              <p>No equipment categories yet</p>
              <p className='text-sm'>Create your first equipment category to get started</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {equipments.map((equipment: any) => (
                <div
                  key={equipment.id}
                  className='border rounded-lg p-4 hover:bg-muted/50 transition-colors'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <h4 className='font-semibold'>{equipment.name}</h4>
                      {equipment.description && (
                        <p className='text-sm text-muted-foreground mt-1'>
                          {equipment.description}
                        </p>
                      )}
                      <div className='flex flex-wrap gap-2 mt-3'>
                        {equipment.assignedItems?.length > 0 ? (
                          equipment.assignedItems.map((item: any) => (
                            <Badge key={item.id} variant='secondary'>
                              {item.name}
                            </Badge>
                          ))
                        ) : (
                          <span className='text-sm text-muted-foreground italic'>
                            No items assigned
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='flex gap-2 ml-4'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleAssignItems(equipment)}
                      >
                        Assign Items
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEdit(equipment)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <BrandEquipmentFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        brandId={brandId}
      />

      {selectedEquipment && (
        <>
          <BrandEquipmentFormDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            brandId={brandId}
            equipment={selectedEquipment}
          />

          <EquipmentItemAssignmentDialog
            open={assignDialogOpen}
            onOpenChange={setAssignDialogOpen}
            equipment={selectedEquipment}
          />
        </>
      )}
    </>
  )
}
