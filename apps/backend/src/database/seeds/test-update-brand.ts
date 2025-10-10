// Load environment variables FIRST before any other imports
// This ensures env vars are available when decorators are evaluated
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import { DataSource } from 'typeorm';
import { CatalogBrand } from '../../catalog/brand/catalog-brand.entity';

/**
 * Test script to update a brand and trigger @Watch decorator
 * This will test the cache invalidation webhook
 */

// Create DataSource
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'cartop_v3',
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
});

async function updateAudiBrand() {
  console.log('🔄 Connecting to database...');

  const dataSource = await AppDataSource.initialize();
  const brandRepository = dataSource.getRepository(CatalogBrand);

  try {
    // Find Audi brand
    const audi = await brandRepository.findOne({
      where: { slug: 'audi' },
    });

    if (!audi) {
      console.error('❌ Audi brand not found');
      process.exit(1);
    }

    console.log('\n📋 Current Audi data:');
    console.log(`   Name: ${audi.name}`);
    console.log(`   Slug: ${audi.slug}`);
    console.log(`   Description: ${audi.description?.substring(0, 50)}...`);
    console.log(`   Highlighted: ${audi.isHighlighted}`);
    console.log(`   Recommended: ${audi.isRecommended}`);

    // Update Audi
    const timestamp = new Date().toLocaleTimeString();
    audi.name = `Audi - Updated at ${timestamp}`;
    audi.description = `Audi AG is a German automotive manufacturer of luxury vehicles. Last updated: ${new Date().toLocaleString()}`;
    audi.isRecommended = !audi.isRecommended;

    console.log('\n🔄 Updating Audi brand...');
    await brandRepository.save(audi);

    console.log('\n✅ Audi brand updated successfully!');
    console.log('\n📋 New Audi data:');
    console.log(`   Name: ${audi.name}`);
    console.log(`   Description: ${audi.description.substring(0, 80)}...`);
    console.log(`   Recommended: ${audi.isRecommended}`);

    console.log('\n🔔 Watch decorator should trigger webhook to client...');
    console.log('   Check backend logs for webhook notification');
    console.log('   Check client logs for revalidation');
    console.log('\n🌐 Visit http://localhost:3000/brands/audi to see changes');
    console.log('   (Wait 1-5 seconds for debounce, then refresh)');

  } catch (error) {
    console.error('❌ Error updating brand:', error);
    throw error;
  } finally {
    await dataSource.destroy();
  }
}

updateAudiBrand()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
