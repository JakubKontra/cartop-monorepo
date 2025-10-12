import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { CatalogModelGeneration } from '../../../catalog/generation/catalog-model-generation.entity';
import { CatalogModel } from '../../../catalog/model/catalog-model.entity';
import { CatalogBodyType } from '../../../common/enums/catalog/catalog-body-type.enum';
import { CatalogEquipmentBrakeType } from '../../../common/enums/catalog/catalog-equipment-brake-type.enum';
import { SlugGenerator, randomBoolean, randomInt, vehicleData } from './seed-utils';

/**
 * Generate model generations with detailed specifications
 */
export async function generateCatalogGenerations(
  dataSource: DataSource,
  models: CatalogModel[],
  generationsPerModel: number
): Promise<CatalogModelGeneration[]> {
  const generationRepository = dataSource.getRepository(CatalogModelGeneration);
  const slugGenerator = new SlugGenerator();

  console.log(`🔧 Generating ${generationsPerModel} generations per model...`);

  const generations: Partial<CatalogModelGeneration>[] = [];
  const bodyTypes = Object.values(CatalogBodyType);
  const brakeTypes = Object.values(CatalogEquipmentBrakeType);

  for (const model of models) {
    for (let i = 0; i < generationsPerModel; i++) {
      const { startYear, endYear } = vehicleData.generationYears();
      const generationName = `Gen ${i + 1} (${startYear}${endYear ? `-${endYear}` : '+'})`;
      const slug = slugGenerator.generateUnique(`${model.slug}-${generationName}`);

      generations.push({
        name: generationName,
        slug,
        model,
        modelId: model.id,
        brand: model.brand,
        brandId: model.brandId,
        description: `${generationName} generation with enhanced features and performance improvements.`,
        productionStart: new Date(startYear, 0, 1),
        productionStop: endYear ? new Date(endYear, 11, 31) : undefined,

        // Dimensions (in mm)
        wheelbase: randomInt(2400, 3100),
        frontTrack: randomInt(1400, 1700),
        rearTrack: randomInt(1400, 1700),
        length: randomInt(4000, 5500),
        width: randomInt(1700, 2100),
        height: randomInt(1400, 1800),

        // Trunk space (in liters)
        trunkSpaceMin: randomInt(300, 600),
        trunkSpaceMax: randomInt(1000, 2000),

        // Body type and brakes
        bodyType: faker.helpers.arrayElement(bodyTypes),
        frontBrakesType: faker.helpers.arrayElement(brakeTypes),
        rearBrakesType: faker.helpers.arrayElement(brakeTypes),

        isActive: randomBoolean(0.75), // 75% active
      });
    }
  }

  const savedGenerations = await generationRepository.save(generations);
  console.log(`✅ Generated ${savedGenerations.length} catalog generations`);

  return savedGenerations;
}
