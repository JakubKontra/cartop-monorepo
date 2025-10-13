import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/utils/cv';

export interface BrandCardProps {
  /** Brand name */
  name: string;
  /** Brand URL slug */
  href: string;
  /** Logo URL */
  logoUrl?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Logo width (for optimization) */
  logoWidth?: number;
  /** Logo height (for optimization) */
  logoHeight?: number;
  /** Additional CSS classes */
  className?: string;
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
        'group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300',
        'hover:scale-105 hover:border-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className,
      )}
    >
      <div className="flex size-24 items-center justify-center overflow-hiddenp-3">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={logoAlt || `${name} logo`}
            width={logoWidth || 96}
            height={logoHeight || 96}
            className="h-full w-full object-contain"
            loading="lazy"
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
