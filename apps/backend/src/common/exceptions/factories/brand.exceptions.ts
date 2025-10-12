import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '../types';
import { ExceptionKeysEnum } from '../keys';

/**
 * Brand Exception Factory
 * Provides type-safe exception creation for brand-related operations
 */
export const BrandExceptions = {
  /**
   * Thrown when brand is not found by ID or slug
   */
  notFound: (identifier: string) =>
    new NotFoundException(ExceptionKeysEnum.BRAND_NOT_FOUND, {
      message: 'Brand not found',
      jsonPayload: JSON.stringify({ identifier }),
    }),

  /**
   * Thrown when attempting to create/update brand with duplicate slug
   */
  slugAlreadyExists: (slug: string) =>
    new BadRequestException(ExceptionKeysEnum.BRAND_SLUG_ALREADY_EXISTS, {
      message: 'Brand with this slug already exists',
      parent: 'slug',
      jsonPayload: JSON.stringify({ slug }),
    }),

  /**
   * Thrown when user doesn't have access to brand
   */
  noAccess: (brandId: string, userId?: string) =>
    new ForbiddenException(ExceptionKeysEnum.BRAND_NO_ACCESS, {
      message: 'You do not have access to this brand',
      jsonPayload: JSON.stringify({ brandId, userId }),
    }),
};
