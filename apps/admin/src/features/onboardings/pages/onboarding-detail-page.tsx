'use client'

import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { useParams, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Loader2, ArrowLeft, Calendar, Mail, User, FileText, CheckCircle2, XCircle } from 'lucide-react'
import { GET_ONBOARDING } from '../onboardings.graphql'
import { OnboardingStatusBadge } from '../components/onboarding-status-badge'
import { DocumentValidationStatusBadge } from '../components/document-validation-status-badge'
import { SendReminderButton } from '../components/send-reminder-button'
import { DocumentValidationDialog } from '../components/document-validation-dialog'
import { OnboardingStatusUpdateDialog } from '../components/onboarding-status-update-dialog'
import type { OnboardingDocument } from '../types'

export default function OnboardingDetailPage() {
  const { onboardingId } = useParams({ strict: false }) as { onboardingId: string }
  const [validationDialog, setValidationDialog] = useState<{
    open: boolean
    document: OnboardingDocument | null
  }>({
    open: false,
    document: null,
  })
  const [statusDialog, setStatusDialog] = useState(false)

  const { data, loading, error } = useQuery(GET_ONBOARDING, {
    variables: { id: onboardingId },
    skip: !onboardingId,
  })

  const onboarding = data?.onboarding

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (error || !onboarding) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p className='text-destructive'>
          {error ? `Error: ${error.message}` : 'Onboarding not found'}
        </p>
      </div>
    )
  }

  const carRequest = onboarding.carRequest
  const customer = carRequest.customer
  const leasingCompany = onboarding.leasingCompany

  const customerName = customer
    ? `${customer.firstName} ${customer.lastName}`
    : `${carRequest.requestFirstName} ${carRequest.requestLastName}`
  const customerEmail = customer?.email || carRequest.requestEmail
  const customerPhone = customer?.phone || carRequest.requestPhone

  return (
    <>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        {/* Header */}
        <div className='flex items-center gap-4'>
          <Link to='/onboardings'>
            <Button variant='ghost' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
          </Link>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold tracking-tight'>
              Onboarding Details
            </h1>
            <p className='text-muted-foreground'>
              {customerName} - {leasingCompany.name}
            </p>
          </div>
          <SendReminderButton onboardingId={onboarding.id} />
          <Button variant='outline' onClick={() => setStatusDialog(true)}>
            Update Status
          </Button>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          {/* Onboarding Info */}
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Status</span>
                <OnboardingStatusBadge status={onboarding.status} />
              </div>
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Created</span>
                <span className='text-sm text-muted-foreground'>
                  {new Date(onboarding.createdAt).toLocaleString()}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Expires</span>
                <span className='text-sm text-muted-foreground'>
                  {new Date(onboarding.expiresAt).toLocaleString()}
                </span>
              </div>
              {onboarding.completedAt && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Completed</span>
                  <span className='text-sm text-muted-foreground'>
                    {new Date(onboarding.completedAt).toLocaleString()}
                  </span>
                </div>
              )}
              {onboarding.lastReminderSentAt && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>Last Reminder</span>
                  <span className='text-sm text-muted-foreground'>
                    {new Date(onboarding.lastReminderSentAt).toLocaleString()}
                  </span>
                </div>
              )}
              <Separator />
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Token</span>
                <code className='text-xs bg-muted px-2 py-1 rounded'>
                  {onboarding.token}
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-start gap-2'>
                <User className='h-4 w-4 mt-0.5 text-muted-foreground' />
                <div>
                  <p className='text-sm font-medium'>{customerName}</p>
                  <p className='text-xs text-muted-foreground'>
                    {customer ? 'Registered Customer' : 'Guest'}
                  </p>
                </div>
              </div>
              <Separator />
              <div className='flex items-start gap-2'>
                <Mail className='h-4 w-4 mt-0.5 text-muted-foreground' />
                <div>
                  <p className='text-sm'>{customerEmail}</p>
                  {customerPhone && (
                    <p className='text-xs text-muted-foreground'>{customerPhone}</p>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <p className='text-sm font-medium mb-2'>Vehicle Request</p>
                <div className='flex items-center gap-2'>
                  <span className='text-sm'>
                    {carRequest.brand?.name} {carRequest.model?.name}
                  </span>
                  {carRequest.financingType && (
                    <Badge variant='outline'>{carRequest.financingType}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
            <CardDescription>
              Review and validate customer documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            {onboarding.documents.length === 0 ? (
              <div className='flex h-32 items-center justify-center'>
                <p className='text-sm text-muted-foreground'>No documents uploaded yet</p>
              </div>
            ) : (
              <div className='space-y-4'>
                {onboarding.documents.map((document) => (
                  <div
                    key={document.id}
                    className='flex items-center justify-between rounded-lg border p-4'
                  >
                    <div className='flex items-start gap-3'>
                      <FileText className='h-5 w-5 mt-0.5 text-muted-foreground' />
                      <div>
                        <p className='text-sm font-medium'>
                          {document.documentTemplate.name}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {document.file.name} ({document.file.sizeFormatted})
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Uploaded: {new Date(document.uploadedAt).toLocaleString()}
                        </p>
                        {document.validationNote && (
                          <p className='text-xs text-muted-foreground mt-1'>
                            Note: {document.validationNote}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <DocumentValidationStatusBadge status={document.validationStatus} />
                      {document.file.url && (
                        <Button
                          variant='outline'
                          size='sm'
                          asChild
                        >
                          <a
                            href={document.file.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            View
                          </a>
                        </Button>
                      )}
                      {document.validationStatus === 'PENDING' && (
                        <Button
                          variant='default'
                          size='sm'
                          onClick={() =>
                            setValidationDialog({ open: true, document })
                          }
                        >
                          Validate
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <DocumentValidationDialog
        document={validationDialog.document}
        onboardingId={onboarding.id}
        open={validationDialog.open}
        onOpenChange={(open) =>
          setValidationDialog({ open, document: open ? validationDialog.document : null })
        }
      />

      <OnboardingStatusUpdateDialog
        onboardingId={onboarding.id}
        currentStatus={onboarding.status}
        open={statusDialog}
        onOpenChange={setStatusDialog}
      />
    </>
  )
}
