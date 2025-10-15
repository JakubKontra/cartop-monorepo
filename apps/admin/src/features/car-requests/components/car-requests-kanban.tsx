'use client'

import { useState, useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { logger } from '@/lib/logger'
import { formatDistanceToNow } from 'date-fns'
import { User, Calendar } from 'lucide-react'
import {
  GET_ALL_CAR_REQUESTS,
  UPDATE_CAR_REQUEST,
  GET_ALL_CAR_REQUEST_STATES,
} from '../car-requests.graphql'
import type { GetAllCarRequestsQuery, GetAllCarRequestStatesQuery } from '@/gql/graphql'
import {
  CAR_REQUEST_STATES,
  getAllStateCodes,
  type CarRequestStateCode,
} from '../constants/states'

type CarRequest = GetAllCarRequestsQuery['allCarRequests'][0]

interface KanbanColumnProps {
  id: string
  title: string
  color?: string | null
  requests: CarRequest[]
}

interface KanbanCardProps {
  request: CarRequest
}

function KanbanCard({ request }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: request.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const customerName = [request.requestFirstName, request.requestLastName]
    .filter(Boolean)
    .join(' ') || 'Unknown Customer'

  const carInfo = [request.brand?.name, request.model?.name]
    .filter(Boolean)
    .join(' ') || 'No car specified'

  const agentInitials = request.assignedAgent
    ? `${request.assignedAgent.firstName[0]}${request.assignedAgent.lastName[0]}`
    : '?'

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='mb-3 cursor-grab active:cursor-grabbing'
    >
      <Card className='hover:shadow-md transition-shadow'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-sm font-medium line-clamp-1'>
            {customerName}
          </CardTitle>
          <p className='text-xs text-muted-foreground line-clamp-1'>{carInfo}</p>
        </CardHeader>
        <CardContent className='space-y-2'>
          {request.state && (
            <Badge
              variant='outline'
              style={{
                borderColor: request.state.colorHex || undefined,
                color: request.state.colorHex || undefined,
              }}
            >
              {request.state.name}
            </Badge>
          )}

          <div className='flex items-center justify-between text-xs text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Calendar className='w-3 h-3' />
              <span>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</span>
            </div>

            {request.assignedAgent && (
              <div className='flex items-center gap-1'>
                <User className='w-3 h-3' />
                <Avatar className='w-5 h-5'>
                  <AvatarFallback className='text-[10px]'>{agentInitials}</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function KanbanColumn({ id, title, color, requests }: KanbanColumnProps) {
  return (
    <div className='flex flex-col min-w-[300px] max-w-[350px] flex-shrink-0'>
      <div
        className='flex items-center gap-2 p-3 rounded-t-lg font-semibold text-sm'
        style={{
          backgroundColor: color ? `${color}15` : undefined,
          borderBottom: `2px solid ${color || '#e5e7eb'}`,
        }}
      >
        <span>{title}</span>
        <Badge variant='secondary' className='ml-auto'>
          {requests.length}
        </Badge>
      </div>

      <div className='flex-1 p-3 bg-muted/30 rounded-b-lg min-h-[500px]'>
        <SortableContext
          items={requests.map((r) => r.id)}
          strategy={verticalListSortingStrategy}
        >
          {requests.length === 0 ? (
            <div className='flex items-center justify-center h-24 text-sm text-muted-foreground'>
              No requests
            </div>
          ) : (
            requests.map((request) => (
              <KanbanCard key={request.id} request={request} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export function CarRequestsKanban() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const { data: requestsData, loading: requestsLoading } = useQuery(GET_ALL_CAR_REQUESTS, {
    variables: { limit: 1000, offset: 0 },
  })

  const { data: statesData, loading: statesLoading } = useQuery(GET_ALL_CAR_REQUEST_STATES)

  const [updateCarRequest] = useMutation(UPDATE_CAR_REQUEST, {
    refetchQueries: [
      { query: GET_ALL_CAR_REQUESTS, variables: { limit: 1000, offset: 0 } },
    ],
  })

  // Create state lookup map from backend data
  const stateIdByCode = useMemo(() => {
    if (!statesData?.allCarRequestStates) return new Map<string, string>()

    const map = new Map<string, string>()
    statesData.allCarRequestStates.forEach((state) => {
      map.set(state.code, state.id)
    })
    return map
  }, [statesData])

  const columns = useMemo(() => {
    if (!requestsData?.allCarRequests) {
      return []
    }

    const stateCodes = getAllStateCodes()
    return stateCodes.map((code) => {
      const state = CAR_REQUEST_STATES[code]
      return {
        id: code,
        title: state.name,
        color: state.colorHex,
        requests: requestsData.allCarRequests.filter(
          (request) => request.state?.code === code
        ),
      }
    })
  }, [requestsData])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeRequest = requestsData?.allCarRequests.find((r) => r.id === active.id)
    const overColumnCode = over.id as string

    // Check if the over ID is a column (state) code
    const targetColumn = columns.find((col) => col.id === overColumnCode)

    if (!activeRequest || !targetColumn) return

    // Only update if the state is different
    if (activeRequest.state?.code === targetColumn.id) return

    // Get the state ID from the code
    const newStateId = stateIdByCode.get(targetColumn.id)
    if (!newStateId) {
      logger.error('State ID not found for code', { code: targetColumn.id })
      toast.error('Failed to update request state')
      return
    }

    try {
      await updateCarRequest({
        variables: {
          id: activeRequest.id,
          input: {
            stateId: newStateId,
          },
        },
      })
      toast.success(`Moved to ${targetColumn.title}`)
    } catch (error) {
      logger.error('Failed to update car request state', error, {
        requestId: activeRequest.id,
        newStateId,
      })
      toast.error('Failed to update request state')
    }
  }

  const activeRequest = useMemo(
    () => requestsData?.allCarRequests.find((r) => r.id === activeId),
    [activeId, requestsData]
  )

  if (requestsLoading || statesLoading) {
    return (
      <div className='flex gap-4 overflow-x-auto pb-4'>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className='min-w-[300px] space-y-3'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-32 w-full' />
            <Skeleton className='h-32 w-full' />
          </div>
        ))}
      </div>
    )
  }

  if (!columns.length) {
    return (
      <div className='flex items-center justify-center h-[500px] text-muted-foreground'>
        No states configured
      </div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className='flex gap-4 overflow-x-auto pb-4'>
        {columns.map((column) => (
          <KanbanColumn key={column.id} {...column} />
        ))}
      </div>

      <DragOverlay>
        {activeRequest ? <KanbanCard request={activeRequest} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
