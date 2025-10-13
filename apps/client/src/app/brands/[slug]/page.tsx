/**
 * Individual Brand Page
 *
 * Dynamic route for viewing a single brand by slug
 * Uses ISR with on-demand revalidation
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { GetBrandBySlugQuery } from '@/gql/graphql';
import { graphqlRequest } from '@/lib/graphql-client';
import { GET_BRAND_BY_SLUG_QUERY } from '@/queries/brands';

// Revalidate every 60 seconds
export const revalidate = 60;

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;

  try {
    // Fetch brand data
    const data = await graphqlRequest<GetBrandBySlugQuery, { slug: string }>(
      {
        query: GET_BRAND_BY_SLUG_QUERY,
        variables: { slug },
      },
      {
        next: { tags: ['brands', `brand-${slug}`] },
      },
    );

    const brand = data.catalogBrandBySlug;

    if (!brand) {
      notFound();
    }

    // Generate timestamp to verify cache revalidation
    const renderedAt = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      hour12: true,
    });

    return (
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Link
          href="/brands"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to all brands
        </Link>

        {/* Render Timestamp (ISR Cache Verification) */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
          <p className="text-sm text-gray-700">
            <strong className="text-blue-900">Page rendered at:</strong>{' '}
            <span className="font-mono text-blue-800">{renderedAt}</span>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            This timestamp updates when the cache is revalidated (either after 60s or via webhook)
          </p>
        </div>

        {/* Brand Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{brand.name}</h1>
              <p className="text-gray-500 text-sm">Slug: {brand.slug}</p>
            </div>

            {/* Badges */}
            <div className="flex gap-2">
              {brand.isHighlighted && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  ⭐ Featured
                </span>
              )}
              {brand.isRecommended && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  ✓ Recommended
                </span>
              )}
              {brand.isActive && (
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  Active
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          {brand.description && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed">{brand.description}</p>
            </div>
          )}

          {/* Metadata */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500 font-medium">Created</dt>
                <dd className="mt-1">{new Date(brand.createdAt).toLocaleDateString()}</dd>
              </div>
              {brand.updatedAt && (
                <div>
                  <dt className="text-gray-500 font-medium">Last Updated</dt>
                  <dd className="mt-1">{new Date(brand.updatedAt).toLocaleDateString()}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Placeholder for future content */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">Vehicle listings for {brand.name} will appear here.</p>
        </div>

        {/* Cache Info (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-600">
            <p>
              <strong>Cache Info:</strong> This page uses ISR with brand-specific tags. When this
              brand is updated, the Watch decorator triggers revalidation of this specific page.
            </p>
            <p className="mt-2">Cache tags: brands, brand-{slug}</p>
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error('Error fetching brand:', error);
    notFound();
  }
}

/**
 * Generate static params for common brands (optional)
 * This pre-generates pages at build time
 */
// export async function generateStaticParams() {
//   const data = await graphqlRequest<GetCatalogBrandsQuery>({
//     query: GET_BRANDS_QUERY.toString(),
//     variables: { activeOnly: true, limit: 20 },
//   });
//
//   return data.catalogBrands.map((brand) => ({
//     slug: brand.slug,
//   }));
// }

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;

  try {
    const data = await graphqlRequest<GetBrandBySlugQuery, { slug: string }>({
      query: GET_BRAND_BY_SLUG_QUERY,
      variables: { slug },
    });

    const brand = data.catalogBrandBySlug;

    if (!brand) {
      return {
        title: 'Brand Not Found',
      };
    }

    return {
      title: `${brand.name} | Cartop`,
      description: brand.description || `Browse ${brand.name} vehicles on Cartop`,
    };
  } catch {
    return {
      title: 'Brand Not Found',
    };
  }
}
