import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '../types';
import { ExceptionKeysEnum } from '../keys';

/**
 * Auth Exception Factory
 * Provides type-safe exception creation for authentication and authorization operations
 */
export const AuthExceptions = {
  /**
   * Thrown when user is not authenticated
   */
  unauthorized: (reason?: string) =>
    new UnauthorizedException(ExceptionKeysEnum.AUTH_UNAUTHORIZED, {
      message: 'Authentication required',
      jsonPayload: reason ? JSON.stringify({ reason }) : undefined,
    }),

  /**
   * Thrown when user doesn't have required permissions
   */
  forbidden: (resource?: string) =>
    new ForbiddenException(ExceptionKeysEnum.AUTH_FORBIDDEN, {
      message: 'You do not have permission to access this resource',
      jsonPayload: resource ? JSON.stringify({ resource }) : undefined,
    }),

  /**
   * Thrown when auth token has expired
   */
  tokenExpired: () =>
    new UnauthorizedException(ExceptionKeysEnum.AUTH_TOKEN_EXPIRED, {
      message: 'Authentication token has expired',
    }),

  /**
   * Thrown when auth token is invalid or malformed
   */
  tokenInvalid: () =>
    new UnauthorizedException(ExceptionKeysEnum.AUTH_TOKEN_INVALID, {
      message: 'Authentication token is invalid',
    }),

  /**
   * Thrown when user doesn't have required role
   */
  roleDenied: (requiredRole: string, userRole?: string) =>
    new ForbiddenException(ExceptionKeysEnum.AUTH_ROLE_DENIED, {
      message: 'You do not have the required role for this action',
      jsonPayload: JSON.stringify({ requiredRole, userRole }),
    }),

  /**
   * Thrown when verification code has already been used
   */
  verificationAlreadyUsed: () =>
    new BadRequestException(ExceptionKeysEnum.AUTH_VERIFICATION_ALREADY_USED, {
      message: 'This verification code has already been used',
    }),

  /**
   * Thrown when verification code is incorrect
   */
  wrongVerificationCode: () =>
    new BadRequestException(ExceptionKeysEnum.AUTH_WRONG_VERIFICATION_CODE, {
      message: 'The verification code is incorrect',
    }),
};
