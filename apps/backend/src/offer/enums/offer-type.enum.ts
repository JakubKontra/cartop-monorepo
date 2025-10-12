import { registerEnumType } from '@nestjs/graphql';

/**
 * Offer Type Enum
 * Defines the type of offer (discriminator for Single Table Inheritance)
 */
export enum OfferType {
  OPERATIONAL_LEASING = 'operational_leasing',
  DIRECT_PURCHASE = 'direct_purchase',
  INDIVIDUAL = 'individual',
}

// Register enum for GraphQL
registerEnumType(OfferType, {
  name: 'OfferType',
  description: 'Type of offer',
  valuesMap: {
    OPERATIONAL_LEASING: {
      description: 'Operational leasing offer (public)',
    },
    DIRECT_PURCHASE: {
      description: 'Direct purchase offer (public)',
    },
    INDIVIDUAL: {
      description: 'Individual custom offer (admin-only)',
    },
  },
});
