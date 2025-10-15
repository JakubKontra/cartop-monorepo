import { DataSource } from 'typeorm';
import { CarRequestState } from '../../../car-request/entities/car-request-state.entity';

/**
 * Car Request State Definitions
 * These match the frontend constants in apps/admin/src/features/car-requests/constants/states.ts
 *
 * IMPORTANT: UUIDs are deterministic and should never be changed
 */
const CAR_REQUEST_STATES = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Dovoláno',
    code: 'CALLED',
    colorHex: '#3b82f6',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Nedovoláno',
    code: 'NOT_REACHED',
    colorHex: '#f59e0b',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Zaslány nabídky',
    code: 'OFFERS_SENT',
    colorHex: '#8b5cf6',
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Dodává podklady',
    code: 'PROVIDING_DOCUMENTS',
    colorHex: '#06b6d4',
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'Předáno/Risk',
    code: 'FORWARDED_RISK',
    colorHex: '#f97316',
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'Koupeno/Objednáno',
    code: 'PURCHASED',
    colorHex: '#10b981',
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    name: 'Zrušeno',
    code: 'CANCELLED',
    colorHex: '#ef4444',
  },
] as const;

/**
 * Generate car request states
 */
export async function generateCarRequestStates(
  dataSource: DataSource
): Promise<CarRequestState[]> {
  const stateRepository = dataSource.getRepository(CarRequestState);

  console.log(`🎨 Generating ${CAR_REQUEST_STATES.length} car request states...`);

  // Check if states already exist
  const existingStates = await stateRepository.find();

  if (existingStates.length > 0) {
    console.log(`ℹ️  Found ${existingStates.length} existing states, updating...`);

    // Update or insert states with deterministic UUIDs
    for (const stateDefinition of CAR_REQUEST_STATES) {
      const existing = existingStates.find(s => s.id === stateDefinition.id || s.code === stateDefinition.code);

      if (existing) {
        // Update existing state (ensure ID and code match)
        await stateRepository.update(existing.id, {
          id: stateDefinition.id, // Ensure the ID is the deterministic one
          name: stateDefinition.name,
          code: stateDefinition.code,
          colorHex: stateDefinition.colorHex,
        });
      } else {
        // Create new state with deterministic UUID
        await stateRepository.save({
          id: stateDefinition.id,
          name: stateDefinition.name,
          code: stateDefinition.code,
          colorHex: stateDefinition.colorHex,
        });
      }
    }

    const updatedStates = await stateRepository.find();
    console.log(`✅ Updated ${updatedStates.length} car request states`);
    return updatedStates;
  }

  // Create new states with deterministic UUIDs
  const states = CAR_REQUEST_STATES.map(state => ({
    id: state.id,
    name: state.name,
    code: state.code,
    colorHex: state.colorHex,
  }));

  const savedStates = await stateRepository.save(states);
  console.log(`✅ Generated ${savedStates.length} car request states`);

  return savedStates;
}
