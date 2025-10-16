'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DocumentTemplateForm } from '../components/document-template-form'
import { CREATE_DOCUMENT_TEMPLATE, GET_ALL_DOCUMENT_TEMPLATES } from '../document-templates.graphql'
import { toCreateInput } from '../data/transformers'
import type { DocumentTemplateFormValues } from '../data/schema'

export default function DocumentTemplateCreatePage() {
  const navigate = useNavigate()

  const [createDocumentTemplate, { loading }] = useMutation(CREATE_DOCUMENT_TEMPLATE, {
    refetchQueries: [{ query: GET_ALL_DOCUMENT_TEMPLATES }],
    onCompleted: () => {
      toast.success('Document template created successfully')
      navigate({ to: '/document-templates' })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (values: DocumentTemplateFormValues) => {
    const input = toCreateInput(values)
    createDocumentTemplate({ variables: { input } })
  }

  const handleCancel = () => {
    navigate({ to: '/document-templates' })
  }

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
            Create Document Template
          </h1>
          <p className='text-muted-foreground'>
            Define a new document requirement for a specific leasing company or as a global template
          </p>
        </div>
      </div>

      <DocumentTemplateForm
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  )
}
