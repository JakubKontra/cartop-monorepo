import { registerEnumType } from '@nestjs/graphql';

/**
 * Catalog Equipment Brake Type Enum
 * Represents different types of braking systems used in vehicles
 */
export enum CatalogEquipmentBrakeType {
  DISC = 'disc', // 143 - Disky
  VENTILATED_DISC = 'ventilated_disc', // 144 - Ventilované disky
  DRUM = 'drum', // 145 - Bubnové
}

/**
 * Maps brake type enum values to their numeric identifiers from the old system
 */
export const CATALOG_EQUIPMENT_BRAKE_TYPE_NUMBER: Record<CatalogEquipmentBrakeType, number> = {
  [CatalogEquipmentBrakeType.DISC]: 143,
  [CatalogEquipmentBrakeType.VENTILATED_DISC]: 144,
  [CatalogEquipmentBrakeType.DRUM]: 145,
};

/**
 * Maps numeric identifiers from the old system to brake type enum values
 */
export const CATALOG_EQUIPMENT_BRAKE_TYPE_FROM_NUMBER: Record<number, CatalogEquipmentBrakeType> = {
  143: CatalogEquipmentBrakeType.DISC,
  144: CatalogEquipmentBrakeType.VENTILATED_DISC,
  145: CatalogEquipmentBrakeType.DRUM,
};

/**
 * Map MySQL brake_type_id to CatalogEquipmentBrakeType enum
 * Used for MySQL to PostgreSQL migration
 *
 * @param mysqlId Legacy MySQL brake type ID (6 = empty value, ignored)
 * @returns CatalogEquipmentBrakeType enum value or null if not found or invalid
 */
export function mapMySQLBrakeType(mysqlId?: number | null): CatalogEquipmentBrakeType | null {
  if (!mysqlId || mysqlId === 6) return null; // 6 = empty value in legacy system
  return CATALOG_EQUIPMENT_BRAKE_TYPE_FROM_NUMBER[mysqlId] || null;
}

// Register enum for GraphQL
registerEnumType(CatalogEquipmentBrakeType, {
  name: 'CatalogEquipmentBrakeType',
  description: 'Type of braking system used in vehicles',
});
