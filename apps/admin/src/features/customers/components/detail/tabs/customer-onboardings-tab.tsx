'use client'

import { formatDate } from 'date-fns'
import { cs } from 'date-fns/locale'
import { Upload, ExternalLink } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OnboardingProgressIndicator } from '../onboarding-progress-indicator'
import { type Onboarding } from '../../../data/customer-detail-types'

interface CustomerOnboardingsTabProps {
  onboardings: Onboarding[]
}

export function CustomerOnboardingsTab({ onboardings }: CustomerOnboardingsTabProps) {
  if (onboardings.length === 0) {
    return (
      <Card>
        <CardContent className='py-12'>
          <div className='text-center text-muted-foreground'>
            <Upload className='h-12 w-12 mx-auto mb-2 opacity-20' />
            <p>Žádné onboardingy nenalezeny</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {onboardings.map((onboarding) => {
        const totalDocs = onboarding.documents?.length || 0
        const validatedDocs = onboarding.documents?.filter(doc => doc.validationStatus === 'APPROVED').length || 0

        return (
          <Card key={onboarding.id}>
            <CardHeader>
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <CardTitle className='text-base'>
                    {onboarding.leasingCompany.name}
                  </CardTitle>
                  <p className='text-sm text-muted-foreground'>
                    Vytvořeno: {formatDate(new Date(onboarding.createdAt), 'PPP', { locale: cs })}
                  </p>
                </div>
                <Link to='/onboardings/$onboardingId' params={{ onboardingId: onboarding.id }}>
                  <Button variant='ghost' size='sm'>
                    <ExternalLink className='h-4 w-4' />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <OnboardingProgressIndicator onboarding={onboarding} />

              {onboarding.documents && onboarding.documents.length > 0 && (
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>
                    Dokumenty ({validatedDocs} / {totalDocs})
                  </label>
                  <div className='mt-2 space-y-2'>
                    {onboarding.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className='flex items-center justify-between text-sm p-2 rounded border'
                      >
                        <div className='flex-1'>
                          <p className='font-medium'>{doc.documentTemplate?.name || 'Document'}</p>
                          {doc.file && (
                            <p className='text-xs text-muted-foreground'>
                              {doc.file.name}
                            </p>
                          )}
                        </div>
                        <span className='text-xs text-muted-foreground'>
                          {doc.validationStatus === 'APPROVED' ? '✓' :
                           doc.validationStatus === 'REJECTED' ? '✗' :
                           doc.validationStatus === 'PENDING' ? '○' : '○'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
