import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../model/user/user.entity';
import { File } from '../../file/file.entity';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Seed script to create a catalog manager user
 * Email: catalog@cartop.cz
 * Password: 123456Ab
 */
async function createCatalogManagerUser() {
  // Initialize TypeORM connection
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'cartop_v3',
    entities: [User, File], // Include File entity for avatar relation
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('✓ Database connection established');

    const userRepository = dataSource.getRepository(User);

    // Check if catalog manager user already exists
    const existingUser = await userRepository.findOne({
      where: { email: 'catalog@cartop.cz' },
    });

    if (existingUser) {
      console.log('⚠ Catalog Manager user already exists, updating password...');

      // Hash the password
      const hashedPassword = await bcrypt.hash('123456Ab', 10);

      // Update existing user
      existingUser.password = hashedPassword;
      existingUser.roles = [UserRole.CATALOG_MANAGER];
      existingUser.isActive = true;

      await userRepository.save(existingUser);
      console.log('✓ Catalog Manager user password updated');
    } else {
      console.log('→ Creating new catalog manager user...');

      // Hash the password
      const hashedPassword = await bcrypt.hash('123456Ab', 10);

      // Create catalog manager user
      const catalogManagerUser = userRepository.create({
        email: 'catalog@cartop.cz',
        firstName: 'Catalog',
        lastName: 'Manager',
        password: hashedPassword,
        roles: [UserRole.CATALOG_MANAGER],
        isActive: true,
      });

      await userRepository.save(catalogManagerUser);
      console.log('✓ Catalog Manager user created successfully');
    }

    console.log('\n📧 Email: catalog@cartop.cz');
    console.log('🔑 Password: 123456Ab');
    console.log('👤 Role: CATALOG_MANAGER\n');

  } catch (error) {
    console.error('✗ Error creating catalog manager user:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
    console.log('✓ Database connection closed');
  }
}

// Run the seed script
createCatalogManagerUser()
  .then(() => {
    console.log('✓ Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('✗ Seed failed:', error);
    process.exit(1);
  });
