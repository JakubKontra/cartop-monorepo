// TODO: After running codegen, these can be imported from '@/gql/graphql'
import {
  CatalogEngineFuelType,
  CatalogEngineTransmissionType,
  CatalogEngineDriveType,
} from './enums'

// Fuel Type Options
export const FUEL_TYPE_OPTIONS = [
  { value: CatalogEngineFuelType.Petrol, label: 'Petrol' },
  { value: CatalogEngineFuelType.Diesel, label: 'Diesel' },
  { value: CatalogEngineFuelType.Electric, label: 'Electric' },
  { value: CatalogEngineFuelType.Hybrid, label: 'Hybrid' },
  { value: CatalogEngineFuelType.PlugInHybrid, label: 'Plug-in Hybrid' },
  { value: CatalogEngineFuelType.MildHybrid, label: 'Mild Hybrid' },
  { value: CatalogEngineFuelType.Lpg, label: 'LPG' },
  { value: CatalogEngineFuelType.Cng, label: 'CNG' },
  { value: CatalogEngineFuelType.Hydrogen, label: 'Hydrogen' },
] as const

// Transmission Type Options
export const TRANSMISSION_TYPE_OPTIONS = [
  { value: CatalogEngineTransmissionType.Manual, label: 'Manual' },
  { value: CatalogEngineTransmissionType.Automatic, label: 'Automatic' },
  { value: CatalogEngineTransmissionType.SemiAutomatic, label: 'Semi-Automatic' },
  { value: CatalogEngineTransmissionType.Cvt, label: 'CVT' },
] as const

// Drive Type Options
export const DRIVE_TYPE_OPTIONS = [
  { value: CatalogEngineDriveType.Fwd, label: 'FWD (Front-Wheel Drive)' },
  { value: CatalogEngineDriveType.Rwd, label: 'RWD (Rear-Wheel Drive)' },
  { value: CatalogEngineDriveType.Awd, label: 'AWD (All-Wheel Drive)' },
  { value: CatalogEngineDriveType.FourWd, label: '4WD (Four-Wheel Drive)' },
] as const

// Label getters for display
export const getFuelTypeLabel = (fuelType: CatalogEngineFuelType | null | undefined): string => {
  if (!fuelType) return '-'
  return FUEL_TYPE_OPTIONS.find((opt) => opt.value === fuelType)?.label || fuelType
}

export const getTransmissionTypeLabel = (
  transmissionType: CatalogEngineTransmissionType | null | undefined
): string => {
  if (!transmissionType) return '-'
  return (
    TRANSMISSION_TYPE_OPTIONS.find((opt) => opt.value === transmissionType)?.label ||
    transmissionType
  )
}

export const getDriveTypeLabel = (
  driveType: CatalogEngineDriveType | null | undefined
): string => {
  if (!driveType) return '-'
  return DRIVE_TYPE_OPTIONS.find((opt) => opt.value === driveType)?.label || driveType
}
