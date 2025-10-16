import { registerEnumType } from '@nestjs/graphql';

/**
 * Car Request Calculation Item Type Enum
 * Represents the type of configuration item in a calculation
 */
export enum CarRequestCalculationItemType {
  EXTERIOR_COLOR = 'exterior_color',
  INTERIOR_COLOR = 'interior_color',
  PACKAGE = 'package',
  ACCESSORY = 'accessory',
  SERVICE = 'service',
  OTHER = 'other',
}

registerEnumType(CarRequestCalculationItemType, {
  name: 'CarRequestCalculationItemType',
  description: 'Type of configuration item',
  valuesMap: {
    EXTERIOR_COLOR: {
      description: 'Exterior paint color',
    },
    INTERIOR_COLOR: {
      description: 'Interior color/material',
    },
    PACKAGE: {
      description: 'Equipment package',
    },
    ACCESSORY: {
      description: 'Additional accessory or option',
    },
    SERVICE: {
      description: 'Service package (maintenance, insurance, etc.)',
    },
    OTHER: {
      description: 'Other configuration item',
    },
  },
});
