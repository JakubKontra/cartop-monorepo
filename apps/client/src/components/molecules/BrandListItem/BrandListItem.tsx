import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils/cv';

export interface BrandListItemProps {
  /** Additional CSS classes */
  className?: string;
  /** Brand URL slug */
  href: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Logo height (for optimization) */
  logoHeight?: number;
  /** Logo URL */
  logoUrl?: string;
  /** Logo width (for optimization) */
  logoWidth?: number;
  /** Brand name */
  name: string;
}

/**
 * BrandListItem Component
 *
 * Displays a brand in horizontal list format with 45×45px logo and name
 * Optimized for catalog page "all brands" section
 */
export const BrandListItem = ({
  className,
  href,
  logoAlt,
  logoHeight,
  logoUrl,
  logoWidth,
  name,
}: BrandListItemProps) => {
  // Fallback for missing logo - use brand initials
  const brandInitials = name.substring(0, 2).toUpperCase();

  return (
    <Link
      className={cn(
        'group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white pl-[20px] pr-[20px] transition-all duration-300',
        'hover:border-primary',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      href={href}
    >
      <div className="flex size-[45px] shrink-0 items-center justify-center overflow-hidden">
        {logoUrl ? (
          <Image
            alt={logoAlt || `${name} logo`}
            className="h-full w-full object-contain"
            height={logoHeight || 45}
            loading="lazy"
            src={logoUrl}
            width={logoWidth || 45}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm font-semibold text-gunmetal">
            {brandInitials}
          </div>
        )}
      </div>

      <h3 className="text-base font-normal leading-[160%] tracking-[0.01em] text-gunmetal transition-colors group-hover:text-primary">
        {name}
      </h3>
    </Link>
  );
};
