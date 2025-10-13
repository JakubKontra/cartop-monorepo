/**
 * Brands Data Service
 *
 * Pure data fetching layer for brands
 * Separates GraphQL logic from components and actions
 */

import type { GetHighlightedBrandsQuery } from '@/gql/graphql';

import { graphqlRequest } from '@/lib/graphql-client';
import { GET_HIGHLIGHTED_BRANDS_QUERY } from '@/queries/brands';

export type BrandLogo = {
  alt?: string | null;
  height?: number | null;
  id: string;
  url: string;
  width?: number | null;
};

export type Brand = {
  description?: string;
  id: string;
  logo?: BrandLogo | null;
  name: string;
  slug: string;
};

export type GetHighlightedBrandsOptions = {
  /** Maximum number of brands to return */
  limit?: number;
  /** Additional fetch options */
  requestInit?: RequestInit;
};

/**
 * Fetch highlighted brands from GraphQL API
 * @param options - Optional configuration for fetching brands
 * @throws Error if no highlighted brands found or API error
 */
export async function getHighlightedBrands(
  options?: GetHighlightedBrandsOptions,
): Promise<Brand[]> {
  const { limit, requestInit } = options || {};

  const data = await graphqlRequest<
    GetHighlightedBrandsQuery,
    { limit?: number }
  >(
    {
      query: GET_HIGHLIGHTED_BRANDS_QUERY,
      variables: limit ? { limit } : {},
    },
    {
      // Add cache tags for targeted revalidation
      next: { tags: ['brands'] },
      ...requestInit,
    },
  );

  if (!data.highlightedCatalogBrands || data.highlightedCatalogBrands.length === 0) {
    throw new Error('Žádné zvýrazněné značky nebyly nalezeny');
  }

  return data.highlightedCatalogBrands.map(brand => ({
    description: brand.description || undefined,
    id: brand.id,
    logo: brand.logo
      ? {
          alt: brand.logo.alt || undefined,
          height: brand.logo.height || undefined,
          id: brand.logo.id,
          url: brand.logo.url,
          width: brand.logo.width || undefined,
        }
      : undefined,
    name: brand.name,
    slug: brand.slug,
  }));
}
