import { registerEnumType } from '@nestjs/graphql';

/**
 * Car Request Log Action Types
 * Defines all possible actions that can be logged for a car request
 *
 * Extensible design allows adding new action types without schema changes
 */
export enum CarRequestLogAction {
  // State Management
  STATUS_CHANGED = 'STATUS_CHANGED',
  STATE_CHANGED = 'STATE_CHANGED',
  ASSIGNED = 'ASSIGNED',

  // Communication
  NOTE_ADDED = 'NOTE_ADDED',
  MESSAGE_SENT = 'MESSAGE_SENT',
  OFFER_SENT = 'OFFER_SENT',
  CALL_LOGGED = 'CALL_LOGGED',
  EMAIL_SENT = 'EMAIL_SENT',

  // Scheduling
  CALLBACK_SCHEDULED = 'CALLBACK_SCHEDULED',

  // Special Markers
  MARKED_VIP = 'MARKED_VIP',
  MARKED_PURCHASED = 'MARKED_PURCHASED',
  PASSED_TO_DEALER = 'PASSED_TO_DEALER',
  WAITING_FOR_OFFER = 'WAITING_FOR_OFFER',

  // Lifecycle Events
  CREATED = 'CREATED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',

  // Extensibility
  CUSTOM = 'CUSTOM',
}

// Register enum for GraphQL
registerEnumType(CarRequestLogAction, {
  name: 'CarRequestLogAction',
  description: 'The type of action performed on a car request',
});
