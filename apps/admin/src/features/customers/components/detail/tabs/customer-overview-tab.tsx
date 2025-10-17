'use client'

import { formatDate } from 'date-fns'
import { cs } from 'date-fns/locale'
import { UserCircle, Mail, Phone, Calendar, Activity as ActivityIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ActivityTimeline } from '../activity-timeline'
import { type CustomerDetail, type ActivityLog } from '../../../data/customer-detail-types'

interface CustomerOverviewTabProps {
  customer: CustomerDetail
  recentActivity: ActivityLog[]
}

export function CustomerOverviewTab({ customer, recentActivity }: CustomerOverviewTabProps) {
  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <UserCircle className='h-5 w-5' />
            Základní informace
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <label className='text-sm font-medium text-muted-foreground'>
              Celé jméno
            </label>
            <p className='text-sm'>
              {customer.firstName} {customer.lastName}
            </p>
          </div>

          <div>
            <label className='text-sm font-medium text-muted-foreground'>
              Email
            </label>
            <p className='text-sm flex items-center gap-2'>
              <Mail className='h-4 w-4' />
              <a
                href={`mailto:${customer.email}`}
                className='hover:text-primary hover:underline'
              >
                {customer.email}
              </a>
            </p>
          </div>

          {customer.phone && (
            <div>
              <label className='text-sm font-medium text-muted-foreground'>
                Telefon
              </label>
              <p className='text-sm flex items-center gap-2'>
                <Phone className='h-4 w-4' />
                <a
                  href={`tel:${customer.phone}`}
                  className='hover:text-primary hover:underline'
                >
                  {customer.phone}
                </a>
              </p>
            </div>
          )}

          <div>
            <label className='text-sm font-medium text-muted-foreground'>
              Datum registrace
            </label>
            <p className='text-sm flex items-center gap-2'>
              <Calendar className='h-4 w-4' />
              {formatDate(new Date(customer.createdAt), 'PPP', { locale: cs })}
            </p>
          </div>

          {customer.bio && (
            <div>
              <label className='text-sm font-medium text-muted-foreground'>
                Bio
              </label>
              <p className='text-sm'>{customer.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <ActivityIcon className='h-5 w-5' />
            Poslední aktivita
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <ActivityTimeline activities={recentActivity.slice(0, 5)} />
          ) : (
            <div className='text-center py-8 text-muted-foreground'>
              <ActivityIcon className='h-12 w-12 mx-auto mb-2 opacity-20' />
              <p>Žádná nedávná aktivita</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
