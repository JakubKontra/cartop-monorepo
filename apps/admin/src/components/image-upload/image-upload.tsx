'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { StorageImage } from '@/components/storage-image'
import { type UploadResult } from '@/lib/upload/upload-service'
import { useFileUpload } from '@/lib/upload/use-file-upload'
import { logger } from '@/lib/logger'

interface ImageUploadProps {
  /** Current image URL (for preview) */
  value?: string
  /** Current file ID */
  fileId?: string
  /** Callback when upload completes */
  onUploadComplete?: (result: UploadResult) => void
  /** Callback when image is removed */
  onRemove?: () => void
  /** Maximum file size in bytes (default: 5MB) */
  maxSize?: number
  /** Accepted file types */
  accept?: Record<string, string[]>
  /** Whether the upload is disabled */
  disabled?: boolean
  /** Custom className */
  className?: string
}

export function ImageUpload({
  value,
  fileId: _fileId,
  onUploadComplete,
  onRemove,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/svg+xml': ['.svg'],
  },
  disabled = false,
  className,
}: ImageUploadProps) {
  // All hooks must be called at the top level in the same order
  const { upload, uploading, progress, error, resetError } = useFileUpload()
  const [localError, setLocalError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      const file = acceptedFiles[0]
      resetError()
      setLocalError(null) // Clear local errors too

      try {
        const result = await upload(file)
        onUploadComplete?.(result)
      } catch (err) {
        logger.error('Upload error in image upload component', err)
        // Error is already tracked in the hook
      }
    },
    [upload, onUploadComplete, resetError]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    disabled: disabled || uploading,
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0]
      if (rejection?.errors[0]?.code === 'file-too-large') {
        setLocalError(`File is too large. Maximum size is ${maxSize / 1024 / 1024}MB`)
      } else if (rejection?.errors[0]?.code === 'file-invalid-type') {
        setLocalError('Invalid file type. Please upload an image file.')
      } else {
        setLocalError('Failed to upload file')
      }
    },
  })

  // Combined error (local validation or upload error)
  const displayError = localError || error

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove?.()
  }

  // If we have an uploaded image, show preview
  if (value) {
    return (
      <div className={cn('relative', className)}>
        <div className='relative overflow-hidden rounded-lg border border-input bg-background'>
          <StorageImage
            src={value}
            alt='Uploaded'
            className='h-48 w-full object-contain'
          />
          {!disabled && (
            <Button
              type='button'
              variant='destructive'
              size='icon'
              className='absolute right-2 top-2'
              onClick={handleRemove}
            >
              <X className='h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors',
          isDragActive && 'border-primary bg-primary/5',
          !isDragActive && 'border-input hover:border-primary/50',
          (disabled || uploading) && 'cursor-not-allowed opacity-50',
          displayError && 'border-destructive'
        )}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className='flex w-full flex-col items-center gap-4'>
            <Loader2 className='h-10 w-10 animate-spin text-primary' />
            <div className='w-full max-w-xs'>
              <Progress value={progress} className='h-2' />
            </div>
            <p className='text-sm text-muted-foreground'>
              Uploading... {progress}%
            </p>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-2 text-center'>
            {isDragActive ? (
              <>
                <Upload className='h-10 w-10 text-primary' />
                <p className='text-sm font-medium text-primary'>
                  Drop the image here
                </p>
              </>
            ) : (
              <>
                <ImageIcon className='h-10 w-10 text-muted-foreground' />
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium'>
                    Drag & drop an image, or click to browse
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Supports: JPG, PNG, WebP, SVG (max {maxSize / 1024 / 1024}MB)
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {displayError && (
        <p className='mt-2 text-sm text-destructive'>{displayError}</p>
      )}
    </div>
  )
}
