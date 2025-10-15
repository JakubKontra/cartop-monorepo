import type { ReactNode } from 'react';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/utils/cv';

export interface BreadcrumbItem {
  /** If true, hides the label text visually but keeps it for screen readers and JSON-LD */
  hideLabel?: boolean;
  /** The URL to link to. If omitted, the breadcrumb will be rendered as plain text */
  href?: string;
  /** Optional icon to display before the label */
  icon?: ReactNode;
  /** The text label to display for this breadcrumb */
  label?: string;
}

export interface BreadcrumbsProps {
  /** Base URL for generating absolute URLs in JSON-LD (e.g., 'https://example.com'). Defaults to NEXT_PUBLIC_SITE_URL from environment. */
  baseUrl?: string;
  /** Optional className for custom styling */
  className?: string;
  /** Array of breadcrumb items to display */
  items: BreadcrumbItem[];
  /** Optional separator element. Defaults to ChevronRight icon */
  separator?: ReactNode;
  /** Whether to include JSON-LD structured data for SEO */
  shouldIncludeJsonLd?: boolean;
}

/**
 * Generates JSON-LD structured data for breadcrumbs
 * @see https://schema.org/BreadcrumbList
 */
const generateBreadcrumbStructuredData = (items: BreadcrumbItem[], baseUrl: string) => {
  // Filter out items without labels (required for JSON-LD)
  const validItems = items.filter(item => item.label);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: validItems.map((item, index) => ({
      '@type': 'ListItem',
      name: item.label,
      position: index + 1,
      ...(item.href && { item: `${baseUrl}${item.href}` }),
    })),
  };

  return JSON.stringify(structuredData);
};

/**
 * Breadcrumbs component with JSON-LD structured data and ARIA support
 *
 * @example
 * ```tsx
 * import { Home } from 'lucide-react';
 *
 * // Uses NEXT_PUBLIC_SITE_URL from environment by default
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/', icon: <Home className="h-4 w-4" />, hideLabel: true },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Car Details' }
 *   ]}
 * />
 *
 * // Or override with custom baseUrl
 * <Breadcrumbs
 *   baseUrl="https://example.com"
 *   items={items}
 * />
 * ```
 */
export const Breadcrumbs = ({
  baseUrl = process.env.NEXT_PUBLIC_SITE_URL,
  className,
  items,
  separator,
  shouldIncludeJsonLd = true,
}: BreadcrumbsProps) => {
  // Generate JSON-LD structured data if enabled and baseUrl is available
  const breadcrumbStructuredData =
    shouldIncludeJsonLd && baseUrl ? generateBreadcrumbStructuredData(items, baseUrl) : null;

  const defaultSeparator = (
    <ChevronRight
      aria-hidden="true"
      className="h-4 w-4 flex-shrink-0 text-gray-400"
      strokeWidth={2}
    />
  );
  return (
    <>
      {breadcrumbStructuredData && (
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: breadcrumbStructuredData }}
          type="application/ld+json"
        />
      )}

      <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            const key = `${item.label}-${index}`;

            return (
              <li key={key} className="flex items-center">
                {index > 0 && <span className="mr-2">{separator ?? defaultSeparator}</span>}

                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-1.5 text-sm font-medium',
                      isLast ? 'text-cadet-grey' : 'text-gunmetal',
                    )}
                  >
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    {item.label && (
                      <span className={cn(item.hideLabel && 'sr-only')}>{item.label}</span>
                    )}
                  </span>
                ) : (
                  <Link
                    className="hover:primary flex items-center gap-1.5 text-sm font-medium text-primary transition-colors"
                    href={item.href}
                  >
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    {item.label && (
                      <span className={cn(item.hideLabel && 'sr-only')}>{item.label}</span>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
