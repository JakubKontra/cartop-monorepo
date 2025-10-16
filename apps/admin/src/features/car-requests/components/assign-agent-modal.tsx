'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { toast } from 'sonner'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { graphql } from '@/gql'
import { UPDATE_CAR_REQUEST, GET_CAR_REQUEST } from '../car-requests.graphql'

const GET_USERS = graphql(`
  query GetUsers {
    users(limit: 100) {
      id
      firstName
      lastName
      email
      roles
    }
  }
`)

interface AssignAgentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  carRequestId: string
  currentAgentId?: string | null
  onSuccess?: () => void
}

export function AssignAgentModal({
  open,
  onOpenChange,
  carRequestId,
  currentAgentId,
  onSuccess,
}: AssignAgentModalProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    currentAgentId || ''
  )

  const { data: usersData, loading: loadingUsers } = useQuery(GET_USERS)

  const [updateCarRequest, { loading: updating }] = useMutation(
    UPDATE_CAR_REQUEST,
    {
      refetchQueries: [
        { query: GET_CAR_REQUEST, variables: { id: carRequestId } },
      ],
    }
  )

  const handleAssign = async () => {
    if (!selectedAgentId) {
      toast.error('Vyberte agenta')
      return
    }

    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            assignedAgentId: selectedAgentId,
          },
        },
      })

      toast.success('Agent byl přiřazen')
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to assign agent:', error)
      toast.error('Nepodařilo se přiřadit agenta')
    }
  }

  const handleUnassign = async () => {
    try {
      await updateCarRequest({
        variables: {
          id: carRequestId,
          input: {
            assignedAgentId: null,
          },
        },
      })

      toast.success('Agent byl odstraněn')
      setSelectedAgentId('')
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to unassign agent:', error)
      toast.error('Nepodařilo se odstranit agenta')
    }
  }

  const agents = usersData?.users || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Přiřadit agenta</DialogTitle>
          <DialogDescription>
            Vyberte agenta, který bude odpovědný za tento car request
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='agent'>Agent</Label>
            <Select
              value={selectedAgentId}
              onValueChange={setSelectedAgentId}
              disabled={loadingUsers}
            >
              <SelectTrigger id='agent'>
                <SelectValue placeholder='Vyberte agenta' />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className='flex items-center gap-2'>
                      <User className='h-4 w-4' />
                      <span>
                        {agent.firstName} {agent.lastName}
                      </span>
                      <span className='text-muted-foreground text-xs'>
                        ({agent.email})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          {currentAgentId && (
            <Button
              variant='outline'
              onClick={handleUnassign}
              disabled={updating}
            >
              Odstranit agenta
            </Button>
          )}
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={updating}
          >
            Zrušit
          </Button>
          <Button onClick={handleAssign} disabled={updating || !selectedAgentId}>
            {updating ? 'Přiřazování...' : 'Přiřadit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
