import {
  BadRequestException,
  NotFoundException,
} from '../types';
import { ExceptionKeysEnum } from '../keys';

/**
 * Newsletter Exception Factory
 * Provides type-safe exception creation for newsletter-related operations
 */
export const NewsletterExceptions = {
  /**
   * Thrown when email is already subscribed to newsletter
   */
  alreadySubscribed: (email: string) =>
    new BadRequestException(ExceptionKeysEnum.NEWSLETTER_ALREADY_SUBSCRIBED, {
      message: 'Email is already subscribed to newsletter',
      parent: 'email',
      jsonPayload: JSON.stringify({ email }),
    }),

  /**
   * Thrown when newsletter subscription is not found
   */
  notFound: (identifier: string) =>
    new NotFoundException(ExceptionKeysEnum.NEWSLETTER_NOT_FOUND, {
      message: 'Newsletter subscription not found',
      jsonPayload: JSON.stringify({ identifier }),
    }),

  /**
   * Thrown when email format is invalid for newsletter
   */
  invalidEmail: (email: string) =>
    new BadRequestException(ExceptionKeysEnum.NEWSLETTER_INVALID_EMAIL, {
      message: 'Invalid email address for newsletter subscription',
      parent: 'email',
      jsonPayload: JSON.stringify({ email }),
    }),

  /**
   * Thrown when there's a general problem with newsletter operations
   */
  problem: (details?: string) =>
    new BadRequestException(ExceptionKeysEnum.NEWSLETTER_PROBLEM, {
      message: 'Newsletter operation failed',
      jsonPayload: details ? JSON.stringify({ details }) : undefined,
    }),
};
