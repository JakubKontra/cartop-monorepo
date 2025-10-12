import { registerEnumType } from '@nestjs/graphql';

/**
 * Individual Offer Status Enum
 * Status workflow for individual (custom) offers
 */
export enum IndividualOfferStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

// Register enum for GraphQL
registerEnumType(IndividualOfferStatus, {
  name: 'IndividualOfferStatus',
  description: 'Status of individual offer',
  valuesMap: {
    NEW: {
      description: 'New offer, not yet processed',
    },
    IN_PROGRESS: {
      description: 'Offer is being processed',
    },
    COMPLETED: {
      description: 'Offer successfully completed',
    },
    REJECTED: {
      description: 'Offer was rejected',
    },
  },
});
