import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OfferOptionalEquipment } from '../../../offer/offer-optional-equipment.entity';
import { OperationalLeasingOffer } from '../../../offer/offer.entity';
import { randomFloat, randomBoolean, vehicleData } from './seed-utils';

/**
 * Generate optional equipment for operational leasing offers
 */
export async function generateOfferEquipment(
  dataSource: DataSource,
  operationalOffers: OperationalLeasingOffer[],
  equipmentPerOffer: number
): Promise<OfferOptionalEquipment[]> {
  const equipmentRepository = dataSource.getRepository(OfferOptionalEquipment);

  console.log(`🔧 Generating ${equipmentPerOffer} equipment items per operational leasing offer...`);

  const equipment: Partial<OfferOptionalEquipment>[] = [];

  for (const offer of operationalOffers) {
    // Randomly select equipment items
    const selectedEquipment = faker.helpers.arrayElements(
      vehicleData.equipment,
      equipmentPerOffer
    );

    for (const equipmentName of selectedEquipment) {
      equipment.push({
        offer,
        offerId: offer.id,
        name: equipmentName,
        description: faker.commerce.productDescription(),
        additionalPrice: randomFloat(100, 5000, 2),
        isAvailable: randomBoolean(0.9), // 90% available
      });
    }
  }

  const savedEquipment = await equipmentRepository.save(equipment);
  console.log(`✅ Generated ${savedEquipment.length} offer equipment items`);

  return savedEquipment;
}
