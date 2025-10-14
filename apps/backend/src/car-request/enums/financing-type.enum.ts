import { registerEnumType } from '@nestjs/graphql';

/**
 * Financing Type Enum
 * Represents the type of financing for a car request
 */
export enum FinancingType {
  CASH = 'cash',
  LEASING = 'leasing',
}

// Register enum for GraphQL
registerEnumType(FinancingType, {
  name: 'FinancingType',
  description: 'Type of financing for the car request',
});
