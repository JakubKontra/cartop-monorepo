'use client'

import { ArrowLeft, Mail, Phone, UserCircle } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { type CustomerDetail } from '../../data/customer-detail-types'

interface CustomerDetailHeaderProps {
  customer: CustomerDetail
}

export function CustomerDetailHeader({ customer }: CustomerDetailHeaderProps) {
  const navigate = useNavigate()
  const initials = `${customer.firstName[0]}${customer.lastName[0]}`.toUpperCase()

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => navigate({ to: '/customers' })}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Zpět na seznam
        </Button>
      </div>

      <div className='flex items-start gap-6 rounded-lg border p-6'>
        <Avatar className='h-20 w-20'>
          <AvatarImage
            src={customer.avatar?.url}
            alt={`${customer.firstName} ${customer.lastName}`}
          />
          <AvatarFallback className='text-2xl'>{initials}</AvatarFallback>
        </Avatar>

        <div className='flex-1'>
          <div className='flex items-start justify-between'>
            <div>
              <h1 className='text-3xl font-bold'>
                {customer.firstName} {customer.lastName}
              </h1>
              <div className='mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                {customer.email && (
                  <div className='flex items-center gap-2'>
                    <Mail className='h-4 w-4' />
                    <a
                      href={`mailto:${customer.email}`}
                      className='hover:text-primary hover:underline'
                    >
                      {customer.email}
                    </a>
                  </div>
                )}
                {customer.phone && (
                  <div className='flex items-center gap-2'>
                    <Phone className='h-4 w-4' />
                    <a
                      href={`tel:${customer.phone}`}
                      className='hover:text-primary hover:underline'
                    >
                      {customer.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Badge variant={customer.isActive ? 'default' : 'secondary'}>
                {customer.isActive ? 'Aktivní' : 'Neaktivní'}
              </Badge>
            </div>
          </div>

          {customer.bio && (
            <p className='mt-4 text-sm text-muted-foreground'>{customer.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}
