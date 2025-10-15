import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from '../../model/user/user.entity';
import { getSeedConfig } from './generators/seed-config';
import { generateFiles } from './generators/files.generator';
import { generateCatalogBrands } from './generators/catalog-brands.generator';
import { generateCatalogModels } from './generators/catalog-models.generator';
import { generateCatalogGenerations } from './generators/catalog-generations.generator';
import { generateCatalogColors } from './generators/catalog-colors.generator';
import { generateLeasingCompanies } from './generators/leasing-companies.generator';
import { generateOffers } from './generators/offers.generator';
import { generateOfferVariants } from './generators/offer-variants.generator';
import { generateOfferColorVariants } from './generators/offer-colors.generator';
import { generateOfferEquipment } from './generators/offer-equipment.generator';
import { generateOfferCalculations } from './generators/offer-calculations.generator';
import { generateCarRequestStates } from './generators/car-request-states.generator';
import { generateCarRequestStatuses } from './generators/car-request-statuses.generator';

/**
 * Main seeding script
 * Deletes all data except users, then seeds fresh data
 */
async function seedDatabase(dataSource: DataSource): Promise<void> {
  const startTime = Date.now();
  console.log('🌱 Starting database seeding...\n');

  const config = getSeedConfig();

  try {
    // Step 1: Backup users (if table exists)
    console.log('📦 Backing up users...');
    const userRepository = dataSource.getRepository(User);
    let existingUsers: User[] = [];
    try {
      existingUsers = await userRepository.find();
      console.log(`✅ Backed up ${existingUsers.length} users\n`);
    } catch (error) {
      console.log(`ℹ️  No existing users table found, starting fresh\n`);
    }

    // Step 2: Drop and recreate schema (except users)
    console.log('🗑️  Dropping all tables except users...');
    await dataSource.query('DROP SCHEMA public CASCADE;');
    await dataSource.query('CREATE SCHEMA public;');
    await dataSource.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    console.log('✅ Schema dropped and recreated\n');

    // Step 3: Synchronize schema
    console.log('🔄 Synchronizing database schema...');
    await dataSource.synchronize();
    console.log('✅ Schema synchronized\n');

    // Step 4: Restore users
    if (existingUsers.length > 0) {
      console.log('♻️  Restoring users...');
      await userRepository.save(existingUsers);
      console.log(`✅ Restored ${existingUsers.length} users\n`);
    }

    // Step 5: Generate seed data in proper order

    // Car Request States (independent, should be generated first)
    await generateCarRequestStates(dataSource);
    console.log('');

    // Car Request Statuses (independent, should be generated first)
    await generateCarRequestStatuses(dataSource);
    console.log('');

    // Files
    const files = await generateFiles(dataSource, config.files);
    console.log('');

    // Catalog: Brands
    const brands = await generateCatalogBrands(dataSource, config.brands, files);
    console.log('');

    // Catalog: Models
    const models = await generateCatalogModels(
      dataSource,
      brands,
      config.modelsPerBrand
    );
    console.log('');

    // Catalog: Generations
    const generations = await generateCatalogGenerations(
      dataSource,
      models,
      config.generationsPerModel
    );
    console.log('');

    // Catalog: Colors
    const colors = await generateCatalogColors(
      dataSource,
      config.colorsExterior,
      config.colorsInterior
    );
    console.log('');

    // Leasing Companies
    const leasingCompanies = await generateLeasingCompanies(
      dataSource,
      config.leasingCompanies,
      files
    );
    console.log('');

    // Offers (all types)
    const { operational, directPurchase, individual } = await generateOffers(
      dataSource,
      generations,
      {
        operationalLeasing: config.operationalLeasingOffers,
        directPurchase: config.directPurchaseOffers,
        individual: config.individualOffers,
      }
    );
    console.log('');

    // Offer Variants (for operational leasing)
    if (operational.length > 0) {
      await generateOfferVariants(
        dataSource,
        operational,
        config.variantsPerOffer
      );
      console.log('');
    }

    // Offer Color Variants (for operational leasing)
    if (operational.length > 0 && colors.length > 0) {
      await generateOfferColorVariants(
        dataSource,
        operational,
        config.colorVariantsPerOffer
      );
      console.log('');
    }

    // Offer Equipment (for operational leasing)
    if (operational.length > 0) {
      await generateOfferEquipment(
        dataSource,
        operational,
        config.equipmentItemsPerOffer
      );
      console.log('');
    }

    // Offer Calculations (for individual offers)
    if (individual.length > 0) {
      await generateOfferCalculations(
        dataSource,
        individual,
        config.calculationsPerIndividualOffer
      );
      console.log('');
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✅ Database seeding completed successfully in ${duration}s!`);
    console.log('\n📊 Summary:');
    console.log(`  - Users: ${existingUsers.length} (preserved)`);
    console.log(`  - Files: ${files.length}`);
    console.log(`  - Brands: ${brands.length}`);
    console.log(`  - Models: ${models.length}`);
    console.log(`  - Generations: ${generations.length}`);
    console.log(`  - Colors: ${colors.length}`);
    console.log(`  - Leasing Companies: ${leasingCompanies.length}`);
    console.log(`  - Operational Leasing Offers: ${operational.length}`);
    console.log(`  - Direct Purchase Offers: ${directPurchase.length}`);
    console.log(`  - Individual Offers: ${individual.length}`);

  } catch (error) {
    console.error('\n❌ Error during seeding:', error);
    throw error;
  }
}

/**
 * Bootstrap function to run the seeder
 */
async function bootstrap() {
  // Load environment variables
  config({ path: '.env' });

  // Create DataSource
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'cartop_v3',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: false, // We'll manually control synchronization
    logging: false, // Disable logging for cleaner output
  });

  try {
    console.log('🔌 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Connected to database\n');

    await seedDatabase(AppDataSource);

    await AppDataSource.destroy();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  bootstrap();
}
