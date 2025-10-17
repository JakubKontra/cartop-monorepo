import { MigrationInterface, QueryRunner, TableColumn, TableIndex, TableForeignKey, Table } from 'typeorm';

/**
 * Migration: Extend Offers with Complete Leasing Features
 *
 * This migration extends the existing offers system with comprehensive leasing functionality:
 * 1. Adds engine, file, and legacy system fields to offers table
 * 2. Extends offer_leasing_variants with pricing, VAT, and validity fields
 * 3. Adds interior color and gallery support to offer_color_variants
 * 4. Splits offer_optional_equipment into catalog + pivot structure
 * 5. Creates partial unique indexes for default flags
 *
 * Compatible with existing data - all new fields are nullable or have defaults.
 */
export class ExtendOffersWithLeasingFeatures1729200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // ==========================================
    // 1. EXTEND OFFERS TABLE
    // ==========================================

    await queryRunner.addColumns('offers', [
      new TableColumn({
        name: 'legacySystemId',
        type: 'varchar',
        length: '100',
        isNullable: true,
        isUnique: true,
      }),
      new TableColumn({
        name: 'publicId',
        type: 'varchar',
        length: '100',
        isNullable: true,
        isUnique: true,
      }),
      new TableColumn({
        name: 'isPrivate',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
      new TableColumn({
        name: 'engineId',
        type: 'uuid',
        isNullable: false,
      }),
      new TableColumn({
        name: 'fileId',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'isRecommendedForBrand',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
      new TableColumn({
        name: 'isRecommendedForActionPage',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
      new TableColumn({
        name: 'isRecommendedForModel',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
      new TableColumn({
        name: 'isPromoted',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
      new TableColumn({
        name: 'disableCustomGallery',
        type: 'boolean',
        default: false,
        isNullable: true,
      }),
      new TableColumn({
        name: 'note',
        type: 'text',
        isNullable: true,
      }),
    ]);

    // Create indexes for offers
    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_legacy_system_id',
      columnNames: ['legacySystemId'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_public_id',
      columnNames: ['publicId'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_is_private',
      columnNames: ['isPrivate'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_engine_id',
      columnNames: ['engineId'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_brand_id_is_active',
      columnNames: ['brandId', 'isActive'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_engine_id_is_active',
      columnNames: ['engineId', 'isActive'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_is_promoted',
      columnNames: ['isPromoted'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_is_promoted_is_active',
      columnNames: ['isPromoted', 'isActive'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_is_recommended_for_brand',
      columnNames: ['isRecommendedForBrand'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_is_recommended_for_action_page',
      columnNames: ['isRecommendedForActionPage'],
    }));

    await queryRunner.createIndex('offers', new TableIndex({
      name: 'IDX_offers_is_recommended_for_model',
      columnNames: ['isRecommendedForModel'],
    }));

    // Create foreign keys for offers
    await queryRunner.createForeignKey('offers', new TableForeignKey({
      name: 'FK_offers_engine_id',
      columnNames: ['engineId'],
      referencedTableName: 'catalog_engines',
      referencedColumnNames: ['id'],
      onDelete: 'RESTRICT',
    }));

    await queryRunner.createForeignKey('offers', new TableForeignKey({
      name: 'FK_offers_file_id',
      columnNames: ['fileId'],
      referencedTableName: 'files',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    }));

    // ==========================================
    // 2. EXTEND OFFER_LEASING_VARIANTS TABLE
    // ==========================================

    await queryRunner.addColumns('offer_leasing_variants', [
      new TableColumn({
        name: 'currency',
        type: 'char',
        length: '3',
        default: "'CZK'",
        isNullable: false,
      }),
      new TableColumn({
        name: 'vatRate',
        type: 'decimal',
        precision: 5,
        scale: 2,
        default: 21.00,
        isNullable: false,
      }),
      new TableColumn({
        name: 'priceWithoutVat',
        type: 'integer',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'priceWithVat',
        type: 'integer',
        isNullable: false,
        default: 0,
      }),
      new TableColumn({
        name: 'pricePeriod',
        type: 'varchar',
        length: '20',
        default: "'MONTHLY'",
        isNullable: false,
      }),
      new TableColumn({
        name: 'originalPriceWithoutVat',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'originalPriceWithVat',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'securityDeposit',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'setupFee',
        type: 'integer',
        isNullable: true,
      }),
      new TableColumn({
        name: 'validFrom',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
      new TableColumn({
        name: 'validTo',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
      new TableColumn({
        name: 'isActive',
        type: 'boolean',
        default: true,
        isNullable: false,
      }),
    ]);

    // Rename wearTolerance column
    await queryRunner.query(`
      ALTER TABLE offer_leasing_variants
      ADD COLUMN "wearTolerancePercent" integer;
    `);

    await queryRunner.query(`
      UPDATE offer_leasing_variants
      SET "wearTolerancePercent" = CASE
        WHEN "wearTolerance" = true THEN 10
        ELSE NULL
      END;
    `);

    await queryRunner.dropColumn('offer_leasing_variants', 'wearTolerance');

    // Change slug to NOT NULL (set default for existing nulls first)
    await queryRunner.query(`
      UPDATE offer_leasing_variants
      SET slug = CONCAT('variant-', id)
      WHERE slug IS NULL;
    `);

    await queryRunner.changeColumn('offer_leasing_variants', 'slug', new TableColumn({
      name: 'slug',
      type: 'varchar',
      length: '255',
      isNullable: false,
    }));

    // Create indexes for offer_leasing_variants
    await queryRunner.createIndex('offer_leasing_variants', new TableIndex({
      name: 'IDX_offer_leasing_variants_annual_mileage_limit',
      columnNames: ['annualMileageLimit'],
    }));

    await queryRunner.createIndex('offer_leasing_variants', new TableIndex({
      name: 'IDX_offer_leasing_variants_leasing_duration_months',
      columnNames: ['leasingDurationMonths'],
    }));

    await queryRunner.createIndex('offer_leasing_variants', new TableIndex({
      name: 'IDX_offer_leasing_variants_price_with_vat',
      columnNames: ['priceWithVat'],
    }));

    await queryRunner.createIndex('offer_leasing_variants', new TableIndex({
      name: 'IDX_offer_leasing_variants_is_active',
      columnNames: ['isActive'],
    }));

    // Create unique constraint for (offerId, slug)
    await queryRunner.createIndex('offer_leasing_variants', new TableIndex({
      name: 'UQ_offer_leasing_variants_offer_id_slug',
      columnNames: ['offerId', 'slug'],
      isUnique: true,
    }));

    // Create partial unique indexes for default flags
    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_offer_leasing_variants_default_per_offer"
      ON offer_leasing_variants("offerId")
      WHERE "isDefault" = true;
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_offer_leasing_variants_best_per_offer"
      ON offer_leasing_variants("offerId")
      WHERE "isBestOffer" = true;
    `);

    // ==========================================
    // 3. EXTEND OFFER_COLOR_VARIANTS TABLE
    // ==========================================

    await queryRunner.addColumns('offer_color_variants', [
      new TableColumn({
        name: 'colorName',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'galleryId',
        type: 'uuid',
        isNullable: true,
      }),
    ]);

    // Make interiorColorId nullable
    await queryRunner.changeColumn('offer_color_variants', 'interiorColorId', new TableColumn({
      name: 'interiorColorId',
      type: 'uuid',
      isNullable: true,
    }));

    // Create unique constraint for (offerId, exteriorColorId, interiorColorId)
    await queryRunner.createIndex('offer_color_variants', new TableIndex({
      name: 'UQ_offer_color_variants_color_combo_per_offer',
      columnNames: ['offerId', 'exteriorColorId', 'interiorColorId'],
      isUnique: true,
    }));

    // Create partial unique index for default flag
    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_offer_color_variants_default_per_offer"
      ON offer_color_variants("offerId")
      WHERE "isDefault" = true;
    `);

    // Create foreign key for gallery
    await queryRunner.createForeignKey('offer_color_variants', new TableForeignKey({
      name: 'FK_offer_color_variants_gallery_id',
      columnNames: ['galleryId'],
      referencedTableName: 'galleries',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    }));

    // ==========================================
    // 4. CREATE OFFER_ADDITIONAL_EQUIPMENT_ITEMS TABLE
    // ==========================================

    await queryRunner.createTable(new Table({
      name: 'offer_additional_equipment_items',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'category',
          type: 'varchar',
          length: '100',
          isNullable: true,
        },
        {
          name: 'description',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'createdAt',
          type: 'timestamp with time zone',
          default: 'now()',
          isNullable: false,
        },
        {
          name: 'updatedAt',
          type: 'timestamp with time zone',
          default: 'now()',
          isNullable: false,
        },
      ],
    }), true);

    // ==========================================
    // 5. RESTRUCTURE OFFER_OPTIONAL_EQUIPMENT TABLE
    // ==========================================

    // Migrate existing data to new structure
    // First, create equipment items from existing equipment names
    await queryRunner.query(`
      INSERT INTO offer_additional_equipment_items (id, name, description, "createdAt", "updatedAt")
      SELECT
        uuid_generate_v4(),
        DISTINCT ON (name) name,
        description,
        now(),
        now()
      FROM offer_optional_equipment
      WHERE name IS NOT NULL;
    `);

    // Add new columns to offer_optional_equipment
    await queryRunner.addColumns('offer_optional_equipment', [
      new TableColumn({
        name: 'equipmentItemId',
        type: 'uuid',
        isNullable: true, // Temporarily nullable for migration
      }),
      new TableColumn({
        name: 'currency',
        type: 'char',
        length: '3',
        default: "'CZK'",
        isNullable: false,
      }),
      new TableColumn({
        name: 'pricePeriod',
        type: 'varchar',
        length: '20',
        default: "'MONTHLY'",
        isNullable: false,
      }),
      new TableColumn({
        name: 'isDefaultSelected',
        type: 'boolean',
        default: false,
        isNullable: false,
      }),
    ]);

    // Link existing equipment to items
    await queryRunner.query(`
      UPDATE offer_optional_equipment oe
      SET "equipmentItemId" = (
        SELECT id
        FROM offer_additional_equipment_items ei
        WHERE ei.name = oe.name
        LIMIT 1
      )
      WHERE oe.name IS NOT NULL;
    `);

    // Drop old columns
    await queryRunner.dropColumn('offer_optional_equipment', 'name');
    await queryRunner.dropColumn('offer_optional_equipment', 'description');

    // Make equipmentItemId NOT NULL
    await queryRunner.changeColumn('offer_optional_equipment', 'equipmentItemId', new TableColumn({
      name: 'equipmentItemId',
      type: 'uuid',
      isNullable: false,
    }));

    // Rename additionalPrice to match new schema (keep as-is, just make nullable)
    await queryRunner.changeColumn('offer_optional_equipment', 'additionalPrice', new TableColumn({
      name: 'additionalPrice',
      type: 'integer',
      isNullable: true,
    }));

    // Create indexes and foreign keys for offer_optional_equipment
    await queryRunner.createIndex('offer_optional_equipment', new TableIndex({
      name: 'IDX_offer_optional_equipment_equipment_item_id',
      columnNames: ['equipmentItemId'],
    }));

    await queryRunner.createIndex('offer_optional_equipment', new TableIndex({
      name: 'UQ_offer_optional_equipment_offer_id_equipment_item_id',
      columnNames: ['offerId', 'equipmentItemId'],
      isUnique: true,
    }));

    await queryRunner.createForeignKey('offer_optional_equipment', new TableForeignKey({
      name: 'FK_offer_optional_equipment_equipment_item_id',
      columnNames: ['equipmentItemId'],
      referencedTableName: 'offer_additional_equipment_items',
      referencedColumnNames: ['id'],
      onDelete: 'RESTRICT',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverse all changes in reverse order

    // 5. Restore offer_optional_equipment structure
    await queryRunner.dropForeignKey('offer_optional_equipment', 'FK_offer_optional_equipment_equipment_item_id');
    await queryRunner.dropIndex('offer_optional_equipment', 'UQ_offer_optional_equipment_offer_id_equipment_item_id');
    await queryRunner.dropIndex('offer_optional_equipment', 'IDX_offer_optional_equipment_equipment_item_id');

    await queryRunner.addColumn('offer_optional_equipment', new TableColumn({
      name: 'name',
      type: 'varchar',
      length: '255',
      isNullable: true,
    }));

    await queryRunner.addColumn('offer_optional_equipment', new TableColumn({
      name: 'description',
      type: 'text',
      isNullable: true,
    }));

    await queryRunner.query(`
      UPDATE offer_optional_equipment oe
      SET name = ei.name, description = ei.description
      FROM offer_additional_equipment_items ei
      WHERE oe."equipmentItemId" = ei.id;
    `);

    await queryRunner.dropColumn('offer_optional_equipment', 'equipmentItemId');
    await queryRunner.dropColumn('offer_optional_equipment', 'currency');
    await queryRunner.dropColumn('offer_optional_equipment', 'pricePeriod');
    await queryRunner.dropColumn('offer_optional_equipment', 'isDefaultSelected');

    // 4. Drop equipment items table
    await queryRunner.dropTable('offer_additional_equipment_items');

    // 3. Restore offer_color_variants
    await queryRunner.dropForeignKey('offer_color_variants', 'FK_offer_color_variants_gallery_id');
    await queryRunner.query('DROP INDEX IF EXISTS "UQ_offer_color_variants_default_per_offer"');
    await queryRunner.dropIndex('offer_color_variants', 'UQ_offer_color_variants_color_combo_per_offer');
    await queryRunner.dropColumn('offer_color_variants', 'galleryId');
    await queryRunner.dropColumn('offer_color_variants', 'colorName');

    // 2. Restore offer_leasing_variants
    await queryRunner.query('DROP INDEX IF EXISTS "UQ_offer_leasing_variants_best_per_offer"');
    await queryRunner.query('DROP INDEX IF EXISTS "UQ_offer_leasing_variants_default_per_offer"');
    await queryRunner.dropIndex('offer_leasing_variants', 'UQ_offer_leasing_variants_offer_id_slug');
    await queryRunner.dropIndex('offer_leasing_variants', 'IDX_offer_leasing_variants_is_active');
    await queryRunner.dropIndex('offer_leasing_variants', 'IDX_offer_leasing_variants_price_with_vat');
    await queryRunner.dropIndex('offer_leasing_variants', 'IDX_offer_leasing_variants_leasing_duration_months');
    await queryRunner.dropIndex('offer_leasing_variants', 'IDX_offer_leasing_variants_annual_mileage_limit');

    await queryRunner.addColumn('offer_leasing_variants', new TableColumn({
      name: 'wearTolerance',
      type: 'boolean',
      default: false,
      isNullable: true,
    }));

    await queryRunner.dropColumn('offer_leasing_variants', 'wearTolerancePercent');
    await queryRunner.dropColumn('offer_leasing_variants', 'isActive');
    await queryRunner.dropColumn('offer_leasing_variants', 'validTo');
    await queryRunner.dropColumn('offer_leasing_variants', 'validFrom');
    await queryRunner.dropColumn('offer_leasing_variants', 'setupFee');
    await queryRunner.dropColumn('offer_leasing_variants', 'securityDeposit');
    await queryRunner.dropColumn('offer_leasing_variants', 'originalPriceWithVat');
    await queryRunner.dropColumn('offer_leasing_variants', 'originalPriceWithoutVat');
    await queryRunner.dropColumn('offer_leasing_variants', 'pricePeriod');
    await queryRunner.dropColumn('offer_leasing_variants', 'priceWithVat');
    await queryRunner.dropColumn('offer_leasing_variants', 'priceWithoutVat');
    await queryRunner.dropColumn('offer_leasing_variants', 'vatRate');
    await queryRunner.dropColumn('offer_leasing_variants', 'currency');

    // 1. Restore offers table
    await queryRunner.dropForeignKey('offers', 'FK_offers_file_id');
    await queryRunner.dropForeignKey('offers', 'FK_offers_engine_id');

    await queryRunner.dropIndex('offers', 'IDX_offers_is_recommended_for_model');
    await queryRunner.dropIndex('offers', 'IDX_offers_is_recommended_for_action_page');
    await queryRunner.dropIndex('offers', 'IDX_offers_is_recommended_for_brand');
    await queryRunner.dropIndex('offers', 'IDX_offers_is_promoted_is_active');
    await queryRunner.dropIndex('offers', 'IDX_offers_is_promoted');
    await queryRunner.dropIndex('offers', 'IDX_offers_engine_id_is_active');
    await queryRunner.dropIndex('offers', 'IDX_offers_brand_id_is_active');
    await queryRunner.dropIndex('offers', 'IDX_offers_engine_id');
    await queryRunner.dropIndex('offers', 'IDX_offers_is_private');
    await queryRunner.dropIndex('offers', 'IDX_offers_public_id');
    await queryRunner.dropIndex('offers', 'IDX_offers_legacy_system_id');

    await queryRunner.dropColumn('offers', 'note');
    await queryRunner.dropColumn('offers', 'disableCustomGallery');
    await queryRunner.dropColumn('offers', 'isPromoted');
    await queryRunner.dropColumn('offers', 'isRecommendedForModel');
    await queryRunner.dropColumn('offers', 'isRecommendedForActionPage');
    await queryRunner.dropColumn('offers', 'isRecommendedForBrand');
    await queryRunner.dropColumn('offers', 'fileId');
    await queryRunner.dropColumn('offers', 'engineId');
    await queryRunner.dropColumn('offers', 'isPrivate');
    await queryRunner.dropColumn('offers', 'publicId');
    await queryRunner.dropColumn('offers', 'legacySystemId');
  }
}
