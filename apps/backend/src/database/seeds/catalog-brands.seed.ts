import { DataSource } from 'typeorm';
import { CatalogBrand } from '../../catalog/brand/catalog-brand.entity';

/**
 * Seed script for catalog brands
 * Usage: yarn seed:brands
 */

const brands = [
  {
    name: 'BMW',
    slug: 'bmw',
    description: 'Bayerische Motoren Werke AG, commonly known as BMW, is a German multinational manufacturer of luxury vehicles and motorcycles.',
    isActive: true,
    isHighlighted: true,
    isRecommended: true,
  },
  {
    name: 'Mercedes-Benz',
    slug: 'mercedes-benz',
    description: 'Mercedes-Benz is a German luxury and commercial vehicle automotive brand established in 1926.',
    isActive: true,
    isHighlighted: true,
    isRecommended: true,
  },
  {
    name: 'Audi',
    slug: 'audi',
    description: 'Audi AG is a German automotive manufacturer of luxury vehicles headquartered in Ingolstadt, Bavaria, Germany.',
    isActive: true,
    isHighlighted: true,
    isRecommended: false,
  },
  {
    name: 'Volkswagen',
    slug: 'volkswagen',
    description: 'Volkswagen is a German motor vehicle manufacturer headquartered in Wolfsburg, Lower Saxony, Germany.',
    isActive: true,
    isHighlighted: false,
    isRecommended: true,
  },
  {
    name: 'Toyota',
    slug: 'toyota',
    description: 'Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota City, Aichi, Japan.',
    isActive: true,
    isHighlighted: false,
    isRecommended: true,
  },
  {
    name: 'Honda',
    slug: 'honda',
    description: 'Honda Motor Co., Ltd. is a Japanese public multinational conglomerate manufacturer of automobiles, motorcycles, and power equipment.',
    isActive: true,
    isHighlighted: false,
    isRecommended: false,
  },
  {
    name: 'Ford',
    slug: 'ford',
    description: 'Ford Motor Company is an American multinational automobile manufacturer headquartered in Dearborn, Michigan, United States.',
    isActive: true,
    isHighlighted: false,
    isRecommended: false,
  },
  {
    name: 'Porsche',
    slug: 'porsche',
    description: 'Porsche AG is a German automobile manufacturer specializing in high-performance sports cars, SUVs and sedans.',
    isActive: true,
    isHighlighted: true,
    isRecommended: true,
  },
  {
    name: 'Tesla',
    slug: 'tesla',
    description: 'Tesla, Inc. is an American multinational automotive and clean energy company headquartered in Austin, Texas.',
    isActive: true,
    isHighlighted: true,
    isRecommended: true,
  },
  {
    name: 'Nissan',
    slug: 'nissan',
    description: 'Nissan Motor Co., Ltd. is a Japanese multinational automobile manufacturer headquartered in Yokohama, Kanagawa, Japan.',
    isActive: true,
    isHighlighted: false,
    isRecommended: false,
  },
  {
    name: 'Mazda',
    slug: 'mazda',
    description: 'Mazda Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Fuchū, Hiroshima, Japan.',
    isActive: true,
    isHighlighted: false,
    isRecommended: false,
  },
  {
    name: 'Hyundai',
    slug: 'hyundai',
    description: 'Hyundai Motor Company is a South Korean multinational automotive manufacturer headquartered in Seoul, South Korea.',
    isActive: true,
    isHighlighted: false,
    isRecommended: false,
  },
  {
    name: 'Kia',
    slug: 'kia',
    description: 'Kia Corporation is a South Korean multinational automobile manufacturer headquartered in Seoul, South Korea.',
    isActive: true,
    isHighlighted: false,
    isRecommended: false,
  },
  {
    name: 'Volvo',
    slug: 'volvo',
    description: 'Volvo Car Corporation is a Swedish multinational manufacturer of luxury vehicles headquartered in Gothenburg.',
    isActive: true,
    isHighlighted: false,
    isRecommended: true,
  },
  {
    name: 'Škoda',
    slug: 'skoda',
    description: 'Škoda Auto is a Czech automobile manufacturer established in 1925 as the successor to Laurin & Klement.',
    isActive: true,
    isHighlighted: false,
    isRecommended: true,
  },
];

export async function seedCatalogBrands(dataSource: DataSource): Promise<void> {
  const brandRepository = dataSource.getRepository(CatalogBrand);

  console.log('🌱 Seeding catalog brands...');

  // Check if brands already exist
  const existingCount = await brandRepository.count();
  if (existingCount > 0) {
    console.log(`⏭️  Skipping: ${existingCount} brands already exist`);
    return;
  }

  // Insert brands
  const createdBrands = await brandRepository.save(brands);
  console.log(`✅ Successfully seeded ${createdBrands.length} catalog brands`);

  // Show summary
  const highlighted = createdBrands.filter(b => b.isHighlighted).length;
  const recommended = createdBrands.filter(b => b.isRecommended).length;
  console.log(`   - ${highlighted} highlighted brands`);
  console.log(`   - ${recommended} recommended brands`);
}

// Allow running this script directly
if (require.main === module) {
  const { DataSource } = require('typeorm');
  const { config } = require('dotenv');

  // Load environment variables
  config({ path: '.env' });

  // Create DataSource with environment variables
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'cartop_v3',
    entities: ['src/**/*.entity.ts'],
    synchronize: true, // Force synchronize to create tables
  });

  AppDataSource.initialize()
    .then(async (dataSource) => {
      await seedCatalogBrands(dataSource);
      await dataSource.destroy();
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error seeding brands:', error);
      process.exit(1);
    });
}
