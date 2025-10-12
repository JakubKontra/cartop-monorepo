import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '../types';
import { ExceptionKeysEnum } from '../keys';

/**
 * User Exception Factory
 * Provides type-safe exception creation for user-related operations
 */
export const UserExceptions = {
  /**
   * Thrown when attempting to create a user with an email that already exists
   */
  duplicateEmail: (email: string) =>
    new BadRequestException(ExceptionKeysEnum.USER_DUPLICATE_EMAIL, {
      message: 'Email already exists',
      parent: 'email',
      jsonPayload: JSON.stringify({ email }),
    }),

  /**
   * Thrown when a user is not found by ID or email
   */
  notFound: (identifier: string) =>
    new NotFoundException(ExceptionKeysEnum.USER_NOT_FOUND, {
      message: 'User not found',
      jsonPayload: JSON.stringify({ identifier }),
    }),

  /**
   * Thrown when login credentials are invalid
   */
  invalidCredentials: () =>
    new UnauthorizedException(ExceptionKeysEnum.USER_INVALID_CREDENTIALS, {
      message: 'Invalid email or password',
    }),

  /**
   * Thrown when user email is not verified
   */
  emailNotVerified: (email: string) =>
    new UnauthorizedException(ExceptionKeysEnum.USER_EMAIL_NOT_VERIFIED, {
      message: 'Email address is not verified',
      parent: 'email',
      jsonPayload: JSON.stringify({ email }),
    }),
};
