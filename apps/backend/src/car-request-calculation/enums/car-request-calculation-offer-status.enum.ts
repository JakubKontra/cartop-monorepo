import { registerEnumType } from '@nestjs/graphql';

/**
 * Car Request Calculation Offer Status Enum
 * Represents the status of a specific offer from a leasing company
 */
export enum CarRequestCalculationOfferStatus {
  PENDING = 'pending',
  QUOTED = 'quoted',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

registerEnumType(CarRequestCalculationOfferStatus, {
  name: 'CarRequestCalculationOfferStatus',
  description: 'Status of individual offer from leasing company',
  valuesMap: {
    PENDING: {
      description: 'Waiting for quote from leasing company',
    },
    QUOTED: {
      description: 'Leasing company provided a quote',
    },
    ACCEPTED: {
      description: 'Quote was accepted by customer',
    },
    REJECTED: {
      description: 'Quote was rejected',
    },
  },
});
