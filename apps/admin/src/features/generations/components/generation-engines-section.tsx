'use client'

import { useQuery } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Pen, Loader2 } from 'lucide-react'
import { GET_ENGINES_BY_GENERATION } from '@/features/engines/engines.graphql'
import {
  getFuelTypeLabel,
  getTransmissionTypeLabel,
  getDriveTypeLabel,
} from '@/features/engines/data/constants'

interface GenerationEnginesSectionProps {
  generationId: string
}

export function GenerationEnginesSection({ generationId }: GenerationEnginesSectionProps) {
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(GET_ENGINES_BY_GENERATION, {
    variables: { generationId },
  })

  const engines = data?.allEngines || []

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Engines</CardTitle>
            <CardDescription>Manage engines for this generation</CardDescription>
          </div>
          <Button
            size='sm'
            onClick={() =>
              navigate({ to: '/engines/new', search: { generationId } })
            }
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Engine
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className='flex h-32 items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
          </div>
        ) : error ? (
          <div className='flex h-32 items-center justify-center'>
            <p className='text-sm text-destructive'>Error loading engines: {error.message}</p>
          </div>
        ) : engines.length === 0 ? (
          <div className='flex h-32 items-center justify-center'>
            <p className='text-sm text-muted-foreground'>No engines found for this generation</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {engines.map((engine) => (
              <div
                key={engine.id}
                className='flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50'
              >
                <div className='flex-1 space-y-1'>
                  <div className='flex items-center gap-2'>
                    <h4 className='text-sm font-semibold'>{engine.name}</h4>
                    {engine.active && (
                      <Badge variant='default' className='h-5 text-xs'>
                        Active
                      </Badge>
                    )}
                    {engine.recommended && (
                      <Badge
                        variant='outline'
                        className='h-5 bg-yellow-50 text-yellow-700 border-yellow-200 text-xs'
                      >
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
                    <span>{getFuelTypeLabel(engine.fuelType as any)}</span>
                    <span>•</span>
                    <span>{getTransmissionTypeLabel(engine.transmissionType as any)}</span>
                    <span>•</span>
                    <span>{getDriveTypeLabel(engine.driveType as any)}</span>
                    {engine.performance && (
                      <>
                        <span>•</span>
                        <span>{engine.performance} kW</span>
                      </>
                    )}
                    {engine.torque && (
                      <>
                        <span>•</span>
                        <span>{engine.torque} Nm</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() =>
                    navigate({ to: `/engines/$engineId/edit`, params: { engineId: engine.id } })
                  }
                >
                  <Pen className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
