import { cn } from '@/utils/cv';

import { SearchInput } from './SearchInput';

export interface CatalogSearchSectionProps {
  /** Optional CSS classes */
  className?: string;
}

/**
 * CatalogSearchSection Component
 *
 * Wrapper section for the catalog search input
 */
export const CatalogSearchSection = ({ className }: CatalogSearchSectionProps) => {
  return (
    <section className={cn('w-full bg-white', className)}>
      <SearchInput />
    </section>
  );
};
