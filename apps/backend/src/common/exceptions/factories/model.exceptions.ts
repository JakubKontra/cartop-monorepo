import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '../types';
import { ExceptionKeysEnum } from '../keys';

/**
 * Model Exception Factory
 * Provides type-safe exception creation for catalog model-related operations
 */
export const ModelExceptions = {
  /**
   * Thrown when model is not found by ID or slug
   */
  notFound: (identifier: string) =>
    new NotFoundException(ExceptionKeysEnum.MODEL_NOT_FOUND, {
      message: 'Model not found',
      jsonPayload: JSON.stringify({ identifier }),
    }),

  /**
   * Thrown when attempting to create/update model with duplicate slug
   */
  slugAlreadyExists: (slug: string) =>
    new BadRequestException(ExceptionKeysEnum.MODEL_SLUG_ALREADY_EXISTS, {
      message: 'Model with this slug already exists',
      parent: 'slug',
      jsonPayload: JSON.stringify({ slug }),
    }),

  /**
   * Thrown when user doesn't have access to model
   */
  noAccess: (modelId: string, userId?: string) =>
    new ForbiddenException(ExceptionKeysEnum.MODEL_NO_ACCESS, {
      message: 'You do not have access to this model',
      jsonPayload: JSON.stringify({ modelId, userId }),
    }),
};
