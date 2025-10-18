'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { Plus, Settings, Loader2, Trash2, ChevronLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'
import {
  GET_CATALOG_EQUIPMENT_BY_GENERATION,
  DELETE_CATALOG_EQUIPMENT,
  CREATE_CATALOG_EQUIPMENT,
  UPDATE_CATALOG_EQUIPMENT,
} from '../catalog-equipment.graphql'
import { GET_CATALOG_MODEL_GENERATION } from '../generations.graphql'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { CatalogEquipmentFormDialog } from '../components/catalog-equipment-form-dialog'
import { CatalogEquipmentItemsDialog } from '../components/catalog-equipment-items-dialog'

export function GenerationEquipmentPage() {
  const params = useParams({ from: '/_authenticated/generations/$generationId/equipment' })
  const navigate = useNavigate()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [itemsDialogOpen, setItemsDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)

  const { data: generationData, loading: generationLoading } = useQuery(GET_CATALOG_MODEL_GENERATION, {
    variables: { id: params.generationId },
  })

  const { data, loading, error, refetch } = useQuery(GET_CATALOG_EQUIPMENT_BY_GENERATION, {
    variables: { modelGenerationId: params.generationId },
  })

  const [deleteEquipment, { loading: deleting }] = useMutation(DELETE_CATALOG_EQUIPMENT, {
    onCompleted: () => {
      toast.success('Equipment deleted successfully')
      refetch()
      setDeleteDialogOpen(false)
      setSelectedEquipment(null)
    },
    onError: (error) => {
      logger.error('Equipment deletion failed', error, { equipmentId: selectedEquipment?.id })
      toast.error(error.message || 'Failed to delete equipment')
    },
  })

  const handleEdit = (equipment: any) => {
    setSelectedEquipment(equipment)
    setEditDialogOpen(true)
  }

  const handleManageItems = (equipment: any) => {
    setSelectedEquipment(equipment)
    setItemsDialogOpen(true)
  }

  const handleDelete = (equipment: any) => {
    setSelectedEquipment(equipment)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedEquipment) return
    await deleteEquipment({ variables: { id: selectedEquipment.id } })
  }

  const handleBack = () => {
    navigate({ to: '/generations' })
  }

  if (generationLoading || loading) {
    return (
      <div className='container mx-auto py-6'>
        <Card>
          <CardHeader>
            <CardTitle>Generation Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex h-32 items-center justify-center'>
              <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto py-6'>
        <Card>
          <CardHeader>
            <CardTitle>Generation Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-destructive'>Error loading equipment: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const generation = generationData?.catalogModelGeneration
  const equipments = data?.catalogEquipmentByModelGenerationId || []

  return (
    <div className='container mx-auto py-6 space-y-6'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='sm' onClick={handleBack}>
          <ChevronLeft className='h-4 w-4 mr-1' />
          Back
        </Button>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Equipment Management</h1>
          {generation && (
            <p className='text-sm text-muted-foreground mt-1'>
              {generation.name} - {generation.model?.name}
            </p>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Catalog Equipment</CardTitle>
              <p className='text-sm text-muted-foreground mt-1'>
                Equipment categories and their assigned items for this generation
              </p>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)} size='sm'>
              <Plus className='mr-2 h-4 w-4' />
              Add Equipment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {equipments.length === 0 ? (
            <div className='text-center py-8 text-muted-foreground'>
              <Settings className='mx-auto h-12 w-12 mb-2 opacity-20' />
              <p>No equipment yet</p>
              <p className='text-sm'>Create your first equipment to get started</p>
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
                      <div className='flex items-center gap-2 mb-1'>
                        <h4 className='font-semibold'>{equipment.name}</h4>
                        {equipment.standard && (
                          <Badge variant='outline'>Standard</Badge>
                        )}
                        {!equipment.active && (
                          <Badge variant='destructive'>Inactive</Badge>
                        )}
                      </div>
                      {equipment.customText && (
                        <p className='text-sm text-muted-foreground mt-1'>
                          {equipment.customText}
                        </p>
                      )}
                      {equipment.category && (
                        <p className='text-xs text-muted-foreground mt-2'>
                          Category: {equipment.category.name}
                        </p>
                      )}
                      <div className='flex flex-wrap gap-2 mt-3'>
                        {equipment.items?.length > 0 ? (
                          equipment.items.map((item: any) => (
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
                        onClick={() => handleManageItems(equipment)}
                      >
                        <Settings className='mr-1 h-3.5 w-3.5' />
                        Items
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleEdit(equipment)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDelete(equipment)}
                        className='text-destructive hover:text-destructive'
                      >
                        <Trash2 className='h-3.5 w-3.5' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CatalogEquipmentFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        modelGenerationId={params.generationId}
        onSuccess={() => {
          refetch()
          setCreateDialogOpen(false)
        }}
      />

      {selectedEquipment && (
        <>
          <CatalogEquipmentFormDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            modelGenerationId={params.generationId}
            equipment={selectedEquipment}
            onSuccess={() => {
              refetch()
              setEditDialogOpen(false)
              setSelectedEquipment(null)
            }}
          />

          <CatalogEquipmentItemsDialog
            open={itemsDialogOpen}
            onOpenChange={setItemsDialogOpen}
            equipment={selectedEquipment}
            onSuccess={() => {
              refetch()
              setItemsDialogOpen(false)
              setSelectedEquipment(null)
            }}
          />
        </>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the equipment "{selectedEquipment?.name}". This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleting}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
