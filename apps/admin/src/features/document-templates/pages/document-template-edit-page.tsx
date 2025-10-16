'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DocumentTemplateForm } from '../components/document-template-form'
import {
  GET_DOCUMENT_TEMPLATE,
  UPDATE_DOCUMENT_TEMPLATE,
  GET_ALL_DOCUMENT_TEMPLATES,
} from '../document-templates.graphql'
import { toFormValues, toUpdateInput } from '../data/transformers'
import type { DocumentTemplateFormValues } from '../data/schema'

export default function DocumentTemplateEditPage() {
  const { templateId } = useParams({ strict: false }) as { templateId: string }
  const navigate = useNavigate()

  const { data, loading: loadingTemplate } = useQuery(GET_DOCUMENT_TEMPLATE, {
    variables: { id: templateId },
    skip: !templateId,
  })

  const [updateDocumentTemplate, { loading: updating }] = useMutation(UPDATE_DOCUMENT_TEMPLATE, {
    refetchQueries: [
      { query: GET_ALL_DOCUMENT_TEMPLATES },
      { query: GET_DOCUMENT_TEMPLATE, variables: { id: templateId } },
    ],
    onCompleted: () => {
      toast.success('Document template updated successfully')
      navigate({ to: '/document-templates' })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (values: DocumentTemplateFormValues) => {
    const input = toUpdateInput(values)
    updateDocumentTemplate({
      variables: {
        id: templateId,
        input,
      },
    })
  }

  const handleCancel = () => {
    navigate({ to: '/document-templates' })
  }

  if (loadingTemplate) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  const template = data?.documentTemplate
  if (!template) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p className='text-destructive'>Document template not found</p>
      </div>
    )
  }

  const defaultValues = toFormValues(template)

  return (
    <div className='flex h-full flex-1 flex-col gap-4 p-4'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={handleCancel}
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Edit Document Template
          </h1>
          <p className='text-muted-foreground'>
            Update document template: {template.name}
          </p>
        </div>
      </div>

      <DocumentTemplateForm
        defaultValues={defaultValues}
        isEdit
        loading={updating}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  )
}
