import { registerEnumType } from '@nestjs/graphql';

/**
 * Exception Keys Enum
 * Organized by entity for better maintainability
 * These keys are exposed to GraphQL and translated on the frontend
 */
export enum ExceptionKeysEnum {
  // ====================
  // User Entity
  // ====================
  USER_DUPLICATE_EMAIL = 'USER_DUPLICATE_EMAIL',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_INVALID_CREDENTIALS = 'USER_INVALID_CREDENTIALS',
  USER_EMAIL_NOT_VERIFIED = 'USER_EMAIL_NOT_VERIFIED',

  // ====================
  // Newsletter Entity
  // ====================
  NEWSLETTER_ALREADY_SUBSCRIBED = 'NEWSLETTER_ALREADY_SUBSCRIBED',
  NEWSLETTER_NOT_FOUND = 'NEWSLETTER_NOT_FOUND',
  NEWSLETTER_INVALID_EMAIL = 'NEWSLETTER_INVALID_EMAIL',
  NEWSLETTER_PROBLEM = 'NEWSLETTER_PROBLEM',

  // ====================
  // Brand Entity
  // ====================
  BRAND_NOT_FOUND = 'BRAND_NOT_FOUND',
  BRAND_SLUG_ALREADY_EXISTS = 'BRAND_SLUG_ALREADY_EXISTS',
  BRAND_NO_ACCESS = 'BRAND_NO_ACCESS',

  // ====================
  // Model Entity
  // ====================
  MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
  MODEL_SLUG_ALREADY_EXISTS = 'MODEL_SLUG_ALREADY_EXISTS',
  MODEL_NO_ACCESS = 'MODEL_NO_ACCESS',

  // ====================
  // Offer Entity
  // ====================
  OFFER_NOT_FOUND = 'OFFER_NOT_FOUND',
  OFFER_NO_ACCESS = 'OFFER_NO_ACCESS',
  OFFER_NOT_IN_EDITABLE_STATE = 'OFFER_NOT_IN_EDITABLE_STATE',
  OFFER_ALREADY_FINISHED = 'OFFER_ALREADY_FINISHED',

  // ====================
  // Leasing Company Entity
  // ====================
  LEASING_COMPANY_NOT_FOUND = 'LEASING_COMPANY_NOT_FOUND',
  LEASING_COMPANY_SLUG_ALREADY_EXISTS = 'LEASING_COMPANY_SLUG_ALREADY_EXISTS',

  // ====================
  // Validation - General
  // ====================
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  VALIDATION_NO_DATA_SUBMITTED = 'VALIDATION_NO_DATA_SUBMITTED',

  // ====================
  // Validation - Email
  // ====================
  VALIDATION_EMAIL_INVALID = 'VALIDATION_EMAIL_INVALID',
  VALIDATION_EMAIL_REQUIRED = 'VALIDATION_EMAIL_REQUIRED',

  // ====================
  // Validation - Password
  // ====================
  VALIDATION_PASSWORD_REQUIRED = 'VALIDATION_PASSWORD_REQUIRED',
  VALIDATION_PASSWORD_TOO_SHORT = 'VALIDATION_PASSWORD_TOO_SHORT',
  VALIDATION_PASSWORD_TOO_WEAK = 'VALIDATION_PASSWORD_TOO_WEAK',

  // ====================
  // Validation - Name
  // ====================
  VALIDATION_NAME_REQUIRED = 'VALIDATION_NAME_REQUIRED',
  VALIDATION_NAME_TOO_SHORT = 'VALIDATION_NAME_TOO_SHORT',

  // ====================
  // Validation - Generic Fields
  // ====================
  VALIDATION_FIELD_REQUIRED = 'VALIDATION_FIELD_REQUIRED',
  VALIDATION_FIELD_TOO_SHORT = 'VALIDATION_FIELD_TOO_SHORT',
  VALIDATION_FIELD_TOO_LONG = 'VALIDATION_FIELD_TOO_LONG',
  VALIDATION_FIELD_INVALID_FORMAT = 'VALIDATION_FIELD_INVALID_FORMAT',
  VALIDATION_UUID_INVALID = 'VALIDATION_UUID_INVALID',
  VALIDATION_URL_INVALID = 'VALIDATION_URL_INVALID',

  // ====================
  // Authentication
  // ====================
  AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
  AUTH_FORBIDDEN = 'AUTH_FORBIDDEN',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  AUTH_ROLE_DENIED = 'AUTH_ROLE_DENIED',
  AUTH_VERIFICATION_ALREADY_USED = 'AUTH_VERIFICATION_ALREADY_USED',
  AUTH_WRONG_VERIFICATION_CODE = 'AUTH_WRONG_VERIFICATION_CODE',

  // ====================
  // Asset
  // ====================
  ASSET_NO_ACCESS = 'ASSET_NO_ACCESS',
  ASSET_NOT_FOUND = 'ASSET_NOT_FOUND',

  // ====================
  // Generic
  // ====================
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Register enum with GraphQL so it's available in schema
registerEnumType(ExceptionKeysEnum, {
  name: 'ExceptionKeysEnum',
  description: 'Error keys for frontend translation',
});
