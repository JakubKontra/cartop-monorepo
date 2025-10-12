import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

/**
 * Migration: Add Newsletter Subscription Table
 *
 * Adds the user_newsletter_subscription table with source tracking and extended fields
 * for managing newsletter subscriptions with Ecomail integration.
 *
 * Note: This migration assumes the table exists but adds new columns.
 * If the table doesn't exist, uncomment the CREATE TABLE section.
 */
export class AddNewsletterSubscriptionTable1729000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if table exists, if not create it
    const tableExists = await queryRunner.hasTable('user_newsletter_subscription');

    if (!tableExists) {
      await queryRunner.createTable(
        new Table({
          name: 'user_newsletter_subscription',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'user_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'email',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'status',
              type: 'enum',
              enum: ['pending', 'active', 'unsubscribed'],
              default: "'pending'",
              isNullable: false,
            },
            {
              name: 'source',
              type: 'enum',
              enum: ['ecomail', 'web', 'admin', 'api', 'import', 'mobile'],
              default: "'web'",
              isNullable: false,
            },
            {
              name: 'brand_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'model_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'body_type_id',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'preferences',
              type: 'json',
              isNullable: true,
            },
            {
              name: 'ecomail_subscriber_id',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'ecomail_list_id',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'verification_token',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'verified_at',
              type: 'datetime',
              isNullable: true,
            },
            {
              name: 'created_at',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
              isNullable: false,
            },
            {
              name: 'updated_at',
              type: 'datetime',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
              isNullable: true,
            },
          ],
        }),
        true,
      );

      // Create indexes
      await queryRunner.createIndex(
        'user_newsletter_subscription',
        new TableIndex({
          name: 'IDX_11FAFCFCA76ED395',
          columnNames: ['user_id'],
        }),
      );

      await queryRunner.createIndex(
        'user_newsletter_subscription',
        new TableIndex({
          name: 'IDX_11FAFCFC44F5D008',
          columnNames: ['brand_id'],
        }),
      );

      await queryRunner.createIndex(
        'user_newsletter_subscription',
        new TableIndex({
          name: 'IDX_11FAFCFC7975B7E7',
          columnNames: ['model_id'],
        }),
      );

      await queryRunner.createIndex(
        'user_newsletter_subscription',
        new TableIndex({
          name: 'IDX_11FAFCFC2CBA3505',
          columnNames: ['body_type_id'],
        }),
      );

      await queryRunner.createIndex(
        'user_newsletter_subscription',
        new TableIndex({
          name: 'idx_email',
          columnNames: ['email'],
        }),
      );

      await queryRunner.createIndex(
        'user_newsletter_subscription',
        new TableIndex({
          name: 'idx_status',
          columnNames: ['status'],
        }),
      );

      await queryRunner.createIndex(
        'user_newsletter_subscription',
        new TableIndex({
          name: 'idx_source',
          columnNames: ['source'],
        }),
      );

      // Create foreign keys
      await queryRunner.createForeignKey(
        'user_newsletter_subscription',
        new TableForeignKey({
          name: 'FK_11FAFCFCA76ED395',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      );

      await queryRunner.createForeignKey(
        'user_newsletter_subscription',
        new TableForeignKey({
          name: 'FK_11FAFCFC44F5D008',
          columnNames: ['brand_id'],
          referencedTableName: 'catalog_brands',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      );

      await queryRunner.createForeignKey(
        'user_newsletter_subscription',
        new TableForeignKey({
          name: 'FK_11FAFCFC7975B7E7',
          columnNames: ['model_id'],
          referencedTableName: 'catalog_models',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      );
    } else {
      // Table exists, add new columns if they don't exist
      const hasEmailColumn = await queryRunner.hasColumn('user_newsletter_subscription', 'email');
      if (!hasEmailColumn) {
        await queryRunner.query(`
          ALTER TABLE user_newsletter_subscription
          ADD COLUMN email VARCHAR(255) NOT NULL AFTER body_type_id
        `);
      }

      const hasStatusColumn = await queryRunner.hasColumn('user_newsletter_subscription', 'status');
      if (!hasStatusColumn) {
        await queryRunner.query(`
          ALTER TABLE user_newsletter_subscription
          ADD COLUMN status ENUM('pending', 'active', 'unsubscribed') NOT NULL DEFAULT 'pending' AFTER email
        `);
      }

      const hasSourceColumn = await queryRunner.hasColumn('user_newsletter_subscription', 'source');
      if (!hasSourceColumn) {
        await queryRunner.query(`
          ALTER TABLE user_newsletter_subscription
          ADD COLUMN source ENUM('ecomail', 'web', 'admin', 'api', 'import', 'mobile') NOT NULL DEFAULT 'web' AFTER status
        `);
      }

      const hasPreferencesColumn = await queryRunner.hasColumn('user_newsletter_subscription', 'preferences');
      if (!hasPreferencesColumn) {
        await queryRunner.query(`
          ALTER TABLE user_newsletter_subscription
          ADD COLUMN preferences JSON NULL AFTER source
        `);
      }

      const hasEcomailSubscriberIdColumn = await queryRunner.hasColumn('user_newsletter_subscription', 'ecomail_subscriber_id');
      if (!hasEcomailSubscriberIdColumn) {
        await queryRunner.query(`
          ALTER TABLE user_newsletter_subscription
          ADD COLUMN ecomail_subscriber_id VARCHAR(255) NULL AFTER preferences,
          ADD COLUMN ecomail_list_id VARCHAR(255) NULL AFTER ecomail_subscriber_id
        `);
      }

      const hasVerificationTokenColumn = await queryRunner.hasColumn('user_newsletter_subscription', 'verification_token');
      if (!hasVerificationTokenColumn) {
        await queryRunner.query(`
          ALTER TABLE user_newsletter_subscription
          ADD COLUMN verification_token VARCHAR(255) NULL AFTER ecomail_list_id,
          ADD COLUMN verified_at DATETIME NULL AFTER verification_token
        `);
      }

      const hasUpdatedAtColumn = await queryRunner.hasColumn('user_newsletter_subscription', 'updated_at');
      if (!hasUpdatedAtColumn) {
        await queryRunner.query(`
          ALTER TABLE user_newsletter_subscription
          ADD COLUMN updated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at
        `);
      }

      // Add new indexes if they don't exist
      const emailIndexExists = await queryRunner.query(`
        SELECT COUNT(*) as count FROM information_schema.statistics
        WHERE table_schema = DATABASE()
        AND table_name = 'user_newsletter_subscription'
        AND index_name = 'idx_email'
      `);

      if (emailIndexExists[0].count === 0) {
        await queryRunner.createIndex(
          'user_newsletter_subscription',
          new TableIndex({
            name: 'idx_email',
            columnNames: ['email'],
          }),
        );
      }

      const statusIndexExists = await queryRunner.query(`
        SELECT COUNT(*) as count FROM information_schema.statistics
        WHERE table_schema = DATABASE()
        AND table_name = 'user_newsletter_subscription'
        AND index_name = 'idx_status'
      `);

      if (statusIndexExists[0].count === 0) {
        await queryRunner.createIndex(
          'user_newsletter_subscription',
          new TableIndex({
            name: 'idx_status',
            columnNames: ['status'],
          }),
        );
      }

      const sourceIndexExists = await queryRunner.query(`
        SELECT COUNT(*) as count FROM information_schema.statistics
        WHERE table_schema = DATABASE()
        AND table_name = 'user_newsletter_subscription'
        AND index_name = 'idx_source'
      `);

      if (sourceIndexExists[0].count === 0) {
        await queryRunner.createIndex(
          'user_newsletter_subscription',
          new TableIndex({
            name: 'idx_source',
            columnNames: ['source'],
          }),
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.dropIndex('user_newsletter_subscription', 'idx_source');
    await queryRunner.dropIndex('user_newsletter_subscription', 'idx_status');
    await queryRunner.dropIndex('user_newsletter_subscription', 'idx_email');

    // Drop new columns (in reverse order)
    await queryRunner.dropColumn('user_newsletter_subscription', 'updated_at');
    await queryRunner.dropColumn('user_newsletter_subscription', 'verified_at');
    await queryRunner.dropColumn('user_newsletter_subscription', 'verification_token');
    await queryRunner.dropColumn('user_newsletter_subscription', 'ecomail_list_id');
    await queryRunner.dropColumn('user_newsletter_subscription', 'ecomail_subscriber_id');
    await queryRunner.dropColumn('user_newsletter_subscription', 'preferences');
    await queryRunner.dropColumn('user_newsletter_subscription', 'source');
    await queryRunner.dropColumn('user_newsletter_subscription', 'status');
    await queryRunner.dropColumn('user_newsletter_subscription', 'email');
  }
}
