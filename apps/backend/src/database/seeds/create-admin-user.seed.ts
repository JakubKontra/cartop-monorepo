import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../model/user/user.entity';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Seed script to create an admin user
 * Email: admin@cartop.cz
 * Password: 123456Ab
 */
async function createAdminUser() {
  // Initialize TypeORM connection
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'cartop_v3',
    entities: [User],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('✓ Database connection established');

    const userRepository = dataSource.getRepository(User);

    // Check if admin user already exists
    const existingUser = await userRepository.findOne({
      where: { email: 'admin@cartop.cz' },
    });

    if (existingUser) {
      console.log('⚠ Admin user already exists, updating password...');

      // Hash the password
      const hashedPassword = await bcrypt.hash('123456Ab', 10);

      // Update existing user
      existingUser.password = hashedPassword;
      existingUser.roles = [UserRole.ADMIN];
      existingUser.isActive = true;

      await userRepository.save(existingUser);
      console.log('✓ Admin user password updated');
    } else {
      console.log('→ Creating new admin user...');

      // Hash the password
      const hashedPassword = await bcrypt.hash('123456Ab', 10);

      // Create admin user
      const adminUser = userRepository.create({
        email: 'admin@cartop.cz',
        firstName: 'Admin',
        lastName: 'User',
        password: hashedPassword,
        roles: [UserRole.ADMIN],
        isActive: true,
      });

      await userRepository.save(adminUser);
      console.log('✓ Admin user created successfully');
    }

    console.log('\n📧 Email: admin@cartop.cz');
    console.log('🔑 Password: 123456Ab');
    console.log('👤 Role: ADMIN\n');

  } catch (error) {
    console.error('✗ Error creating admin user:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
    console.log('✓ Database connection closed');
  }
}

// Run the seed script
createAdminUser()
  .then(() => {
    console.log('✓ Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('✗ Seed failed:', error);
    process.exit(1);
  });
