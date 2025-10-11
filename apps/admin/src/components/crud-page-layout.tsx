'use client'

import { ArrowLeft, Loader2 } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type CrudPageLayoutProps = {
  /** Page title */
  title: string
  /** Page description/subtitle */
  description?: string
  /** URL to navigate back to */
  backUrl: string
  /** Loading state for data fetching */
  loading?: boolean
  /** Loading message when fetching data */
  loadingMessage?: string
  /** Error object from query */
  error?: Error | null
  /** Custom error message */
  errorMessage?: string
  /** Custom back button label */
  backButtonLabel?: string
  /** Children to render (typically a form) */
  children: React.ReactNode
  /** Custom max width for content (default: max-w-3xl) */
  maxWidth?: string
}

/**
 * CRUD Page Layout Component
 *
 * A reusable layout wrapper for create/edit pages with consistent structure:
 * - Back button with navigation
 * - Page header with title and description
 * - Loading state with spinner
 * - Error state with alert
 * - Content area with max-width container
 *
 * @example
 * ```tsx
 * <CrudPageLayout
 *   title="Edit Brand"
 *   description="Update BMW information"
 *   backUrl="/brands"
 *   loading={loading}
 *   error={error}
 * >
 *   <BrandForm {...props} />
 * </CrudPageLayout>
 * ```
 */
export function CrudPageLayout({
  title,
  description,
  backUrl,
  loading = false,
  loadingMessage,
  error = null,
  errorMessage,
  backButtonLabel = 'Back',
  children,
  maxWidth = 'max-w-3xl',
}: CrudPageLayoutProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate({ to: backUrl })
  }

  // Loading state
  if (loading) {
    return (
      <div className='flex h-full flex-1 items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
          {loadingMessage && (
            <p className='text-sm text-muted-foreground'>{loadingMessage}</p>
          )}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='flex h-full flex-1 flex-col gap-6 p-6'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleBack}
          >
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <h1 className='text-3xl font-bold'>{title}</h1>
        </div>
        <Alert variant='destructive'>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errorMessage || error.message || 'Something went wrong'}
          </AlertDescription>
        </Alert>
        <Button onClick={handleBack} className='w-fit'>
          {backButtonLabel}
        </Button>
      </div>
    )
  }

  // Success state - render content
  return (
    <div className='flex h-full flex-1 flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='icon'
            onClick={handleBack}
          >
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <div>
            <h1 className='text-3xl font-bold'>{title}</h1>
            {description && (
              <p className='text-muted-foreground'>{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-y-auto'>
        <div className={`mx-auto ${maxWidth}`}>
          {children}
        </div>
      </div>
    </div>
  )
}
