import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils/cv';

export interface BrandCardProps {
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
 * BrandCard Component
 *
 * Displays a brand with logo (96×96px) and name
 * Optimized for homepage grid layout
 */
export const BrandCard = ({
  className,
  href,
  logoAlt,
  logoHeight,
  logoUrl,
  logoWidth,
  name,
}: BrandCardProps) => {
  // Fallback for missing logo - use brand initial
  const brandInitial = name.charAt(0).toUpperCase();

  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col items-center gap-3 rounded-2xl bg-gunmetal-50 p-4 transition-all duration-300',
        ' hover:bg-gunmetal-100',
        'focus-visible:ring-2 focus-visible:ring-cadet-grey focus-visible:ring-offset-2 focus-visible:outline-none ',
        className,
      )}
    >
      <div className="overflow-hiddenp-3 flex size-24 items-center justify-center">
        {logoUrl ? (
          <Image
            alt={logoAlt || `${name} logo`}
            className="h-full w-full object-contain"
            height={logoHeight || 96}
            loading="lazy"
            src={logoUrl}
            width={logoWidth || 96}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-4xl font-bold text-gray-400">
            {brandInitial}
          </div>
        )}
      </div>

      <h3 className="text-center text-sm font-semibold text-gray-900 group-hover:text-primary">
        {name}
      </h3>
    </Link>
  );
};
