import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import {
  OfferCalculation,
  OfferCalculationFeature,
  OfferCalculationAvailability,
} from '../../../offer/offer-calculation.entity';
import { IndividualOffer } from '../../../offer/offer.entity';
import { CatalogColor } from '../../../catalog/color/catalog-color.entity';
import { CatalogColorType } from '../../../common/enums/catalog/catalog-color-type.enum';
import { randomInt, vehicleData } from './seed-utils';

/**
 * Generate calculations with features for individual offers
 */
export async function generateOfferCalculations(
  dataSource: DataSource,
  individualOffers: IndividualOffer[],
  calculationsPerOffer: number
): Promise<OfferCalculation[]> {
  const calculationRepository = dataSource.getRepository(OfferCalculation);
  const featureRepository = dataSource.getRepository(OfferCalculationFeature);
  const catalogColorRepository = dataSource.getRepository(CatalogColor);

  const exteriorColors = await catalogColorRepository.find({
    where: { type: CatalogColorType.EXTERIOR },
  });

  const interiorColors = await catalogColorRepository.find({
    where: { type: CatalogColorType.INTERIOR },
  });

  console.log(`📊 Generating ${calculationsPerOffer} calculations per individual offer...`);

  const calculations: Partial<OfferCalculation>[] = [];
  const availabilityStatuses = Object.values(OfferCalculationAvailability);

  for (const offer of individualOffers) {
    for (let i = 0; i < calculationsPerOffer; i++) {
      calculations.push({
        offer,
        offerId: offer.id,
        availability: faker.helpers.arrayElement(availabilityStatuses),
        exteriorColor: exteriorColors.length > 0
          ? faker.helpers.arrayElement(exteriorColors)
          : undefined,
        interiorColor: interiorColors.length > 0
          ? faker.helpers.arrayElement(interiorColors)
          : undefined,
      });
    }
  }

  const savedCalculations = await calculationRepository.save(calculations);
  console.log(`✅ Generated ${savedCalculations.length} offer calculations`);

  // Generate features for each calculation
  console.log(`  🔧 Generating features for calculations...`);
  const features: Partial<OfferCalculationFeature>[] = [];

  for (const calculation of savedCalculations) {
    const featureCount = randomInt(2, 6);
    const selectedFeatures = faker.helpers.arrayElements(
      vehicleData.equipment,
      featureCount
    );

    for (const featureName of selectedFeatures) {
      features.push({
        calculation,
        calculationId: calculation.id,
        featureName,
        featureDescription: faker.commerce.productDescription(),
      });
    }
  }

  const savedFeatures = await featureRepository.save(features);
  console.log(`  ✅ Generated ${savedFeatures.length} calculation features`);

  return savedCalculations;
}
