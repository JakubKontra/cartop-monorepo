import {
  BadRequestException,
  NotFoundException,
} from '../types';
import { ExceptionKeysEnum } from '../keys';

/**
 * Leasing Company Exception Factory
 * Provides type-safe exception creation for leasing company-related operations
 */
export const LeasingCompanyExceptions = {
  /**
   * Thrown when leasing company is not found by ID or slug
   */
  notFound: (identifier: string) =>
    new NotFoundException(ExceptionKeysEnum.LEASING_COMPANY_NOT_FOUND, {
      message: 'Leasing company not found',
      jsonPayload: JSON.stringify({ identifier }),
    }),

  /**
   * Thrown when attempting to create/update leasing company with duplicate slug
   */
  slugAlreadyExists: (slug: string) =>
    new BadRequestException(ExceptionKeysEnum.LEASING_COMPANY_SLUG_ALREADY_EXISTS, {
      message: 'Leasing company with this slug already exists',
      parent: 'slug',
      jsonPayload: JSON.stringify({ slug }),
    }),
};
