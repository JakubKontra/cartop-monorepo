/**
 * Brands Section Component
 *
 * Server component that displays highlighted brands on homepage
 * Uses Next.js ISR (Incremental Static Regeneration) and Server Actions
 */

import Link from 'next/link';

import { BrandCard } from '@/components/molecules/BrandCard';
import { SectionHeader } from '@/components/sections/Homepage/SectionHeader';
import { getHighlightedBrands } from '@/lib/services/brands.service';

// ISR revalidation: 60 seconds
export const revalidate = 60;

const BRANDS_LIMIT = 8;

export const BrandsSection = async () => {
  const brands = await getHighlightedBrands({ limit: BRANDS_LIMIT });

  return (
    <section className="section-container py-16 lg:py-24">
      <SectionHeader
        highlightedWord="Všechny"
        remainingTitle="naše značky"
        subtitle="Prohlédněte si naše nejlepší nabídky a ušetřete."
      />

      <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8 lg:gap-4">
        {brands.map(brand => (
          <BrandCard
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            logoAlt={brand.logo?.alt || undefined}
            logoHeight={brand.logo?.height || undefined}
            logoUrl={brand.logo?.url}
            logoWidth={brand.logo?.width || undefined}
            name={brand.name}
          />
        ))}
      </div>

      <div className="flex w-full justify-center">
        <Link className="text-sm text-primary underline hover:no-underline" href="/brands">
          Zobrazit všechny značky
        </Link>
      </div>
    </section>
  );
};
