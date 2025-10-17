import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { CatalogColorType } from '@/gql/graphql'
import { useMutation, useQuery } from '@apollo/client/react'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  CREATE_CATALOG_COLOR,
  UPDATE_CATALOG_COLOR,
  GET_CATALOG_COLOR,
  GET_ALL_CATALOG_COLORS,
} from '../colors.graphql'
import { logger } from '@/lib/logger'

interface ColorFormData {
  name: string
  slug: string
  color?: string
  type: CatalogColorType
}

interface ColorFormPageProps {
  colorId?: string
  isEdit?: boolean
}

export function ColorFormPage({ colorId, isEdit = false }: ColorFormPageProps) {
  const navigate = useNavigate()

  // Fetch existing color data if editing
  const { data: colorData, loading: loadingColor, error } = useQuery(GET_CATALOG_COLOR, {
    variables: { id: colorId! },
    skip: !isEdit || !colorId,
  })

  const form = useForm<ColorFormData>({
    defaultValues: colorData?.catalogColor
      ? {
          name: colorData.catalogColor.name,
          slug: colorData.catalogColor.slug,
          color: colorData.catalogColor.color || '',
          type: colorData.catalogColor.type,
        }
      : {
          name: '',
          slug: '',
          color: '',
          type: CatalogColorType.Exterior,
        },
  })

  const [createColor, { loading: creating }] = useMutation(
    CREATE_CATALOG_COLOR,
    {
      refetchQueries: [{ query: GET_ALL_CATALOG_COLORS, variables: { limit: 100, offset: 0 } }],
    }
  )

  const [updateColor, { loading: updating }] = useMutation(
    UPDATE_CATALOG_COLOR,
    {
      refetchQueries: [
        { query: GET_ALL_CATALOG_COLORS, variables: { limit: 100, offset: 0 } },
        { query: GET_CATALOG_COLOR, variables: { id: colorId } },
      ],
    }
  )

  const onSubmit = async (data: ColorFormData) => {
    try {
      const input = {
        name: data.name,
        slug: data.slug,
        color: data.color || null,
        type: data.type,
      }

      if (isEdit && colorId) {
        await updateColor({ variables: { id: colorId, input } })
        toast.success('Color updated successfully')
      } else {
        await createColor({ variables: { input } })
        toast.success('Color created successfully')
      }
      navigate({ to: '/colors' })
    } catch (error: unknown) {
      logger.error(`Color ${isEdit ? 'update' : 'creation'} failed`, error, { colorName: data.name })
      const message = error instanceof Error ? error.message : `Failed to ${isEdit ? 'update' : 'create'} color`
      toast.error(message)
    }
  }

  const loading = creating || updating
  const color = colorData?.catalogColor

  return (
    <CrudPageLayout
      title={isEdit ? 'Edit Color' : 'Create Color'}
      description={isEdit && color ? `Update ${color.name} information` : 'Add a new color to the catalog'}
      backUrl="/colors"
      loading={isEdit ? loadingColor : false}
      loadingMessage="Loading color..."
      error={isEdit ? (error || (!color ? new Error('Color not found') : null)) : null}
      errorMessage={error?.message || 'Color not found'}
      backButtonLabel="Back to Colors"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            rules={{ required: 'Název je povinný' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Název</FormLabel>
                <FormControl>
                  <Input placeholder='Například: Černá metalíza' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='slug'
            rules={{ required: 'Slug je povinný' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder='cerna-metaliza' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='type'
            rules={{ required: 'Typ je povinný' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typ</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Vyberte typ' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={CatalogColorType.Exterior}>
                      Exteriér
                    </SelectItem>
                    <SelectItem value={CatalogColorType.Interior}>
                      Interiér
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='color'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hex kód barvy (volitelné)</FormLabel>
                <div className='flex gap-2'>
                  <FormControl>
                    <Input placeholder='#000000' {...field} />
                  </FormControl>
                  {field.value && (
                    <div
                      className='h-10 w-10 rounded border'
                      style={{ backgroundColor: field.value }}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-4'>
            <Button type='submit' disabled={loading}>
              {loading
                ? 'Saving...'
                : isEdit
                  ? 'Save Changes'
                  : 'Create Color'}
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => navigate({ to: '/colors' })}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </CrudPageLayout>
  )
}
