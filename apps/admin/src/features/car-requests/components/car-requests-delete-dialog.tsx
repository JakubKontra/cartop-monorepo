import { GenericDeleteDialog } from '@/components/generic-delete-dialog'
import { useCarRequests } from './car-requests-provider'
import { DELETE_CAR_REQUEST, GET_ALL_CAR_REQUESTS } from '../car-requests.graphql'

export function CarRequestsDeleteDialog() {
  const { open, setOpen, currentRow } = useCarRequests()

  if (!currentRow) {
    return null
  }

  return (
    <GenericDeleteDialog
      open={open === 'delete'}
      onOpenChange={(isOpen) => setOpen(isOpen ? 'delete' : null)}
      entityType='car request'
      entity={currentRow}
      confirmField='id'
      mutation={DELETE_CAR_REQUEST}
      mutationOptions={{
        refetchQueries: [{ query: GET_ALL_CAR_REQUESTS, variables: { limit: 1000, offset: 0 } }],
      }}
      renderEntityDescription={(entity) => (
        <p className='mb-2'>
          Are you sure you want to delete the car request for{' '}
          <span className='font-bold'>{entity.requestEmail || entity.id}</span>?
          <br />
          This action will permanently remove the car request from the system. This
          cannot be undone.
        </p>
      )}
    />
  )
}
