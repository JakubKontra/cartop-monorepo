import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OfferLeasingVariant } from '../../../offer/offer-leasing-variant.entity';
import { OperationalLeasingOffer } from '../../../offer/offer.entity';
import { LeasingCompany } from '../../../leasing-company/leasing-company.entity';
import { SlugGenerator, randomBoolean, randomFloat, randomInt } from './seed-utils';

/**
 * Generate leasing variants for operational leasing offers
 */
export async function generateOfferVariants(
  dataSource: DataSource,
  operationalOffers: OperationalLeasingOffer[],
  variantsPerOffer: number
): Promise<OfferLeasingVariant[]> {
  const variantRepository = dataSource.getRepository(OfferLeasingVariant);
  const leasingCompanyRepository = dataSource.getRepository(LeasingCompany);
  const slugGenerator = new SlugGenerator();

  const leasingCompanies = await leasingCompanyRepository.find();

  console.log(`🔄 Generating ${variantsPerOffer} variants per operational leasing offer...`);

  const variants: Partial<OfferLeasingVariant>[] = [];

  const durations = [12, 24, 36, 48, 60];
  const mileageLimits = [10000, 15000, 20000, 25000, 30000];

  for (const offer of operationalOffers) {
    for (let i = 0; i < variantsPerOffer; i++) {
      const duration = faker.helpers.arrayElement(durations);
      const mileage = faker.helpers.arrayElement(mileageLimits);
      const priceWithoutVat = randomInt(8000, 60000); // Monthly price in CZK without VAT
      const vatRate = 21.0;
      const priceWithVat = Math.round(priceWithoutVat * (1 + vatRate / 100));
      const originalPriceWithoutVat = Math.round(priceWithoutVat * randomFloat(1.05, 1.2, 2));
      const originalPriceWithVat = Math.round(originalPriceWithoutVat * (1 + vatRate / 100));

      variants.push({
        offer,
        offerId: offer.id,
        slug: slugGenerator.generateUnique(`${offer.slug}-variant-${i}`),
        leasingDurationMonths: duration,
        annualMileageLimit: mileage,
        currency: 'CZK',
        vatRate,
        priceWithoutVat,
        priceWithVat,
        originalPriceWithoutVat,
        originalPriceWithVat,
        pricePeriod: 'MONTHLY' as any,
        downPayment: randomInt(0, 50000),
        securityDeposit: randomInt(0, 20000),
        setupFee: randomInt(0, 5000),
        hasServiceIncluded: randomBoolean(0.6),
        hasWinterTyresIncluded: randomBoolean(0.5),
        hasAssistanceServiceIncluded: randomBoolean(0.7),
        hasGapIncluded: randomBoolean(0.4),
        hasGlassInsuranceIncluded: randomBoolean(0.3),
        hasHighwayIncluded: randomBoolean(0.5),
        wearTolerancePercent: randomInt(0, 20),
        freeMileageLimit: randomInt(0, 5000),
        isDefault: i === 0, // First variant is default
        isBestOffer: i === 1 && randomBoolean(0.5), // Second variant might be best offer
        isActive: true,
        leasingCompany: leasingCompanies.length > 0
          ? faker.helpers.arrayElement(leasingCompanies)
          : undefined,
      });
    }
  }

  const savedVariants = await variantRepository.save(variants);
  console.log(`✅ Generated ${savedVariants.length} offer variants`);

  return savedVariants;
}
