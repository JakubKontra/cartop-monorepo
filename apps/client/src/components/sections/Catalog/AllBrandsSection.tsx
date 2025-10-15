/**
 * AllBrandsSection Component
 *
 * Server component that displays all brands in a 3-column grid with 45px logos in horizontal layout
 * Uses Next.js ISR (Incremental Static Regeneration)
 */

import { BrandListItem } from '@/components/molecules/BrandListItem';
import { getAllCatalogBrands } from '@/lib/services/catalog.service';

// ISR revalidation: 60 seconds
export const revalidate = 60;

const ALL_BRANDS_LIMIT = 100;

export const AllBrandsSection = async () => {
  const brands = await getAllCatalogBrands({
    activeOnly: true,
    limit: ALL_BRANDS_LIMIT,
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {brands.map(brand => (
        <BrandListItem
          key={brand.id}
          href={`/brands/${brand.slug}`}
          logoUrl={brand.logo?.url}
          logoAlt={brand.logo?.alt || undefined}
          logoWidth={brand.logo?.width || undefined}
          logoHeight={brand.logo?.height || undefined}
          name={brand.name}
        />
      ))}
    </div>
  );
};
