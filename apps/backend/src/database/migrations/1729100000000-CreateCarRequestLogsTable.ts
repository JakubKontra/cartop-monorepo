import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

/**
 * Migration: Create Car Request Logs Table
 *
 * Creates the car_request_logs table for tracking all actions and changes
 * made to car requests with flexible JSONB metadata storage.
 *
 * Features:
 * - JSONB metadata for flexible, action-specific data storage
 * - Strategic indexes for efficient timeline and filtering queries
 * - Cascade delete with parent CarRequest
 * - Nullable author for system-generated logs
 * - Legacy system integration support
 */
export class CreateCarRequestLogsTable1729100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create car_request_logs table
    await queryRunner.createTable(
      new Table({
        name: 'car_request_logs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'message',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'actionType',
            type: 'enum',
            enum: [
              'STATUS_CHANGED',
              'STATE_CHANGED',
              'ASSIGNED',
              'NOTE_ADDED',
              'MESSAGE_SENT',
              'OFFER_SENT',
              'CALL_LOGGED',
              'EMAIL_SENT',
              'CALLBACK_SCHEDULED',
              'MARKED_VIP',
              'MARKED_PURCHASED',
              'PASSED_TO_DEALER',
              'WAITING_FOR_OFFER',
              'CREATED',
              'CANCELLED',
              'COMPLETED',
              'CUSTOM',
            ],
            isNullable: false,
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'carRequestId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'authorId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'legacySystemId',
            type: 'varchar',
            length: '100',
            isNullable: true,
            isUnique: true,
          },
        ],
      }),
      true,
    );

    // Create indexes for efficient queries
    await queryRunner.createIndex(
      'car_request_logs',
      new TableIndex({
        name: 'idx_car_request_logs_car_request_id_created_at',
        columnNames: ['carRequestId', 'createdAt'],
      }),
    );

    await queryRunner.createIndex(
      'car_request_logs',
      new TableIndex({
        name: 'idx_car_request_logs_action_type_created_at',
        columnNames: ['actionType', 'createdAt'],
      }),
    );

    await queryRunner.createIndex(
      'car_request_logs',
      new TableIndex({
        name: 'idx_car_request_logs_author_id_created_at',
        columnNames: ['authorId', 'createdAt'],
      }),
    );

    await queryRunner.createIndex(
      'car_request_logs',
      new TableIndex({
        name: 'idx_car_request_logs_created_at',
        columnNames: ['createdAt'],
      }),
    );

    // Create foreign key constraints
    await queryRunner.createForeignKey(
      'car_request_logs',
      new TableForeignKey({
        name: 'FK_car_request_logs_car_request_id',
        columnNames: ['carRequestId'],
        referencedTableName: 'car_requests',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'car_request_logs',
      new TableForeignKey({
        name: 'FK_car_request_logs_author_id',
        columnNames: ['authorId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.dropForeignKey('car_request_logs', 'FK_car_request_logs_author_id');
    await queryRunner.dropForeignKey('car_request_logs', 'FK_car_request_logs_car_request_id');

    // Drop indexes
    await queryRunner.dropIndex('car_request_logs', 'idx_car_request_logs_created_at');
    await queryRunner.dropIndex('car_request_logs', 'idx_car_request_logs_author_id_created_at');
    await queryRunner.dropIndex('car_request_logs', 'idx_car_request_logs_action_type_created_at');
    await queryRunner.dropIndex('car_request_logs', 'idx_car_request_logs_car_request_id_created_at');

    // Drop table
    await queryRunner.dropTable('car_request_logs');
  }
}
