import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OfferOptionalEquipment } from '../../../offer/offer-optional-equipment.entity';
import { OfferAdditionalEquipmentItem } from '../../../offer/offer-additional-equipment-item.entity';
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
  const equipmentItemRepository = dataSource.getRepository(OfferAdditionalEquipmentItem);

  console.log(`🔧 Generating equipment catalog and assignments...`);

  // First, create equipment items catalog (if not exists)
  const equipmentItems: Partial<OfferAdditionalEquipmentItem>[] = [];
  for (const equipmentName of vehicleData.equipment) {
    equipmentItems.push({
      name: equipmentName,
      description: faker.commerce.productDescription(),
      category: faker.helpers.arrayElement(['Safety', 'Comfort', 'Technology', 'Towing', 'Other']),
    });
  }

  const savedEquipmentItems = await equipmentItemRepository.save(equipmentItems);
  console.log(`✅ Created ${savedEquipmentItems.length} equipment catalog items`);

  // Now link equipment items to offers
  const equipment: Partial<OfferOptionalEquipment>[] = [];

  for (const offer of operationalOffers) {
    // Randomly select equipment items
    const selectedItems = faker.helpers.arrayElements(
      savedEquipmentItems,
      Math.min(equipmentPerOffer, savedEquipmentItems.length)
    );

    for (const item of selectedItems) {
      equipment.push({
        offer,
        offerId: offer.id,
        equipmentItem: item,
        equipmentItemId: item.id,
        additionalPrice: randomFloat(100, 5000, 0),
        currency: 'CZK',
        pricePeriod: 'MONTHLY' as any,
        isAvailable: randomBoolean(0.9), // 90% available
        isDefaultSelected: randomBoolean(0.2), // 20% default selected
      });
    }
  }

  const savedEquipment = await equipmentRepository.save(equipment);
  console.log(`✅ Generated ${savedEquipment.length} offer equipment assignments`);

  return savedEquipment;
}
