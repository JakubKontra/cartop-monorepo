'use client'

import { formatDate } from 'date-fns'
import { cs } from 'date-fns/locale'
import { FileText, Download, CheckCircle2, XCircle, Upload as UploadIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type OnboardingDocument, DOCUMENT_STATUS_LABELS } from '../../../data/customer-detail-types'

interface CustomerDocumentsTabProps {
  documents: OnboardingDocument[]
}

export function CustomerDocumentsTab({ documents }: CustomerDocumentsTabProps) {
  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className='py-12'>
          <div className='text-center text-muted-foreground'>
            <FileText className='h-12 w-12 mx-auto mb-2 opacity-20' />
            <p>Žádné dokumenty nenalezeny</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = (validationStatus: string) => {
    switch (validationStatus) {
      case 'APPROVED':
        return <CheckCircle2 className='h-4 w-4 text-green-500' />
      case 'REJECTED':
        return <XCircle className='h-4 w-4 text-red-500' />
      case 'PENDING':
        return <UploadIcon className='h-4 w-4 text-blue-500' />
      default:
        return <FileText className='h-4 w-4 text-gray-500' />
    }
  }

  const getStatusVariant = (validationStatus: string) => {
    switch (validationStatus) {
      case 'APPROVED':
        return 'default'
      case 'REJECTED':
        return 'destructive'
      case 'PENDING':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Card>
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Název souboru</TableHead>
              <TableHead>Typ dokumentu</TableHead>
              <TableHead>Velikost</TableHead>
              <TableHead>Stav</TableHead>
              <TableHead>Nahráno</TableHead>
              <TableHead>Ověřil</TableHead>
              <TableHead className='w-[100px]'>Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {getStatusIcon(doc.validationStatus)}
                    <span className='font-medium'>{doc.file?.name || 'Bez názvu'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>{doc.documentTemplate?.name || '-'}</span>
                </TableCell>
                <TableCell>
                  {doc.file?.size ? (
                    <span className='text-sm text-muted-foreground'>
                      {formatFileSize(doc.file.size)}
                    </span>
                  ) : (
                    <span className='text-sm text-muted-foreground'>-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(doc.validationStatus)}>
                    {DOCUMENT_STATUS_LABELS[doc.validationStatus as keyof typeof DOCUMENT_STATUS_LABELS] || doc.validationStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  {doc.uploadedAt ? (
                    <span className='text-sm text-muted-foreground'>
                      {formatDate(new Date(doc.uploadedAt), 'PPP', { locale: cs })}
                    </span>
                  ) : (
                    <span className='text-sm text-muted-foreground'>-</span>
                  )}
                </TableCell>
                <TableCell>
                  {doc.validatedBy ? (
                    <span className='text-sm'>
                      {doc.validatedBy.firstName} {doc.validatedBy.lastName}
                    </span>
                  ) : (
                    <span className='text-sm text-muted-foreground'>-</span>
                  )}
                </TableCell>
                <TableCell>
                  {doc.file?.url && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => window.open(doc.file.url, '_blank')}
                    >
                      <Download className='h-4 w-4' />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
