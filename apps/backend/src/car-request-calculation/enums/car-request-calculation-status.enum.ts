import { registerEnumType } from '@nestjs/graphql';

/**
 * Car Request Calculation Status Enum
 * Represents the workflow status of a calculation request
 */
export enum CarRequestCalculationStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

registerEnumType(CarRequestCalculationStatus, {
  name: 'CarRequestCalculationStatus',
  description: 'Status workflow for calculation requests',
  valuesMap: {
    DRAFT: {
      description: 'Draft calculation, not yet submitted',
    },
    SUBMITTED: {
      description: 'Calculation submitted and waiting for processing',
    },
    IN_PROGRESS: {
      description: 'Calculation is being processed by back office',
    },
    COMPLETED: {
      description: 'Calculation completed with quotes',
    },
    REJECTED: {
      description: 'Calculation was rejected',
    },
    CANCELLED: {
      description: 'Calculation was cancelled',
    },
  },
});
