'use client'

import { useNavigate, useSearch } from '@tanstack/react-router'
import { useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { EngineForm } from '../components/engine-form'
import { type EngineFormValues } from '../data/schema'
import { CREATE_ENGINE, GET_ALL_ENGINES } from '../engines.graphql'
import { logger } from '@/lib/logger'

export function EngineCreatePage() {
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as { generationId?: string }

  const [createEngine, { loading }] = useMutation(CREATE_ENGINE, {
    refetchQueries: [{ query: GET_ALL_ENGINES }],
  })

  const handleSubmit = async (values: EngineFormValues) => {
    try {
      // Convert date strings to proper format
      const input = {
        ...values,
        productionStart: values.productionStart || undefined,
        productionStop: values.productionStop || undefined,
        legacySystemId: values.legacySystemId || undefined,
      }

      await createEngine({
        variables: { input },
      })
      toast.success('Engine created successfully')
      navigate({ to: '/engines' })
    } catch (error: unknown) {
      logger.error('Engine creation failed', error, { engineName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to create engine'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/engines' })
  }

  return (
    <CrudPageLayout
      title="Create Engine"
      description="Add a new engine to the catalog"
      backUrl="/engines"
      backButtonLabel="Back to Engines"
    >
      <EngineForm
        isEdit={false}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        preselectedGenerationId={search.generationId}
      />
    </CrudPageLayout>
  )
}
