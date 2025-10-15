# GraphQL Error Handling Guide

This guide explains how to properly handle GraphQL errors in the admin application.

## Table of Contents

- [Overview](#overview)
- [Error Structure](#error-structure)
- [Using useMutationWithErrorHandling](#using-usemutationwitherrorhandling)
- [Manual Error Extraction](#manual-error-extraction)
- [Common Error Patterns](#common-error-patterns)
- [Best Practices](#best-practices)

## Overview

The backend returns errors in a nested structure with actual error messages in `extensions.errors[].message`. We provide utilities to automatically extract and display these messages to users.

## Error Structure

GraphQL errors from our backend have this structure:

```json
{
  "errors": [
    {
      "message": "Internal server error",
      "path": ["deleteCatalogBrand"],
      "extensions": {
        "key": "INTERNAL_SERVER_ERROR",
        "code": 500,
        "errors": [
          {
            "message": "update or delete on table \"catalog_brands\" violates foreign key constraint..."
          }
        ]
      }
    }
  ]
}
```

The **actual useful error message** is in `extensions.errors[0].message`, not in the top-level `message` field.

## Using useMutationWithErrorHandling

The recommended way to handle mutations is using our custom hook that automatically extracts and displays errors.

### Basic Usage

```tsx
import { useMutationWithErrorHandling } from '@/hooks/use-mutation-with-error-handling'
import { CREATE_CATALOG_BRAND, GET_ALL_CATALOG_BRANDS } from '../brands.graphql'

function BrandCreateForm() {
  const [createBrand, { loading }] = useMutationWithErrorHandling(
    CREATE_CATALOG_BRAND,
    {
      successMessage: 'Brand created successfully',
      refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS }],
    }
  )

  const handleSubmit = async (values: BrandFormValues) => {
    // No need for try/catch - errors are handled automatically
    await createBrand({
      variables: { input: values },
    })

    // This only runs if mutation succeeds
    navigate('/brands')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  )
}
```

### Dynamic Success Messages

```tsx
const [createBrand, { loading }] = useMutationWithErrorHandling(
  CREATE_CATALOG_BRAND,
  {
    successMessage: (data) => `Brand "${data.createCatalogBrand.name}" created successfully`,
    refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS }],
  }
)
```

### Custom Error Messages

```tsx
const [deleteBrand, { loading }] = useMutationWithErrorHandling(
  DELETE_CATALOG_BRAND,
  {
    successMessage: 'Brand deleted successfully',
    errorMessage: (error) => {
      const msg = extractGraphQLErrorMessage(error)

      // Customize error messages based on error type
      if (msg.includes('foreign key constraint')) {
        return 'Cannot delete: This brand is being used by offers'
      }
      if (msg.includes('Insufficient permissions')) {
        return 'You do not have permission to delete brands'
      }

      return msg // Default: show extracted message
    },
    refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS }],
  }
)
```

### Silent Operations (No Toasts)

```tsx
const [updateBrand, { loading }] = useMutationWithErrorHandling(
  UPDATE_CATALOG_BRAND,
  {
    showSuccessToast: false, // Don't show success toast
    showErrorToast: false,   // Don't show error toast
    onSuccessCallback: (data) => {
      // Handle success programmatically
      console.log('Updated:', data)
    },
    onErrorCallback: (error) => {
      // Handle errors programmatically
      console.error('Failed:', error)
    },
  }
)
```

### With Error Context Logging

```tsx
const [createBrand, { loading }] = useMutationWithErrorHandling(
  CREATE_CATALOG_BRAND,
  {
    successMessage: 'Brand created',
    errorContext: {
      feature: 'brands',
      action: 'create',
      userId: currentUser.id,
    },
  }
)
```

## Manual Error Extraction

For cases where you need to handle errors manually (like bulk operations), use the error extraction utilities:

```tsx
import { extractGraphQLErrorMessage, extractAllGraphQLErrorMessages } from '@/lib/extract-graphql-error'

// Single error message
try {
  await deleteBrand({ variables: { id: brandId } })
} catch (error) {
  const message = extractGraphQLErrorMessage(error)
  toast.error(message) // Shows: "update or delete violates foreign key constraint..."
}

// Multiple error messages
try {
  await updateBrand({ variables: { id, input } })
} catch (error) {
  const messages = extractAllGraphQLErrorMessages(error)
  messages.forEach((msg) => toast.error(msg))
}
```

## Common Error Patterns

### Bulk Delete with Partial Success

```tsx
const [deleteBrand] = useMutationWithErrorHandling(DELETE_CATALOG_BRAND, {
  showSuccessToast: false, // We'll handle toasts manually
  showErrorToast: false,
})

const handleBulkDelete = async (brandIds: string[]) => {
  // Use Promise.allSettled to collect all results
  const results = await Promise.allSettled(
    brandIds.map((id) => deleteBrand({ variables: { id } }))
  )

  const successes = results.filter((r) => r.status === 'fulfilled').length
  const failures = results.filter((r) => r.status === 'rejected').length

  if (failures === 0) {
    toast.success(`Deleted ${successes} brands`)
  } else if (successes === 0) {
    const firstError = results.find((r) => r.status === 'rejected') as PromiseRejectedResult
    const errorMessage = extractGraphQLErrorMessage(firstError.reason)
    toast.error(`Failed to delete brands: ${errorMessage}`)
  } else {
    toast.warning(
      `Deleted ${successes} brands, but ${failures} failed`
    )
  }
}
```

### Foreign Key Constraint Errors

```tsx
const [deleteBrand] = useMutationWithErrorHandling(DELETE_CATALOG_BRAND, {
  errorMessage: (error) => {
    const msg = extractGraphQLErrorMessage(error)

    if (msg.includes('foreign key constraint')) {
      // Extract table name from error if possible
      const match = msg.match(/on table "(\w+)"/)
      const table = match ? match[1] : 'related records'

      return `Cannot delete: This brand is referenced by ${table}. Please remove those first.`
    }

    return msg
  },
})
```

### Permission Errors

```tsx
const [updateBrand] = useMutationWithErrorHandling(UPDATE_CATALOG_BRAND, {
  errorMessage: (error) => {
    const msg = extractGraphQLErrorMessage(error)

    if (msg.includes('Insufficient permissions')) {
      // Extract required roles from message
      const match = msg.match(/Required roles: ([^.]+)/)
      const roles = match ? match[1] : 'higher permissions'

      return `You need ${roles} to perform this action`
    }

    return msg
  },
})
```

### Validation Errors

```tsx
const [createBrand] = useMutationWithErrorHandling(CREATE_CATALOG_BRAND, {
  errorMessage: (error) => {
    const msg = extractGraphQLErrorMessage(error)

    if (msg.includes('duplicate key')) {
      return 'A brand with this name already exists'
    }
    if (msg.includes('invalid')) {
      return 'Please check your input and try again'
    }

    return msg
  },
})
```

## Best Practices

### 1. Always Use the Hook for Mutations

✅ **Good:**
```tsx
const [createBrand] = useMutationWithErrorHandling(CREATE_CATALOG_BRAND, {
  successMessage: 'Brand created',
})
```

❌ **Bad:**
```tsx
const [createBrand] = useMutation(CREATE_CATALOG_BRAND)

try {
  await createBrand(...)
} catch (error) {
  toast.error(error.message) // Won't show the actual error!
}
```

### 2. Provide User-Friendly Error Messages

✅ **Good:**
```tsx
errorMessage: (error) => {
  const msg = extractGraphQLErrorMessage(error)
  if (msg.includes('foreign key')) {
    return 'Cannot delete: Brand is in use'
  }
  return msg
}
```

❌ **Bad:**
```tsx
errorMessage: 'Something went wrong' // Too generic
```

### 3. Log Errors with Context

✅ **Good:**
```tsx
const [createBrand] = useMutationWithErrorHandling(CREATE_CATALOG_BRAND, {
  errorContext: {
    feature: 'brands',
    action: 'create',
    userId: user.id,
  },
})
```

### 4. Handle Bulk Operations Properly

✅ **Good:**
```tsx
// Use Promise.allSettled to collect all results
const results = await Promise.allSettled(deletePromises)

// Show meaningful feedback
const successes = results.filter((r) => r.status === 'fulfilled').length
const failures = results.filter((r) => r.status === 'rejected').length

if (failures > 0 && successes > 0) {
  toast.warning(`Deleted ${successes}, but ${failures} failed`)
}
```

❌ **Bad:**
```tsx
// Using Promise.all fails on first error
await Promise.all(deletePromises) // Stops at first failure!
```

### 5. Don't Swallow Errors

✅ **Good:**
```tsx
try {
  await deleteBrand({ variables: { id } })
  onSuccess()
} catch (error) {
  // Error is already shown via toast
  // But we can add extra handling if needed
  onError()
}
```

❌ **Bad:**
```tsx
try {
  await deleteBrand({ variables: { id } })
} catch (error) {
  // Silent failure - user sees nothing!
}
```

## Testing Error Handling

You can test error handling by simulating errors:

```tsx
import { ApolloError } from '@apollo/client'

// In your test
const mockError = new ApolloError({
  graphQLErrors: [{
    message: 'Internal server error',
    extensions: {
      errors: [{ message: 'Test error message' }]
    }
  }]
})

const extracted = extractGraphQLErrorMessage(mockError)
expect(extracted).toBe('Test error message')
```

## Migration Guide

To migrate existing mutations to use the new error handling:

**Before:**
```tsx
const [createBrand] = useMutation(CREATE_CATALOG_BRAND, {
  refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS }],
})

const handleSubmit = async (values) => {
  try {
    await createBrand({ variables: { input: values } })
    toast.success('Brand created')
    navigate('/brands')
  } catch (error) {
    toast.error(error.message)
  }
}
```

**After:**
```tsx
const [createBrand] = useMutationWithErrorHandling(CREATE_CATALOG_BRAND, {
  successMessage: 'Brand created',
  refetchQueries: [{ query: GET_ALL_CATALOG_BRANDS }],
})

const handleSubmit = async (values) => {
  await createBrand({ variables: { input: values } })
  navigate('/brands')
}
```

Much simpler and more reliable!
