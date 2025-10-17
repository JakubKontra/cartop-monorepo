'use client'

import { useNavigate, useParams } from '@tanstack/react-router'
import { useMutation, useQuery } from '@apollo/client/react'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { EngineForm } from '../components/engine-form'
import { type EngineFormValues } from '../data/schema'
import { UPDATE_ENGINE, GET_ENGINE, GET_ALL_ENGINES } from '../engines.graphql'
import { logger } from '@/lib/logger'

export function EngineEditPage() {
  const navigate = useNavigate()
  const { engineId } = useParams({ strict: false }) as { engineId: string }

  const { data, loading, error } = useQuery(GET_ENGINE, {
    variables: { id: engineId },
    skip: !engineId,
  })

  const [updateEngine, { loading: updating }] = useMutation(UPDATE_ENGINE, {
    refetchQueries: [
      { query: GET_ALL_ENGINES },
      { query: GET_ENGINE, variables: { id: engineId } },
    ],
  })

  const handleSubmit = async (values: EngineFormValues) => {
    try {
      // Convert date strings to proper format and remove legacy fields for update
      const input = {
        name: values.name,
        generationId: values.generationId,
        fuelType: values.fuelType,
        transmissionType: values.transmissionType,
        driveType: values.driveType,
        consumptionCombined: values.consumptionCombined,
        consumptionCity: values.consumptionCity,
        consumptionOutOfCity: values.consumptionOutOfCity,
        performance: values.performance,
        torque: values.torque,
        volume: values.volume,
        emission: values.emission,
        rangeKm: values.rangeKm,
        acceleration: values.acceleration,
        fuelTankVolume: values.fuelTankVolume,
        cylinderCount: values.cylinderCount,
        maxSpeed: values.maxSpeed,
        weight: values.weight,
        gearsCount: values.gearsCount,
        productionStart: values.productionStart || undefined,
        productionStop: values.productionStop || undefined,
        active: values.active,
        recommended: values.recommended,
      }

      await updateEngine({
        variables: { id: engineId, input },
      })
      toast.success('Engine updated successfully')
      navigate({ to: '/engines' })
    } catch (error: unknown) {
      logger.error('Engine update failed', error, { engineId, engineName: values.name })
      const message = error instanceof Error ? error.message : 'Failed to update engine'
      toast.error(message)
    }
  }

  const handleCancel = () => {
    navigate({ to: '/engines' })
  }

  const engine = data?.engine

  // Format date strings for input[type="date"]
  const formatDateForInput = (dateString: string | null | undefined) => {
    if (!dateString) return ''
    return dateString.split('T')[0]
  }

  return (
    <CrudPageLayout
      title="Edit Engine"
      description={engine ? `Update ${engine.name} information` : undefined}
      backUrl="/engines"
      loading={loading}
      loadingMessage="Loading engine..."
      error={error || (!engine ? new Error('Engine not found') : null)}
      errorMessage={error?.message || 'Engine not found'}
      backButtonLabel="Back to Engines"
    >
      {engine && (
        <EngineForm
          defaultValues={{
            name: engine.name,
            generationId: engine.generationId,
            fuelType: engine.fuelType,
            transmissionType: engine.transmissionType,
            driveType: engine.driveType,
            consumptionCombined: engine.consumptionCombined,
            consumptionCity: engine.consumptionCity,
            consumptionOutOfCity: engine.consumptionOutOfCity,
            performance: engine.performance,
            torque: engine.torque,
            volume: engine.volume,
            emission: engine.emission,
            rangeKm: engine.rangeKm,
            acceleration: engine.acceleration,
            fuelTankVolume: engine.fuelTankVolume,
            cylinderCount: engine.cylinderCount,
            maxSpeed: engine.maxSpeed,
            weight: engine.weight,
            gearsCount: engine.gearsCount,
            productionStart: formatDateForInput(engine.productionStart),
            productionStop: formatDateForInput(engine.productionStop),
            active: engine.active,
            recommended: engine.recommended,
          }}
          isEdit={true}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={updating}
        />
      )}
    </CrudPageLayout>
  )
}
