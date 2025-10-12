# Admin CRUD Guidelines

Comprehensive guide for creating consistent CRUD features in the admin application.

## Table of Contents
- [File Structure](#file-structure)
- [GraphQL and Type System](#graphql-and-type-system)
- [Create/Edit Pages](#createedit-pages)
- [Form Components](#form-components)
- [List Page (Table)](#list-page-table)
- [Routing](#routing)
- [Quick Start Checklist](#quick-start-checklist)
- [Claude Code Templates](#claude-code-templates)

---

## File Structure

```
apps/admin/src/
├── features/
│   └── {entity-name}/                    # e.g., brands, leasing-companies
│       ├── components/
│       │   ├── {entity}-form.tsx         # Form component
│       │   ├── {entity}-table.tsx        # Table component
│       │   ├── {entity}-columns.tsx      # Table column definitions
│       │   ├── {entity}-provider.tsx     # Context provider
│       │   ├── {entity}-dialogs.tsx      # Delete/action dialogs
│       │   ├── {entity}-primary-buttons.tsx
│       │   ├── data-table-row-actions.tsx
│       │   └── data-table-bulk-actions.tsx
│       ├── pages/
│       │   ├── {entity}-create-page.tsx  # Create page (standalone!)
│       │   └── {entity}-edit-page.tsx    # Edit page (standalone!)
│       ├── data/
│       │   └── schema.ts                 # Zod validation schema
│       ├── types/
│       │   └── index.ts                  # Type exports (from GraphQL!)
│       ├── {entity}.graphql.ts           # GraphQL queries/mutations
│       └── index.tsx                     # Main list page
└── routes/
    └── _authenticated/
        └── {entity-name}/
            ├── index.tsx                 # Route for list page
            ├── new.tsx                   # Route for create page
            └── $id/
                └── edit.tsx              # Route for edit page
```

### Naming Conventions
- **Files**: kebab-case (e.g., `leasing-company-form.tsx`)
- **Components**: PascalCase (e.g., `LeasingCompanyForm`)
- **Variables**: camelCase (e.g., `leasingCompany`)
- **GraphQL**: UPPER_SNAKE_CASE (e.g., `GET_ALL_LEASING_COMPANIES`)

---

## GraphQL and Type System

### ⚠️ CRITICAL RULE: Always Use GraphQL Codegen Types!

**NEVER** create custom TypeScript interfaces for entities that come from GraphQL. Always use the generated types from `@/gql/graphql`.

### Correct Pattern ✅

There are two ways to extract types from GraphQL queries:

#### Option 1: Array Index Access (for arrays)
```typescript
// types/index.ts
import { GetAllLeasingCompaniesQuery } from '@/gql/graphql'

// Extract type from array in query result using [0]
export type LeasingCompany = GetAllLeasingCompaniesQuery['leasingCompanies'][0]

export interface LeasingCompaniesContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  currentRow: LeasingCompany | null
  setCurrentRow: (row: LeasingCompany | null) => void
}
```

#### Option 2: Array Number Access (alternative syntax)
```typescript
// types/index.ts
import { GetAllUsersQuery } from '@/gql/graphql'

// Extract type from array using [number]
export type User = GetAllUsersQuery['users'][number]

export interface UsersContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  currentRow: User | null
  setCurrentRow: (row: User | null) => void
}
```

**Both patterns work identically** - use whichever you prefer. The key is to extract the type from the GraphQL query result.

### Real Examples from Codebase ✅

```typescript
// Brands
import { GetAllCatalogBrandsQuery } from '@/gql/graphql'
export type Brand = GetAllCatalogBrandsQuery['allCatalogBrands'][0]

// Models
import { GetAllCatalogModelsQuery } from '@/gql/graphql'
export type Model = GetAllCatalogModelsQuery['allCatalogModels'][0]

// Generations
import { GetAllCatalogModelGenerationsQuery } from '@/gql/graphql'
export type Generation = GetAllCatalogModelGenerationsQuery['catalogModelGenerations'][0]

// Leasing Companies
import { GetAllLeasingCompaniesQuery } from '@/gql/graphql'
export type LeasingCompany = GetAllLeasingCompaniesQuery['leasingCompanies'][0]
```

### Wrong Pattern ❌ (Don't Do This!)

```typescript
// DON'T create custom interfaces for GraphQL entities!
export interface Brand {
  id: string
  name: string
  slug: string
  description?: string | null
  isActive: boolean
  // ... this duplicates GraphQL types and will get out of sync!
}
```

**Why this is wrong:**
- Duplicates types that already exist in generated code
- Will get out of sync when GraphQL schema changes
- Requires manual updates when fields are added/removed
- No type safety between frontend and backend

### GraphQL Queries Definition

```typescript
// {entity}.graphql.ts
import { graphql } from '@/gql'

/**
 * Get All Entities Query
 */
export const GET_ALL_ENTITIES = graphql(`
  query GetAllEntities($limit: Float, $offset: Float) {
    allEntities(limit: $limit, offset: $offset) {
      id
      name
      slug
      # ... all fields you need
      createdAt
      updatedAt
    }
  }
`)

/**
 * Get Single Entity Query
 */
export const GET_ENTITY = graphql(`
  query GetEntity($id: String!) {
    entity(id: $id) {
      id
      name
      slug
      # ... all fields
    }
  }
`)

/**
 * Create Entity Mutation
 */
export const CREATE_ENTITY = graphql(`
  mutation CreateEntity($input: CreateEntityInput!) {
    createEntity(input: $input) {
      id
      name
      slug
      # ... return created fields
    }
  }
`)

/**
 * Update Entity Mutation
 */
export const UPDATE_ENTITY = graphql(`
  mutation UpdateEntity($id: String!, $input: UpdateEntityInput!) {
    updateEntity(id: $id, input: $input) {
      id
      name
      slug
      # ... return updated fields
    }
  }
`)

/**
 * Delete Entity Mutation
 */
export const DELETE_ENTITY = graphql(`
  mutation DeleteEntity($id: String!) {
    deleteEntity(id: $id)
  }
`)

/**
 * Check Slug Uniqueness (optional, for entities with slugs)
 */
export const CHECK_ENTITY_SLUG = graphql(`
  query CheckEntitySlug($slug: String!) {
    entityBySlug(slug: $slug) {
      id
      slug
    }
  }
`)
```

### Type Usage in Components

```typescript
// In table/list components
import { GET_ALL_ENTITIES } from '../{entity}.graphql'
import { type Entity } from '../types'

const { data } = useQuery(GET_ALL_ENTITIES)
const entities: Entity[] = data?.allEntities || []
```

---

## Create/Edit Pages

### ⚠️ IMPORTANT: Standalone Pages, NOT Dialogs!

Create and Edit pages **MUST** be standalone full pages using `CrudPageLayout`, not dialogs.

### Edit Page Pattern

```typescript
'use client'

import { useQuery, useMutation } from '@apollo/client/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { EntityForm } from '../components/entity-form'
import { type EntityFormValues } from '../data/schema'
import { GET_ENTITY, UPDATE_ENTITY, GET_ALL_ENTITIES } from '../{entity}.graphql'

export function EntityEditPage() {
  const navigate = useNavigate()
  const { entityId } = useParams({ from: '/_authenticated/{entity}/$entityId/edit' })

  const { data, loading, error } = useQuery(GET_ENTITY, {
    variables: { id: entityId },
  })

  const [updateEntity, { loading: updating }] = useMutation(UPDATE_ENTITY, {
    refetchQueries: [{ query: GET_ALL_ENTITIES, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: EntityFormValues) => {
    try {
      await updateEntity({
        variables: {
          id: entityId,
          input: {
            name: values.name,
            // ... map form values to GraphQL input
          },
        },
      })
      toast.success('Entity updated successfully')
      navigate({ to: '/{entity}' })
    } catch (error: any) {
      console.error('Entity update error:', error)
      toast.error(error.message || 'Failed to update entity')
    }
  }

  const handleCancel = () => {
    navigate({ to: '/{entity}' })
  }

  const entity = data?.entity

  return (
    <CrudPageLayout
      title="Edit Entity"
      description={entity ? `Update ${entity.name} information` : undefined}
      backUrl="/{entity}"
      loading={loading}
      loadingMessage="Loading entity..."
      error={error || (!entity ? new Error('Entity not found') : null)}
      errorMessage={error?.message || 'Entity not found'}
      backButtonLabel="Back to Entities"
    >
      {entity && (
        <EntityForm
          isEdit={true}
          loading={updating}
          defaultValues={{
            name: entity.name,
            // ... map entity to form values
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </CrudPageLayout>
  )
}
```

### Create Page Pattern

```typescript
'use client'

import { useMutation } from '@apollo/client/react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { CrudPageLayout } from '@/components/crud-page-layout'
import { EntityForm } from '../components/entity-form'
import { type EntityFormValues } from '../data/schema'
import { CREATE_ENTITY, GET_ALL_ENTITIES } from '../{entity}.graphql'

export function EntityCreatePage() {
  const navigate = useNavigate()

  const [createEntity, { loading }] = useMutation(CREATE_ENTITY, {
    refetchQueries: [{ query: GET_ALL_ENTITIES, variables: { limit: 1000, offset: 0 } }],
  })

  const handleSubmit = async (values: EntityFormValues) => {
    try {
      await createEntity({
        variables: {
          input: {
            name: values.name,
            // ... map form values to GraphQL input
          },
        },
      })
      toast.success('Entity created successfully')
      navigate({ to: '/{entity}' })
    } catch (error: any) {
      console.error('Entity creation error:', error)
      toast.error(error.message || 'Failed to create entity')
    }
  }

  const handleCancel = () => {
    navigate({ to: '/{entity}' })
  }

  return (
    <CrudPageLayout
      title="Create Entity"
      description="Add a new entity to your catalog"
      backUrl="/{entity}"
      backButtonLabel="Back to Entities"
    >
      <EntityForm
        isEdit={false}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </CrudPageLayout>
  )
}
```

### CrudPageLayout Props

```typescript
<CrudPageLayout
  title="Page Title"                    // Required: Page heading
  description="Subtitle"                // Optional: Page description
  backUrl="/list-page"                  // Required: Navigation URL
  loading={loading}                     // Optional: Show loading spinner
  loadingMessage="Loading..."           // Optional: Loading message
  error={error}                         // Optional: Error object
  errorMessage="Custom error"           // Optional: Error message override
  backButtonLabel="Back"                // Optional: Back button text
  maxWidth="max-w-3xl"                  // Optional: Content max width (default: max-w-3xl)
>
  {/* Form or content */}
</CrudPageLayout>
```

---

## Form Components

### Form Component Pattern

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLazyQuery } from '@apollo/client/react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SlugInput } from '@/components/slug-input'
import { entitySchema, type EntityFormValues } from '../data/schema'
import { CHECK_ENTITY_SLUG } from '../{entity}.graphql'
import { Loader2 } from 'lucide-react'

interface EntityFormProps {
  /** Initial values for the form (for editing) */
  defaultValues?: Partial<EntityFormValues>
  /** Whether this is an edit form */
  isEdit?: boolean
  /** Loading state */
  loading?: boolean
  /** Submit handler */
  onSubmit: (values: EntityFormValues) => void | Promise<void>
  /** Cancel handler */
  onCancel: () => void
}

export function EntityForm({
  defaultValues,
  isEdit = false,
  loading = false,
  onSubmit,
  onCancel,
}: EntityFormProps) {
  const [checkSlug] = useLazyQuery(CHECK_ENTITY_SLUG)

  const form = useForm<EntityFormValues>({
    resolver: zodResolver(entitySchema),
    defaultValues: defaultValues || {
      name: '',
      slug: '',
      // ... default values
    },
  })

  const validateSlugUniqueness = async (slug: string): Promise<boolean> => {
    if (!slug) return true

    try {
      const { data } = await checkSlug({ variables: { slug } })
      if (data?.entityBySlug) {
        return false // Slug is already taken
      }
      return true // Slug is available
    } catch (error) {
      return true // If query errors, slug is available
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Basic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the entity details
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Entity Name' autoComplete='off' {...field} />
                  </FormControl>
                  <FormDescription>
                    The display name of the entity
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug field (if entity uses slugs) */}
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Slug <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <SlugInput
                      deriveFrom='name'
                      placeholder='entity-name'
                      onValidateUnique={validateSlugUniqueness}
                      initialSlug={defaultValues?.slug}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL-friendly identifier (auto-generated from name)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other fields... */}
          </CardContent>
        </Card>

        {/* Additional sections as needed */}

        {/* Form Actions */}
        <div className='flex items-center justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={loading}>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isEdit ? 'Update Entity' : 'Create Entity'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

### Zod Schema (data/schema.ts)

**Note**: Zod schemas are ONLY for form validation, NOT for entity types!

```typescript
import { z } from 'zod'

export const entitySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().optional(),
  isActive: z.boolean(),
  // ... other form fields
})

export type EntityFormValues = z.infer<typeof entitySchema>
```

---

## List Page (Table)

### Main List Page (index.tsx)

```typescript
'use client'

import { EntitiesProvider } from './components/entities-provider'
import { EntitiesTable } from './components/entities-table'
import { EntitiesDialogs } from './components/entities-dialogs'
import { EntitiesPrimaryButtons } from './components/entities-primary-buttons'

export default function EntitiesPage() {
  return (
    <EntitiesProvider>
      <div className='flex h-full flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>Entities</h1>
            <p className='text-muted-foreground'>
              Manage entities across your catalog
            </p>
          </div>
          <EntitiesPrimaryButtons />
        </div>
        <EntitiesTable />
        <EntitiesDialogs />
      </div>
    </EntitiesProvider>
  )
}
```

### Table Columns Definition

```typescript
import { type ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { type Entity } from '../types'
import { DataTableRowActions } from './data-table-row-actions'
import { CheckCircle2, Circle } from 'lucide-react'

export const entitiesColumns: ColumnDef<Entity>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn('sticky md:table-cell start-0 z-10 rounded-tl-[inherit]'),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36 ps-3 font-medium'>{row.getValue('name')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  // ... more columns
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
```

### Table Component

```typescript
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { useReactTable, getCoreRowModel, /* ... other imports */ } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DataTablePagination, DataTableToolbar } from '@/components/data-table'
import { GET_ALL_ENTITIES } from '../{entity}.graphql'
import { type Entity } from '../types'
import { entitiesColumns as columns } from './entities-columns'
import { Loader2 } from 'lucide-react'

export function EntitiesTable() {
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const { data, loading, error, refetch } = useQuery(GET_ALL_ENTITIES, {
    variables: { limit: 1000, offset: 0 },
  })

  const entities: Entity[] = data?.allEntities || []

  const table = useReactTable({
    data: entities,
    columns,
    state: { pagination, rowSelection },
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // ... other table features
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  if (loading && entities.length === 0) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-destructive'>Error loading entities: {error.message}</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        searchPlaceholder='Filter entities...'
        searchKey='name'
        filters={[
          // ... filter configuration
        ]}
      />
      <div className='overflow-hidden rounded-md border'>
        <Table>
          {/* Table implementation */}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
```

---

## Routing

### TanStack Router Structure

```typescript
// routes/_authenticated/{entity}/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import EntitiesPage from '@/features/{entity}'

export const Route = createFileRoute('/_authenticated/{entity}/')({
  component: EntitiesPage,
})
```

```typescript
// routes/_authenticated/{entity}/new.tsx
import { createFileRoute } from '@tanstack/react-router'
import { EntityCreatePage } from '@/features/{entity}/pages/entity-create-page'

export const Route = createFileRoute('/_authenticated/{entity}/new')({
  component: EntityCreatePage,
})
```

```typescript
// routes/_authenticated/{entity}/$entityId/edit.tsx
import { createFileRoute } from '@tanstack/react-router'
import { EntityEditPage } from '@/features/{entity}/pages/entity-edit-page'

export const Route = createFileRoute('/_authenticated/{entity}/$entityId/edit')({
  component: EntityEditPage,
})
```

### Route Paths
- List: `/{entity}`
- Create: `/{entity}/new`
- Edit: `/{entity}/$entityId/edit`

---

## Quick Start Checklist

When creating a new CRUD feature:

### 1. Backend/GraphQL First
- [ ] Create backend entity and resolvers
- [ ] Run GraphQL codegen to generate types
- [ ] Verify types exist in `apps/admin/src/gql/graphql.ts`

### 2. Feature Structure
- [ ] Create `features/{entity}/` directory
- [ ] Create subdirectories: `components/`, `pages/`, `data/`, `types/`

### 3. GraphQL Queries
- [ ] Create `{entity}.graphql.ts` with:
  - [ ] GET_ALL_{ENTITY} query
  - [ ] GET_{ENTITY} query
  - [ ] CREATE_{ENTITY} mutation
  - [ ] UPDATE_{ENTITY} mutation
  - [ ] DELETE_{ENTITY} mutation
  - [ ] CHECK_{ENTITY}_SLUG query (if applicable)

### 4. Types
- [ ] Create `types/index.ts`
- [ ] Import and extract types from generated GraphQL types
- [ ] **DO NOT create custom entity interfaces!**

### 5. Form Schema
- [ ] Create `data/schema.ts` with Zod schema
- [ ] Schema is ONLY for form validation

### 6. Pages
- [ ] Create `pages/{entity}-create-page.tsx` using CrudPageLayout
- [ ] Create `pages/{entity}-edit-page.tsx` using CrudPageLayout
- [ ] Both must be standalone pages, not dialogs

### 7. Form Component
- [ ] Create `components/{entity}-form.tsx`
- [ ] Use Card sections for organization
- [ ] Implement SlugInput if entity has slugs

### 8. Table Components
- [ ] Create `components/{entity}-table.tsx`
- [ ] Create `components/{entity}-columns.tsx`
- [ ] Create `components/{entity}-provider.tsx`
- [ ] Create `components/data-table-row-actions.tsx`
- [ ] Create `components/data-table-bulk-actions.tsx`

### 9. Main Page
- [ ] Create `index.tsx` with list page layout

### 10. Routes
- [ ] Create route files in `routes/_authenticated/{entity}/`
- [ ] Verify navigation works

---

## Claude Code Templates

### Template Prompt for Creating New CRUD

```
Create a complete CRUD feature for {ENTITY_NAME} with the following requirements:

1. **IMPORTANT**: Use GraphQL Codegen types from @/gql/graphql - DO NOT create custom entity interfaces
2. Create standalone Create/Edit pages using CrudPageLayout (NOT dialogs)
3. Follow the structure from leasing-companies feature as reference
4. Include all GraphQL queries and mutations
5. Use proper error handling with try-catch and toast notifications

Entity details:
- Name: {ENTITY_NAME}
- Plural: {ENTITY_PLURAL}
- Has slug: {yes/no}
- Key fields: {field1, field2, field3}

Please create:
- All necessary files following ADMIN-CRUD-GUIDELINES.md
- GraphQL queries/mutations
- Form component with validation
- Create and Edit pages
- Table with columns
- Routing configuration
```

### Example Commands

**"Create CRUD for Offers entity"**
```
Following ADMIN-CRUD-GUIDELINES.md, create a complete CRUD feature for "Offers" entity.
Use GraphQL Codegen types. Create standalone Create/Edit pages with CrudPageLayout.
Fields: title, description, price, isActive, validFrom, validUntil
Has slug: yes
```

**"Fix entity to use GraphQL types"**
```
Refactor the {entity} feature to use GraphQL Codegen types from @/gql/graphql.
Remove custom type interfaces and extract types from queries like leasing-companies does.
Update types/index.ts to follow the pattern: export type Entity = GetAllEntitiesQuery['entities'][0]
```

**"Convert dialogs to standalone pages"**
```
Convert {entity} Create/Edit dialogs to standalone pages using CrudPageLayout.
Follow the pattern from brands-create-page.tsx and brands-edit-page.tsx.
Ensure proper error handling and toast notifications.
```

---

## Best Practices

### Do's ✅
- Always use GraphQL Codegen types from `@/gql/graphql`
- Create standalone Create/Edit pages with CrudPageLayout
- Use try-catch for error handling in mutations
- Show toast notifications for success/error
- Use SlugInput for automatic slug generation
- Organize forms with Card sections
- Use proper TypeScript types throughout

### Don'ts ❌
- Don't create custom entity interfaces (use GraphQL types!)
- Don't use dialogs for Create/Edit pages
- Don't skip error handling
- Don't forget to refetch queries after mutations
- Don't forget toast notifications
- Don't duplicate entity types in multiple places

---

## Reference Examples

**Best Examples to Follow:**
- **Leasing Companies**: Perfect use of GraphQL Codegen types
- **Brands**: Good form structure and CrudPageLayout usage, now uses GraphQL types ✅
- **Models**: Complete CRUD with proper patterns, now uses GraphQL types ✅
- **Generations**: Complex forms with nested data, now uses GraphQL types ✅
- **Users**: Inline type extraction pattern in columns file

**Key Files to Reference:**
- `apps/admin/src/features/brands/types/index.ts` - ✅ Correct GraphQL type extraction
- `apps/admin/src/features/models/types/index.ts` - ✅ Correct GraphQL type extraction
- `apps/admin/src/features/generations/types/index.ts` - ✅ Correct GraphQL type extraction
- `apps/admin/src/features/leasing-companies/types/index.ts` - ✅ Perfect example
- `apps/admin/src/features/brands/components/brand-form.tsx` - Form patterns
- `apps/admin/src/features/brands/pages/brand-edit-page.tsx` - Edit page pattern
- `apps/admin/src/components/crud-page-layout.tsx` - Layout component

---

## Troubleshooting

### "Type doesn't exist in @/gql/graphql"
→ Run GraphQL codegen: `yarn codegen` or check if backend schema includes the entity

### "Slug validation not working"
→ Ensure CHECK_{ENTITY}_SLUG query is defined and used in SlugInput's onValidateUnique prop

### "Table not showing data"
→ Check GraphQL query variable names match what backend expects (limit/offset vs take/skip)

### "Form not submitting"
→ Verify Zod schema matches form fields and GraphQL input types

---

---

## Summary: Type System Rules

### ✅ ALWAYS DO:
1. Import query types from `@/gql/graphql`
2. Extract entity types using: `QueryName['fieldName'][0]` or `QueryName['fieldName'][number]`
3. Run `yarn codegen` after GraphQL schema changes
4. Use extracted types in all components, tables, and providers

### ❌ NEVER DO:
1. Create custom `interface` or `type` for GraphQL entities
2. Duplicate field definitions that exist in GraphQL schema
3. Manually define entity types with `id`, `name`, etc.

### 📝 Quick Type Extraction Pattern:
```typescript
// 1. Define the query in {entity}.graphql.ts
export const GET_ALL_ENTITIES = graphql(`
  query GetAllEntities {
    entities {
      id
      name
      # ... fields
    }
  }
`)

// 2. Extract type in types/index.ts
import { GetAllEntitiesQuery } from '@/gql/graphql'
export type Entity = GetAllEntitiesQuery['entities'][0]

// 3. Use everywhere
import { type Entity } from '../types'
const entities: Entity[] = data?.entities || []
```

---

**Last Updated**: 2025-01-12
**Version**: 1.1 (Updated with type extraction examples and refactored all features)
