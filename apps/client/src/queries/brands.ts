/**
 * GraphQL queries for catalog brands
 * These queries will be validated by GraphQL Code Generator
 */

import { graphql } from '../gql';

/**
 * Get all active catalog brands with highlighting
 */
export const GET_BRANDS_QUERY = graphql(`
  query GetCatalogBrands($activeOnly: Boolean, $limit: Float) {
    catalogBrands(activeOnly: $activeOnly, limit: $limit) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      logo {
        id
        url
        alt
        width
        height
      }
      createdAt
      updatedAt
    }
  }
`);

/**
 * Get highlighted brands for homepage
 */
export const GET_HIGHLIGHTED_BRANDS_QUERY = graphql(`
  query GetHighlightedBrands($limit: Float) {
    highlightedCatalogBrands(limit: $limit) {
      id
      name
      slug
      description
      isHighlighted
      logo {
        id
        url
        alt
        width
        height
      }
    }
  }
`);

/**
 * Get brand by slug for brand page
 */
export const GET_BRAND_BY_SLUG_QUERY = graphql(`
  query GetBrandBySlug($slug: String!) {
    catalogBrandBySlug(slug: $slug) {
      id
      name
      slug
      description
      isActive
      isHighlighted
      isRecommended
      createdAt
      updatedAt
    }
  }
`);
