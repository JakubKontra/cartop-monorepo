import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface StorageImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image path/URL - if relative, will be prefixed with storage URL */
  src?: string
  /** Fallback image to show if src fails to load */
  fallback?: string
}

/**
 * Storage Image Component
 *
 * Automatically prefixes relative image paths with the MinIO/S3 storage URL.
 * Handles both absolute URLs (http://, https://) and relative paths.
 *
 * @example
 * ```tsx
 * // Relative path - will be prefixed with VITE_STORAGE_URL
 * <StorageImage src="/uploads/logo.png" alt="Logo" />
 *
 * // Absolute URL - used as-is
 * <StorageImage src="https://cdn.example.com/logo.png" alt="Logo" />
 * ```
 */
export function StorageImage({
  src,
  fallback = '/placeholder.svg',
  className,
  alt = '',
  ...props
}: StorageImageProps) {
  // Memoize the URL transformation to prevent recalculation on every render
  const imageUrl = useMemo(() => {
    if (!src) return fallback

    // If it's already an absolute URL, return as-is
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src
    }

    // Get storage URL from environment (MinIO/S3)
    const storageUrl = import.meta.env.VITE_STORAGE_URL || 'http://localhost:1483/pangea'

    // Remove leading slash from path if present (to avoid double slashes)
    const cleanPath = src.startsWith('/') ? src.slice(1) : src

    return `${storageUrl}/${cleanPath}`
  }, [src, fallback])

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={cn(className)}
      onError={(e) => {
        // Prevent infinite loop - only set fallback once
        const currentSrc = e.currentTarget.src
        if (fallback && currentSrc !== fallback && !e.currentTarget.dataset.fallbackAttempted) {
          e.currentTarget.dataset.fallbackAttempted = 'true'
          e.currentTarget.src = fallback
        }
      }}
      {...props}
    />
  )
}
