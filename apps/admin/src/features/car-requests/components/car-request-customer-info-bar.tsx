'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { Crown, Edit } from 'lucide-react'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  UPDATE_CAR_REQUEST,
  GET_CAR_REQUEST,
  GET_ALL_CAR_REQUESTS,
} from '../car-requests.graphql'
import {
  CarDetailsEditForm,
  type CarDetailsFormValues,
} from './car-details-edit-form'
import {
  CustomerInfoEditForm,
  type CustomerInfoFormValues,
} from './customer-info-edit-form'

interface CarRequestCustomerInfoBarProps {
  carRequestId: string
  carRequest: {
    requestFirstName?: string | null
    requestLastName?: string | null
    requestEmail?: string | null
    requestPhone?: string | null
    requestPostalCode?: string | null
    brand?: { name: string } | null
    model?: { name: string } | null
    financingType?: string | null
    leasingCompany?: { name: string } | null
    [key: string]: unknown
  }
}

export function CarRequestCustomerInfoBar({
  carRequestId,
  carRequest,
}: CarRequestCustomerInfoBarProps) {
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false)
  const [isEditCarModalOpen, setIsEditCarModalOpen] = useState(false)

  const [updateCarRequest, { loading }] = useMutation(UPDATE_CAR_REQUEST, {
    refetchQueries: [
      { query: GET_ALL_CAR_REQUESTS, variables: { limit: 1000, offset: 0 } },
      { query: GET_CAR_REQUEST, variables: { id: carRequestId } },
    ],
  })

  const handleMarkAsVip = async () => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            noteInternal: 'Customer marked as VIP',
            // TODO: Add isVip field to schema when available
          },
        },
      })
      toast.success('Customer marked as VIP')
    } catch (error) {
      logger.error('Failed to mark customer as VIP', error, { carRequestId })
      toast.error('Failed to mark as VIP')
    }
  }

  const handleEditCustomerSubmit = async (values: CustomerInfoFormValues) => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: values,
        },
      })
      toast.success('Customer information updated successfully')
      setIsEditCustomerModalOpen(false)
    } catch (error: unknown) {
      logger.error('Customer update failed', error, { carRequestId })
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to update customer information'
      toast.error(message)
    }
  }

  const handleEditCarSubmit = async (values: CarDetailsFormValues) => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: values,
        },
      })
      toast.success('Car details updated successfully')
      setIsEditCarModalOpen(false)
    } catch (error: unknown) {
      logger.error('Car details update failed', error, { carRequestId })
      const message =
        error instanceof Error ? error.message : 'Failed to update car details'
      toast.error(message)
    }
  }

  return (
    <>
      <div className='bg-muted/30 mb-4 rounded-lg border p-4'>
        <div className='grid grid-cols-2 gap-6'>
          {/* Left Half - Customer Info */}
          <div className='border-r pr-6'>
            <div className='mb-3 flex items-center justify-between'>
              <h3 className='text-muted-foreground text-sm font-semibold'>
                Customer Information
              </h3>
              <div className='flex items-center gap-2'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={handleMarkAsVip}
                  disabled={loading}
                  className='border-amber-200 bg-amber-50 hover:bg-amber-100'
                >
                  <Crown className='h-4 w-4 text-amber-600' />
                  <span className='ml-1.5 font-semibold text-amber-700'>
                    VIP
                  </span>
                </Button>

                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setIsEditCustomerModalOpen(true)}
                >
                  <Edit className='h-4 w-4' />
                  <span className='ml-1.5'>Edit</span>
                </Button>
              </div>
            </div>

            <div className='space-y-2 text-sm'>
              <div className='flex items-center gap-2'>
                <span className='text-muted-foreground min-w-[80px] font-medium'>
                  Name:
                </span>
                <span className='font-semibold'>
                  {carRequest.requestFirstName} {carRequest.requestLastName}
                </span>
              </div>

              <div className='flex items-center gap-2'>
                <span className='text-muted-foreground min-w-[80px] font-medium'>
                  Email:
                </span>
                <span>{carRequest.requestEmail}</span>
              </div>

              <div className='flex items-center gap-2'>
                <span className='text-muted-foreground min-w-[80px] font-medium'>
                  Phone:
                </span>
                <span>{carRequest.requestPhone}</span>
              </div>

              {carRequest.requestPostalCode && (
                <div className='flex items-center gap-2'>
                  <span className='text-muted-foreground min-w-[80px] font-medium'>
                    Postal Code:
                  </span>
                  <span>{carRequest.requestPostalCode}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Half - Car Details */}
          <div className='pl-6'>
            <div className='mb-3 flex items-center justify-between'>
              <h3 className='text-muted-foreground text-sm font-semibold'>
                Car Details
              </h3>
              <Button
                size='sm'
                variant='outline'
                onClick={() => setIsEditCarModalOpen(true)}
              >
                <Edit className='h-4 w-4' />
                <span className='ml-1.5'>Edit</span>
              </Button>
            </div>

            <div className='space-y-2 text-sm'>
              {carRequest.brand && carRequest.model && (
                <div className='flex items-center gap-2'>
                  <span className='text-muted-foreground min-w-[100px] font-medium'>
                    Vehicle:
                  </span>
                  <span className='text-base font-semibold'>
                    {carRequest.brand.name} {carRequest.model.name}
                  </span>
                </div>
              )}

              {carRequest.financingType && (
                <div className='flex items-center gap-2'>
                  <span className='text-muted-foreground min-w-[100px] font-medium'>
                    Financing:
                  </span>
                  <span className='capitalize'>{carRequest.financingType}</span>
                </div>
              )}

              {carRequest.leasingCompany && (
                <div className='flex items-center gap-2'>
                  <span className='text-muted-foreground min-w-[100px] font-medium'>
                    Leasing:
                  </span>
                  <span>{carRequest.leasingCompany.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Customer Modal */}
      <Dialog
        open={isEditCustomerModalOpen}
        onOpenChange={setIsEditCustomerModalOpen}
      >
        <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit Customer Information</DialogTitle>
            <DialogDescription>
              Update customer contact and personal information
            </DialogDescription>
          </DialogHeader>
          <CustomerInfoEditForm
            loading={loading}
            defaultValues={{
              requestFirstName: carRequest.requestFirstName || '',
              requestLastName: carRequest.requestLastName || '',
              requestEmail: carRequest.requestEmail || '',
              requestPhone: carRequest.requestPhone || '',
              requestPostalCode: carRequest.requestPostalCode || '',
              requestNewsletter: false, // TODO: Add to carRequest type when available
            }}
            onSubmit={handleEditCustomerSubmit}
            onCancel={() => setIsEditCustomerModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Car Details Modal */}
      <Dialog open={isEditCarModalOpen} onOpenChange={setIsEditCarModalOpen}>
        <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit Car Details</DialogTitle>
            <DialogDescription>
              Update vehicle and financing information
            </DialogDescription>
          </DialogHeader>
          <CarDetailsEditForm
            loading={loading}
            defaultValues={{
              brandId: carRequest.brand?.id || '',
              modelId: carRequest.model?.id || '',
              financingType:
                (carRequest.financingType as 'cash' | 'leasing') || 'cash',
              leasingCompanyId: carRequest.leasingCompany?.id || '',
            }}
            onSubmit={handleEditCarSubmit}
            onCancel={() => setIsEditCarModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
