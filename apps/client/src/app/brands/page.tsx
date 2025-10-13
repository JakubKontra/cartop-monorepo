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
      <h1 className="text-4xl font-bold mb-8">Car Brands</h1>

      {/* Highlighted Brands Section */}
      {highlightedBrands.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">⭐ Featured Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedBrands.map(brand => (
              <BrandCard key={brand.id} brand={brand} featured />
            ))}
          </div>
        </section>
      )}

      {/* Regular Brands Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {regularBrands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </section>

      {/* Empty State */}
      {brands.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No brands available yet.</p>
        </div>
      )}

      {/* Cache Info (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-12 p-4 bg-gray-100 rounded text-sm text-gray-600">
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
  featured = false,
}: {
  brand: GetCatalogBrandsQuery['catalogBrands'][0];
  featured?: boolean;
}) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={`
        block p-6 rounded-lg border transition-all hover:shadow-lg
        ${
          featured
            ? 'border-blue-300 bg-blue-50 hover:border-blue-400'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-semibold">{brand.name}</h3>
        {brand.isRecommended && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Recommended</span>
        )}
      </div>

      {brand.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{brand.description}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{brand.slug}</span>
        {featured && <span className="text-blue-600 font-medium">⭐ Featured</span>}
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
