import { registerEnumType } from '@nestjs/graphql';

/**
 * Subscription Source Enum
 * Tracks where a newsletter subscription originated from
 */
export enum SubscriptionSource {
  /** Subscription from website newsletter form */
  WEB = 'web',

  /** Direct subscription through Ecomail platform */
  ECOMAIL = 'ecomail',

  /** Manually added by admin */
  ADMIN = 'admin',

  /** Subscription via external API */
  API = 'api',

  /** Bulk import from CSV or other source */
  IMPORT = 'import',

  /** Subscription from mobile app */
  MOBILE = 'mobile',
}

// Register enum for GraphQL
registerEnumType(SubscriptionSource, {
  name: 'SubscriptionSource',
  description: 'Source from which a newsletter subscription originated',
});

/**
 * Subscription Status Enum
 * Tracks the current status of a newsletter subscription
 */
export enum SubscriptionStatus {
  /** Email verification pending */
  PENDING = 'pending',

  /** Active subscription */
  ACTIVE = 'active',

  /** User has unsubscribed */
  UNSUBSCRIBED = 'unsubscribed',
}

// Register enum for GraphQL
registerEnumType(SubscriptionStatus, {
  name: 'SubscriptionStatus',
  description: 'Current status of a newsletter subscription',
});
