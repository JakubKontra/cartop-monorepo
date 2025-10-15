import { DataSource } from 'typeorm';
import { CarRequestStatus } from '../../../car-request/entities/car-request-status.entity';

/**
 * Car Request Status Definitions
 * These represent the overall status of a car request in the workflow
 * (different from CarRequestState which represents specific workflow states)
 *
 * IMPORTANT: UUIDs are deterministic and should never be changed
 */
const CAR_REQUEST_STATUSES = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    name: 'Nová',
    code: 'NEW',
    columnDisplayOrder: 0,
    displayOrder: 0,
    isFinal: false,
    colorHex: '#3b82f6',
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    name: 'V procesu',
    code: 'IN_PROGRESS',
    columnDisplayOrder: 1,
    displayOrder: 1,
    isFinal: false,
    colorHex: '#8b5cf6',
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    name: 'Čeká na zákazníka',
    code: 'WAITING_FOR_CUSTOMER',
    columnDisplayOrder: 2,
    displayOrder: 2,
    isFinal: false,
    colorHex: '#f59e0b',
  },
  {
    id: '10000000-0000-0000-0000-000000000004',
    name: 'Dokončeno',
    code: 'COMPLETED',
    columnDisplayOrder: 3,
    displayOrder: 3,
    isFinal: true,
    colorHex: '#10b981',
  },
  {
    id: '10000000-0000-0000-0000-000000000005',
    name: 'Zrušeno',
    code: 'CANCELLED',
    columnDisplayOrder: 4,
    displayOrder: 4,
    isFinal: true,
    colorHex: '#ef4444',
  },
] as const;

/**
 * Generate car request statuses
 */
export async function generateCarRequestStatuses(
  dataSource: DataSource
): Promise<CarRequestStatus[]> {
  const statusRepository = dataSource.getRepository(CarRequestStatus);

  console.log(`📋 Generating ${CAR_REQUEST_STATUSES.length} car request statuses...`);

  // Check if statuses already exist
  const existingStatuses = await statusRepository.find();

  if (existingStatuses.length > 0) {
    console.log(`ℹ️  Found ${existingStatuses.length} existing statuses, updating...`);

    // Update or insert statuses with deterministic UUIDs
    for (const statusDefinition of CAR_REQUEST_STATUSES) {
      const existing = existingStatuses.find(s => s.id === statusDefinition.id || s.code === statusDefinition.code);

      if (existing) {
        // Update existing status (ensure ID and code match)
        await statusRepository.update(existing.id, {
          id: statusDefinition.id, // Ensure the ID is the deterministic one
          name: statusDefinition.name,
          code: statusDefinition.code,
          columnDisplayOrder: statusDefinition.columnDisplayOrder,
          displayOrder: statusDefinition.displayOrder,
          isFinal: statusDefinition.isFinal,
          colorHex: statusDefinition.colorHex,
        });
      } else {
        // Create new status with deterministic UUID
        await statusRepository.save({
          id: statusDefinition.id,
          name: statusDefinition.name,
          code: statusDefinition.code,
          columnDisplayOrder: statusDefinition.columnDisplayOrder,
          displayOrder: statusDefinition.displayOrder,
          isFinal: statusDefinition.isFinal,
          colorHex: statusDefinition.colorHex,
        });
      }
    }

    const updatedStatuses = await statusRepository.find();
    console.log(`✅ Updated ${updatedStatuses.length} car request statuses`);
    return updatedStatuses;
  }

  // Create new statuses with deterministic UUIDs
  const statuses = CAR_REQUEST_STATUSES.map(status => ({
    id: status.id,
    name: status.name,
    code: status.code,
    columnDisplayOrder: status.columnDisplayOrder,
    displayOrder: status.displayOrder,
    isFinal: status.isFinal,
    colorHex: status.colorHex,
  }));

  const savedStatuses = await statusRepository.save(statuses);
  console.log(`✅ Generated ${savedStatuses.length} car request statuses`);

  return savedStatuses;
}
