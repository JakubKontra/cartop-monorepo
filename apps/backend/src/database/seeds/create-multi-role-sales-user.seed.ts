import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../model/user/user.entity';
import { File } from '../../file/file.entity';
import { UserRole } from '../../common/enums/role.enum';

/**
 * Seed script to create a sales user with multiple roles
 * Email: sales@cartop.cz
 * Password: 123456Ab
 * Roles: SALES_REPRESENTATIVE, JUNIOR_SALES_REPRESENTATIVE
 *
 * This demonstrates the multi-role functionality of the permission system.
 * The user will have the union of permissions from both roles.
 */
async function createMultiRoleSalesUser() {
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

    // Check if sales user already exists
    const existingUser = await userRepository.findOne({
      where: { email: 'sales@cartop.cz' },
    });

    if (existingUser) {
      console.log('⚠ Sales user already exists, updating password and roles...');

      // Hash the password
      const hashedPassword = await bcrypt.hash('123456Ab', 10);

      // Update existing user with multiple roles
      existingUser.password = hashedPassword;
      existingUser.roles = [
        UserRole.SALES_REPRESENTATIVE,
        UserRole.JUNIOR_SALES_REPRESENTATIVE,
      ];
      existingUser.isActive = true;

      await userRepository.save(existingUser);
      console.log('✓ Sales user password and roles updated');
    } else {
      console.log('→ Creating new multi-role sales user...');

      // Hash the password
      const hashedPassword = await bcrypt.hash('123456Ab', 10);

      // Create sales user with multiple roles
      const salesUser = userRepository.create({
        email: 'sales@cartop.cz',
        firstName: 'Sales',
        lastName: 'Representative',
        password: hashedPassword,
        roles: [
          UserRole.SALES_REPRESENTATIVE,
          UserRole.JUNIOR_SALES_REPRESENTATIVE,
        ],
        isActive: true,
      });

      await userRepository.save(salesUser);
      console.log('✓ Multi-role sales user created successfully');
    }

    console.log('\n📧 Email: sales@cartop.cz');
    console.log('🔑 Password: 123456Ab');
    console.log('👤 Roles: SALES_REPRESENTATIVE, JUNIOR_SALES_REPRESENTATIVE');
    console.log('🔐 Permissions: Union of both role permissions\n');

  } catch (error) {
    console.error('✗ Error creating multi-role sales user:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
    console.log('✓ Database connection closed');
  }
}

// Run the seed script
createMultiRoleSalesUser()
  .then(() => {
    console.log('✓ Seed completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('✗ Seed failed:', error);
    process.exit(1);
  });
