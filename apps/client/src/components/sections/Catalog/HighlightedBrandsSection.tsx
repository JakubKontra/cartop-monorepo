/**
 * HighlightedBrandsSection Component
 *
 * Server component that displays highlighted/featured brands in a 3-column grid with 96px logos
 * Uses Next.js ISR (Incremental Static Regeneration)
 */

import { BrandCard } from '@/components/molecules/BrandCard';
import { getHighlightedCatalogBrands } from '@/lib/services/catalog.service';

// ISR revalidation: 60 seconds
export const revalidate = 60;

const HIGHLIGHTED_BRANDS_LIMIT = 12;

export const HighlightedBrandsSection = async () => {
  const brands = await getHighlightedCatalogBrands({ limit: HIGHLIGHTED_BRANDS_LIMIT });

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
      {brands.map(brand => (
        <BrandCard
          key={brand.id}
          href={`/brands/${brand.slug}`}
          logoAlt={brand.logo?.alt || undefined}
          logoHeight={brand.logo?.height || undefined}
          logoUrl={brand.logo?.url}
          logoWidth={brand.logo?.width || undefined}
          name={brand.name}
        />
      ))}
    </div>
  );
};
