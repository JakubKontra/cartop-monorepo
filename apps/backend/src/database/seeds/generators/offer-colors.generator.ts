import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OfferColorVariant } from '../../../offer/offer-color-variant.entity';
import { OperationalLeasingOffer } from '../../../offer/offer.entity';
import { CatalogColor } from '../../../catalog/color/catalog-color.entity';
import { CatalogColorType } from '../../../common/enums/catalog/catalog-color-type.enum';

/**
 * Generate color variants for operational leasing offers
 */
export async function generateOfferColorVariants(
  dataSource: DataSource,
  operationalOffers: OperationalLeasingOffer[],
  colorsPerOffer: number
): Promise<OfferColorVariant[]> {
  const colorVariantRepository = dataSource.getRepository(OfferColorVariant);
  const catalogColorRepository = dataSource.getRepository(CatalogColor);

  const exteriorColors = await catalogColorRepository.find({
    where: { type: CatalogColorType.EXTERIOR },
  });

  const interiorColors = await catalogColorRepository.find({
    where: { type: CatalogColorType.INTERIOR },
  });

  if (exteriorColors.length === 0 || interiorColors.length === 0) {
    console.log('⚠️  No colors found, skipping color variants generation');
    return [];
  }

  console.log(`🎨 Generating ${colorsPerOffer} color variants per operational leasing offer...`);

  const colorVariants: Partial<OfferColorVariant>[] = [];

  for (const offer of operationalOffers) {
    for (let i = 0; i < colorsPerOffer; i++) {
      const exteriorColor = faker.helpers.arrayElement(exteriorColors);
      const interiorColor = faker.helpers.arrayElement(interiorColors);

      colorVariants.push({
        offer,
        offerId: offer.id,
        exteriorColor,
        exteriorColorId: exteriorColor.id,
        interiorColor,
        interiorColorId: interiorColor.id,
        colorName: `${exteriorColor.name} / ${interiorColor.name}`,
        isDefault: i === 0, // First color variant is default
      });
    }
  }

  const savedColorVariants = await colorVariantRepository.save(colorVariants);
  console.log(`✅ Generated ${savedColorVariants.length} offer color variants`);

  return savedColorVariants;
}
