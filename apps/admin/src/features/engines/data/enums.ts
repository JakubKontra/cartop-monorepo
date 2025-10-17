/**
 * Local enum definitions for engines
 * These will be replaced by generated types from @/gql/graphql after running codegen
 *
 * IMPORTANT: After running `yarn codegen`, these local enums should match
 * the generated enums in @/gql/graphql
 */

export enum CatalogEngineFuelType {
  Diesel = 'DIESEL',
  Gasoline = 'GASOLINE',
  Hybrid = 'HYBRID',
  Electric = 'ELECTRIC',
  Hydrogen = 'HYDROGEN',
  TwoStroke = 'TWO_STROKE',
  EthanolE85 = 'ETHANOL_E85',
  Petrol = 'PETROL',
  PlugInHybrid = 'PLUG_IN_HYBRID',
  MildHybrid = 'MILD_HYBRID',
  Lpg = 'LPG',
  Cng = 'CNG',
}

export enum CatalogEngineTransmissionType {
  Manual = 'MANUAL',
  Automatic = 'AUTOMATIC',
  SemiAutomatic = 'SEMI_AUTOMATIC',
  Cvt = 'CVT',
}

export enum CatalogEngineDriveType {
  Fwd = 'FWD',
  Rwd = 'RWD',
  Awd = 'AWD',
  FourWd = 'FOUR_WD',
}
