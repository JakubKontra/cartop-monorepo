import { StorageImage } from './storage-image'
import { cn } from '@/lib/utils'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

interface LogoTableCellProps {
  /** Image URL */
  url?: string | null
  /** Alt text for the image */
  alt: string
  /** Fallback text if no logo */
  fallbackText?: string
  /** Maximum size in pixels (default: 50) */
  maxSize?: number
  /** Aspect ratio: '1:1' (square) or '16:9' (wide) - default: '1:1' */
  aspectRatio?: '1:1' | '16:9'
  /** Enable hover preview (default: true) */
  showPreview?: boolean
  /** Preview size in pixels (default: 200) */
  previewSize?: number
  /** Custom className */
  className?: string
}

/**
 * Logo Table Cell Component
 *
 * Displays a logo in a table cell with consistent sizing and aspect ratio.
 * Hovering over the logo shows a larger preview in a popover.
 * Designed for data tables to keep logo sizes uniform.
 *
 * @example
 * ```tsx
 * // Square logo (1:1 aspect ratio) with hover preview
 * <LogoTableCell url={logo.url} alt={company.name} />
 *
 * // Wide logo (16:9 aspect ratio)
 * <LogoTableCell url={logo.url} alt={company.name} aspectRatio="16:9" />
 *
 * // Custom size with larger preview
 * <LogoTableCell url={logo.url} alt={company.name} maxSize={64} previewSize={300} />
 *
 * // Disable hover preview
 * <LogoTableCell url={logo.url} alt={company.name} showPreview={false} />
 * ```
 */
export function LogoTableCell({
  url,
  alt,
  fallbackText = 'No logo',
  maxSize = 50,
  aspectRatio = '1:1',
  showPreview = true,
  previewSize = 200,
  className,
}: LogoTableCellProps) {
  // If no URL, show fallback text
  if (!url) {
    return <span className='text-sm text-muted-foreground'>{fallbackText}</span>
  }

  // Calculate dimensions based on aspect ratio
  const dimensions = aspectRatio === '1:1'
    ? { width: maxSize, height: maxSize }
    : { width: maxSize * (16 / 9), height: maxSize }

  const logoElement = (
    <div
      className={cn('flex items-center justify-center', className)}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        minWidth: dimensions.width,
        minHeight: dimensions.height,
      }}
    >
      <StorageImage
        src={url}
        alt={alt}
        className='max-w-full max-h-full object-contain'
      />
    </div>
  )

  // If preview is disabled, return logo without hover card
  if (!showPreview) {
    return logoElement
  }

  // Wrap in hover card for preview
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <div className='cursor-pointer'>
          {logoElement}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className='w-auto p-2' side='right' align='center'>
        <div
          className='flex items-center justify-center bg-muted rounded-md'
          style={{
            width: previewSize,
            height: previewSize,
          }}
        >
          <StorageImage
            src={url}
            alt={`${alt} - Preview`}
            className='max-w-full max-h-full object-contain'
          />
        </div>
        {alt && (
          <p className='mt-2 text-xs text-center text-muted-foreground'>
            {alt}
          </p>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
