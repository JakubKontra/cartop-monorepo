import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { OperationalLeasingOffer, DirectPurchaseOffer, IndividualOffer } from '../../../offer/offer.entity';
import { CatalogModelGeneration } from '../../../catalog/generation/catalog-model-generation.entity';
import { User } from '../../../model/user/user.entity';
import { OfferType } from '../../../offer/enums/offer-type.enum';
import { IndividualOfferStatus } from '../../../offer/enums/individual-offer-status.enum';
import { SlugGenerator, randomBoolean, randomFloat, randomInt } from './seed-utils';

interface OfferCounts {
  operationalLeasing: number;
  directPurchase: number;
  individual: number;
}

/**
 * Generate all three types of offers
 */
export async function generateOffers(
  dataSource: DataSource,
  generations: CatalogModelGeneration[],
  counts: OfferCounts
): Promise<{
  operational: OperationalLeasingOffer[];
  directPurchase: DirectPurchaseOffer[];
  individual: IndividualOffer[];
}> {
  const offerRepository = dataSource.getRepository(OperationalLeasingOffer);
  const userRepository = dataSource.getRepository(User);
  const slugGenerator = new SlugGenerator();

  // Get active generations only
  const activeGenerations = generations.filter(g => g.isActive);
  if (activeGenerations.length === 0) {
    console.log('⚠️  No active generations found, using all generations');
  }
  const targetGenerations = activeGenerations.length > 0 ? activeGenerations : generations;

  // Get users for individual offers
  const users = await userRepository.find();
  const customers = users.filter(u => u.roles.includes('customer' as any));

  console.log(`💰 Generating offers...`);

  // Generate Operational Leasing Offers
  console.log(`  📋 Generating ${counts.operationalLeasing} operational leasing offers...`);
  const operationalOffers: Partial<OperationalLeasingOffer>[] = [];

  for (let i = 0; i < counts.operationalLeasing; i++) {
    const generation = faker.helpers.arrayElement(targetGenerations);
    const basePrice = randomFloat(20000, 80000, 2);
    const monthlyPayment = randomFloat(300, 1500, 2);
    const leasingDurationMonths = faker.helpers.arrayElement([12, 24, 36, 48, 60]);
    const downPayment = randomFloat(0, 10000, 2);

    operationalOffers.push({
      type: OfferType.OPERATIONAL_LEASING,
      slug: slugGenerator.generateUnique(`lease-${generation.slug}-${i}`),
      isPublic: randomBoolean(0.9), // 90% public
      isActive: randomBoolean(0.85), // 85% active
      totalPrice: basePrice,
      description: faker.commerce.productDescription(),
      modelGeneration: generation,
      modelGenerationId: generation.id,
      brand: generation.brand,
      brandId: generation.brandId,
      model: generation.model,
      modelId: generation.modelId,
      // Operational leasing specific
      leasingDurationMonths,
      monthlyPayment,
      annualMileageLimit: faker.helpers.arrayElement([10000, 15000, 20000, 25000, 30000]),
      downPaymentLeasing: downPayment,
      hasServiceIncluded: randomBoolean(0.6),
      hasWinterTyresIncluded: randomBoolean(0.5),
      hasAssistanceServiceIncluded: randomBoolean(0.7),
      hasGapIncluded: randomBoolean(0.4),
    });
  }

  const savedOperational = await offerRepository.save(operationalOffers as any);
  console.log(`  ✅ Generated ${savedOperational.length} operational leasing offers`);

  // Generate Direct Purchase Offers
  console.log(`  📋 Generating ${counts.directPurchase} direct purchase offers...`);
  const directPurchaseOffers: Partial<DirectPurchaseOffer>[] = [];

  for (let i = 0; i < counts.directPurchase; i++) {
    const generation = faker.helpers.arrayElement(targetGenerations);
    const basePrice = randomFloat(25000, 100000, 2);
    const discountPercentage = randomFloat(0, 20, 2);
    const discountAmount = basePrice * (discountPercentage / 100);

    directPurchaseOffers.push({
      type: OfferType.DIRECT_PURCHASE,
      slug: slugGenerator.generateUnique(`purchase-${generation.slug}-${i}`),
      isPublic: randomBoolean(0.95), // 95% public
      isActive: randomBoolean(0.9), // 90% active
      totalPrice: basePrice - discountAmount,
      description: faker.commerce.productDescription(),
      modelGeneration: generation,
      modelGenerationId: generation.id,
      brand: generation.brand,
      brandId: generation.brandId,
      model: generation.model,
      modelId: generation.modelId,
      // Direct purchase specific
      discountAmount,
      discountPercentage,
      includesWarranty: randomBoolean(0.8),
      warrantyYears: randomInt(2, 5),
      financingAvailable: randomBoolean(0.7),
    });
  }

  const savedDirectPurchase = await offerRepository.save(directPurchaseOffers as any);
  console.log(`  ✅ Generated ${savedDirectPurchase.length} direct purchase offers`);

  // Generate Individual Offers
  console.log(`  📋 Generating ${counts.individual} individual offers...`);
  const individualOffers: Partial<IndividualOffer>[] = [];

  for (let i = 0; i < counts.individual; i++) {
    const generation = faker.helpers.arrayElement(targetGenerations);
    const customer = customers.length > 0
      ? faker.helpers.arrayElement(customers)
      : users.length > 0
        ? faker.helpers.arrayElement(users)
        : undefined;

    if (!customer) {
      console.log('⚠️  No users found for individual offers, skipping...');
      break;
    }

    const basePrice = randomFloat(30000, 120000, 2);
    const status = faker.helpers.arrayElement(Object.values(IndividualOfferStatus));

    individualOffers.push({
      type: OfferType.INDIVIDUAL,
      slug: slugGenerator.generateUnique(`individual-${generation.slug}-${i}`),
      isPublic: false, // Individual offers are never public
      isActive: randomBoolean(0.7), // 70% active
      totalPrice: basePrice,
      description: faker.lorem.paragraph(),
      modelGeneration: generation,
      modelGenerationId: generation.id,
      brand: generation.brand,
      brandId: generation.brandId,
      model: generation.model,
      modelId: generation.modelId,
      // Individual offer specific
      customer,
      customerId: customer.id,
      status,
      customRequirements: JSON.stringify({
        preferences: faker.lorem.sentences(2),
        specialRequests: faker.lorem.sentence(),
      }),
      internalNotes: faker.lorem.paragraph(),
      assignedTo: users.length > 1 ? faker.helpers.arrayElement(users) : undefined,
      responseDeadline: status === IndividualOfferStatus.NEW
        ? faker.date.future({ years: 0.25 })
        : undefined,
    });
  }

  const savedIndividual = await offerRepository.save(individualOffers as any);
  console.log(`  ✅ Generated ${savedIndividual.length} individual offers`);

  return {
    operational: savedOperational as OperationalLeasingOffer[],
    directPurchase: savedDirectPurchase as DirectPurchaseOffer[],
    individual: savedIndividual as IndividualOffer[],
  };
}
