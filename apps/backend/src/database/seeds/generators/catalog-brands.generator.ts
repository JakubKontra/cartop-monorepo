import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { CatalogBrand } from '../../../catalog/brand/catalog-brand.entity';
import { File } from '../../../file/file.entity';
import { SlugGenerator, randomBoolean, vehicleData, generateCompanyDescription } from './seed-utils';

/**
 * Generate catalog brands with realistic data
 */
export async function generateCatalogBrands(
  dataSource: DataSource,
  count: number,
  files: File[]
): Promise<CatalogBrand[]> {
  const brandRepository = dataSource.getRepository(CatalogBrand);
  const slugGenerator = new SlugGenerator();

  console.log(`🏢 Generating ${count} catalog brands...`);

  const brands: Partial<CatalogBrand>[] = [];
  const imageFiles = files.filter(f => f.mimeType.startsWith('image/'));

  for (let i = 0; i < count; i++) {
    const brandName = i < vehicleData.brands.length
      ? vehicleData.brands[i]
      : faker.company.name();

    const slug = slugGenerator.generateUnique(brandName);

    brands.push({
      name: brandName,
      slug,
      description: generateCompanyDescription(),
      isActive: randomBoolean(0.85), // 85% active
      isHighlighted: randomBoolean(0.3), // 30% highlighted
      isRecommended: randomBoolean(0.4), // 40% recommended
      logo: imageFiles.length > 0
        ? faker.helpers.arrayElement(imageFiles)
        : undefined,
    });
  }

  const savedBrands = await brandRepository.save(brands);
  console.log(`✅ Generated ${savedBrands.length} catalog brands`);

  return savedBrands;
}
