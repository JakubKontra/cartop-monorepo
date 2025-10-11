import { ModelsActionDialog } from './models-action-dialog'
import { ModelsDeleteDialog } from './models-delete-dialog'
import { useModels } from './models-provider'

export function ModelsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useModels()
  return (
    <>
      <ModelsActionDialog
        key='model-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ModelsActionDialog
            key={`model-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ModelsDeleteDialog
            key={`model-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
