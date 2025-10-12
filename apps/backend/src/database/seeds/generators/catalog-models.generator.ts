import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { CatalogModel } from '../../../catalog/model/catalog-model.entity';
import { CatalogBrand } from '../../../catalog/brand/catalog-brand.entity';
import { SlugGenerator, randomBoolean, vehicleData, generateVehicleDescription } from './seed-utils';

/**
 * Generate catalog models for each brand
 */
export async function generateCatalogModels(
  dataSource: DataSource,
  brands: CatalogBrand[],
  modelsPerBrand: number
): Promise<CatalogModel[]> {
  const modelRepository = dataSource.getRepository(CatalogModel);
  const slugGenerator = new SlugGenerator();

  console.log(`🚗 Generating ${modelsPerBrand} models per brand...`);

  const models: Partial<CatalogModel>[] = [];

  for (const brand of brands) {
    for (let i = 0; i < modelsPerBrand; i++) {
      const modelNumber = faker.vehicle.model();
      const suffix = faker.helpers.arrayElement(vehicleData.modelSuffixes);
      const modelName = `${modelNumber} ${suffix}`;
      const slug = slugGenerator.generateUnique(`${brand.slug}-${modelName}`);

      models.push({
        name: modelName,
        slug,
        brand,
        brandId: brand.id,
        description: generateVehicleDescription(),
        isActive: randomBoolean(0.8), // 80% active
        isHighlighted: randomBoolean(0.25), // 25% highlighted
        isRecommended: randomBoolean(0.35), // 35% recommended
      });
    }
  }

  const savedModels = await modelRepository.save(models);
  console.log(`✅ Generated ${savedModels.length} catalog models`);

  return savedModels;
}
