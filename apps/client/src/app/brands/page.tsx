/**
 * Catalog Brands Page
 *
 * Server component that fetches and displays all active brands
 * Uses Next.js ISR (Incremental Static Regeneration) with on-demand revalidation
 */

import Link from 'next/link';

import type { GetCatalogBrandsQuery } from '@/gql/graphql';
import { graphqlRequest } from '@/lib/graphql-client';
import { GET_BRANDS_QUERY } from '@/queries/brands';

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Add tags for on-demand revalidation
export const dynamic = 'force-static';

export default async function BrandsPage() {
  // Fetch brands at build time / on revalidation
  const data = await graphqlRequest<GetCatalogBrandsQuery, { activeOnly: boolean; limit: number }>(
    {
      query: GET_BRANDS_QUERY,
      variables: {
        activeOnly: true,
        limit: 50,
      },
    },
    {
      // Add cache tags for targeted revalidation
      next: { tags: ['brands'] },
    },
  );

  const brands = data.catalogBrands || [];
  const highlightedBrands = brands.filter(b => b.isHighlighted);
  const regularBrands = brands.filter(b => !b.isHighlighted);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Car Brands</h1>

      {/* Highlighted Brands Section */}
      {highlightedBrands.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-blue-600">⭐ Featured Brands</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {highlightedBrands.map(brand => (
              <BrandCard key={brand.id} brand={brand} isFeatured />
            ))}
          </div>
        </section>
      )}

      {/* Regular Brands Section */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">All Brands</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {regularBrands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* Empty State */}
      {brands.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">No brands available yet.</p>
        </div>
      )}

      {/* Cache Info (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-12 rounded bg-gray-100 p-4 text-sm text-gray-600">
          <p>
            <strong>Cache Info:</strong> This page uses ISR with 60s revalidation. When brands are
            updated in the backend, the Watch decorator triggers immediate revalidation via webhook.
          </p>
          <p className="mt-2">Last build: {new Date().toLocaleString()}</p>
        </div>
      )}
    </main>
  );
}

/**
 * Brand Card Component
 */
function BrandCard({
  brand,
  isFeatured = false,
}: {
  brand: GetCatalogBrandsQuery['catalogBrands'][0];
  isFeatured?: boolean;
}) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={`
        block rounded-lg border p-6 transition-all hover:shadow-lg
        ${
          isFeatured
            ? 'border-blue-300 bg-blue-50 hover:border-blue-400'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-xl font-semibold">{brand.name}</h3>
        {brand.isRecommended && (
          <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">Recommended</span>
        )}
      </div>

      {brand.description && (
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{brand.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{brand.slug}</span>
        {isFeatured && <span className="font-medium text-blue-600">⭐ Featured</span>}
      </div>
    </Link>
  );
}

/**
 * Metadata
 */
export const metadata = {
  title: 'Car Brands | Cartop',
  description: 'Browse our selection of car brands',
};
