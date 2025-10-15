/**
 * Catalog Data Service
 *
 * Pure data fetching layer for catalog brands
 * Separates GraphQL logic from components and actions
 */

import type { GetCatalogBrandsQuery, GetHighlightedBrandsQuery } from '@/gql/graphql';

import { graphqlRequest } from '@/lib/graphql-client';
import { GET_BRANDS_QUERY, GET_HIGHLIGHTED_BRANDS_QUERY } from '@/queries/brands';

export type CatalogBrandLogo = {
  alt?: null | string;
  height?: null | number;
  id: string;
  url: string;
  width?: null | number;
};

export type HighlightedCatalogBrand = {
  description?: string;
  id: string;
  logo?: CatalogBrandLogo | null;
  name: string;
  slug: string;
};

export type CatalogBrand = {
  description?: string;
  id: string;
  logo?: CatalogBrandLogo | null;
  name: string;
  slug: string;
};

export type GetHighlightedCatalogBrandsOptions = {
  /** Maximum number of brands to return */
  limit?: number;
  /** Additional fetch options */
  requestInit?: RequestInit;
};

export type GetAllCatalogBrandsOptions = {
  /** Filter only active brands */
  activeOnly?: boolean;
  /** Maximum number of brands to return */
  limit?: number;
  /** Additional fetch options */
  requestInit?: RequestInit;
};

/**
 * Fetch highlighted catalog brands from GraphQL API
 * @param options - Optional configuration for fetching brands
 * @throws Error if no highlighted brands found or API error
 */
export async function getHighlightedCatalogBrands(
  options?: GetHighlightedCatalogBrandsOptions,
): Promise<HighlightedCatalogBrand[]> {
  const { limit, requestInit } = options || {};

  const data = await graphqlRequest<GetHighlightedBrandsQuery, { limit?: number }>(
    {
      query: GET_HIGHLIGHTED_BRANDS_QUERY,
      variables: limit ? { limit } : {},
    },
    {
      // Add cache tags for targeted revalidation
      next: { tags: ['brands', 'highlighted-brands', 'catalog'] },
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

/**
 * Fetch all catalog brands from GraphQL API
 * @param options - Optional configuration for fetching brands
 * @throws Error if no brands found or API error
 */
export async function getAllCatalogBrands(
  options?: GetAllCatalogBrandsOptions,
): Promise<CatalogBrand[]> {
  const { activeOnly = true, limit, requestInit } = options || {};

  const data = await graphqlRequest<
    GetCatalogBrandsQuery,
    { activeOnly: boolean; limit?: number }
  >(
    {
      query: GET_BRANDS_QUERY,
      variables: {
        activeOnly,
        limit,
      },
    },
    {
      // Add cache tags for targeted revalidation
      next: { tags: ['brands', 'catalog'] },
      ...requestInit,
    },
  );

  if (!data.catalogBrands || data.catalogBrands.length === 0) {
    throw new Error('Žádné značky nebyly nalezeny');
  }

  // Filter out highlighted brands to get only regular ones
  const regularBrands = data.catalogBrands.filter(b => !b.isHighlighted);

  return regularBrands.map(brand => ({
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
