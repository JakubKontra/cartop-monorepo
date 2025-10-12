import { DataSource } from 'typeorm';
import { CatalogColor } from '../../../catalog/color/catalog-color.entity';
import { CatalogColorType } from '../../../common/enums/catalog/catalog-color-type.enum';
import { SlugGenerator, vehicleData } from './seed-utils';

/**
 * Generate catalog colors (exterior and interior)
 */
export async function generateCatalogColors(
  dataSource: DataSource,
  exteriorCount: number,
  interiorCount: number
): Promise<CatalogColor[]> {
  const colorRepository = dataSource.getRepository(CatalogColor);
  const slugGenerator = new SlugGenerator();

  console.log(`🎨 Generating ${exteriorCount} exterior and ${interiorCount} interior colors...`);

  const colors: Partial<CatalogColor>[] = [];

  // Generate exterior colors
  for (let i = 0; i < exteriorCount; i++) {
    const colorData = vehicleData.colors.exterior[i % vehicleData.colors.exterior.length];
    const name = i < vehicleData.colors.exterior.length
      ? colorData.name
      : `${colorData.name} ${Math.floor(i / vehicleData.colors.exterior.length) + 1}`;

    colors.push({
      name,
      slug: slugGenerator.generateUnique(name),
      color: colorData.hex,
      type: CatalogColorType.EXTERIOR,
    });
  }

  // Generate interior colors
  for (let i = 0; i < interiorCount; i++) {
    const colorData = vehicleData.colors.interior[i % vehicleData.colors.interior.length];
    const name = i < vehicleData.colors.interior.length
      ? colorData.name
      : `${colorData.name} ${Math.floor(i / vehicleData.colors.interior.length) + 1}`;

    colors.push({
      name,
      slug: slugGenerator.generateUnique(name),
      color: colorData.hex,
      type: CatalogColorType.INTERIOR,
    });
  }

  const savedColors = await colorRepository.save(colors);
  console.log(`✅ Generated ${savedColors.length} catalog colors`);

  return savedColors;
}
