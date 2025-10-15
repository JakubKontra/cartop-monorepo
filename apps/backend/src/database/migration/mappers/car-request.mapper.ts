import { EntityMapper, MigrationContext } from '../types/migration.types';
import { CarRequest } from '../../../car-request/entities/car-request.entity';
import { FinancingType } from '../../../car-request/enums/financing-type.enum';
import { CancellationReason } from '../../../car-request/enums/cancellation-reason.enum';
import { mysqlDateToDate, mysqlBoolToBoolean } from '../utils/migration.utils';

/**
 * MySQL CarRequest table structure (legacy schema)
 * Adjust these types based on your actual MySQL schema
 */
interface MySQLCarRequest {
  id: number | string;
  created_at?: Date | string;
  updated_at?: Date | string;
  notes?: string;
  financing_type?: string;

  // Request contact info
  request_email?: string;
  request_phone?: string;
  request_first_name?: string;
  request_last_name?: string;
  request_newsletter?: number | boolean;
  request_postal_code?: string;

  // Foreign keys (likely integers in MySQL)
  customer_id?: number | string;
  assigned_agent_id?: number | string;
  brand_id?: number | string;
  model_id?: number | string;
  leasing_company_id?: number | string;
  status_id?: number | string;
  state_id?: number | string;

  // Workflow tracking
  order_number?: number;
  gclid?: string;
  note_internal?: string;
  completed_at?: Date | string;
  next_call_at?: Date | string;
  confirmed_at?: Date | string;
  relayed_at?: Date | string;
  feedback_at?: Date | string;
  closed_at?: Date | string;
  waiting_for_offer?: number | boolean;
  offers_sent_at?: Date | string;
  delivery_expected_at?: Date | string;
  car_delivered?: number | boolean;
  display_order?: number;

  // Cancellation
  cancellation_reason?: string;
  cancellation_note?: string;
}

/**
 * CarRequest Entity Mapper
 * Maps legacy MySQL car request records to new PostgreSQL CarRequest entities
 */
export class CarRequestMapper implements EntityMapper<MySQLCarRequest, CarRequest> {
  sourceTable = 'car_requests'; // Adjust to your MySQL table name
  targetEntity = CarRequest;
  entityName = 'CarRequest';

  // CarRequests depend on Users, Brands, Models, etc. being migrated first
  dependencies = ['User', 'CatalogBrand', 'CatalogModel', 'LeasingCompany', 'CarRequestStatus', 'CarRequestState'];

  async map(source: MySQLCarRequest, context: MigrationContext): Promise<CarRequest | null> {
    try {
      const carRequest = new CarRequest();

      // Legacy system tracking
      carRequest.isFromLegacySystem = true;
      carRequest.legacySystemId = String(source.id);

      // Timestamps
      carRequest.createdAt = mysqlDateToDate(source.created_at) || new Date();
      carRequest.modifiedAt = mysqlDateToDate(source.updated_at) || new Date();

      // Basic info
      carRequest.notes = source.notes?.trim() || null;
      carRequest.financingType = this.mapFinancingType(source.financing_type);

      // Request contact information
      carRequest.requestEmail = source.request_email?.trim().toLowerCase() || null;
      carRequest.requestPhone = source.request_phone?.trim() || null;
      carRequest.requestFirstName = source.request_first_name?.trim() || null;
      carRequest.requestLastName = source.request_last_name?.trim() || null;
      carRequest.requestNewsletter = source.request_newsletter !== undefined
        ? mysqlBoolToBoolean(source.request_newsletter)
        : null;
      carRequest.requestPostalCode = source.request_postal_code?.trim() || null;

      // Foreign key relationships
      // These will need to be mapped from old IDs to new UUIDs
      // We'll handle this in a separate mapping phase after all entities are migrated
      carRequest.customerId = await this.mapForeignKey(
        context,
        'users',
        source.customer_id
      );
      carRequest.assignedAgentId = await this.mapForeignKey(
        context,
        'users',
        source.assigned_agent_id
      );
      carRequest.brandId = await this.mapForeignKey(
        context,
        'catalog_brands',
        source.brand_id
      );
      carRequest.modelId = await this.mapForeignKey(
        context,
        'catalog_models',
        source.model_id
      );
      carRequest.leasingCompanyId = await this.mapForeignKey(
        context,
        'leasing_companies',
        source.leasing_company_id
      );
      carRequest.statusId = await this.mapForeignKey(
        context,
        'car_request_statuses',
        source.status_id
      );
      carRequest.stateId = await this.mapForeignKey(
        context,
        'car_request_states',
        source.state_id
      );

      // Workflow tracking
      carRequest.order = source.order_number || null;
      carRequest.gclid = source.gclid?.trim() || null;
      carRequest.noteInternal = source.note_internal?.trim() || null;
      carRequest.completedAt = mysqlDateToDate(source.completed_at) || null;
      carRequest.nextCallAt = mysqlDateToDate(source.next_call_at) || null;
      carRequest.confirmedAt = mysqlDateToDate(source.confirmed_at) || null;
      carRequest.relayedAt = mysqlDateToDate(source.relayed_at) || null;
      carRequest.feedbackAt = mysqlDateToDate(source.feedback_at) || null;
      carRequest.closedAt = mysqlDateToDate(source.closed_at) || null;
      carRequest.waitingForOffer = source.waiting_for_offer !== undefined
        ? mysqlBoolToBoolean(source.waiting_for_offer)
        : null;
      carRequest.offersSentAt = mysqlDateToDate(source.offers_sent_at) || null;
      carRequest.deliveryExpectedAt = mysqlDateToDate(source.delivery_expected_at) || null;
      carRequest.carDelivered = source.car_delivered !== undefined
        ? mysqlBoolToBoolean(source.car_delivered)
        : false;
      carRequest.displayOrder = source.display_order || 0;

      // Cancellation
      carRequest.cancellationReason = this.mapCancellationReason(source.cancellation_reason);
      carRequest.cancellationNote = source.cancellation_note?.trim() || null;

      return carRequest;
    } catch (error) {
      console.error(`❌ Error mapping car request ${source.id}:`, error);
      throw error;
    }
  }

  /**
   * Map legacy financing type to new enum
   */
  private mapFinancingType(type: any): FinancingType {
    if (!type) return FinancingType.CASH;

    const typeLower = String(type).toLowerCase().trim();
    const typeMap: Record<string, FinancingType> = {
      'cash': FinancingType.CASH,
      'leasing': FinancingType.LEASING,
      'loan': FinancingType.LEASING, // Map loan to leasing since LOAN doesn't exist
      'credit': FinancingType.LEASING,
    };

    return typeMap[typeLower] || FinancingType.CASH;
  }

  /**
   * Map legacy cancellation reason to new enum
   */
  private mapCancellationReason(reason: any): CancellationReason | null {
    if (!reason) return null;

    const reasonLower = String(reason).toLowerCase().trim();
    const reasonMap: Record<string, CancellationReason> = {
      'price': CancellationReason.PRICE_TOO_HIGH,
      'too_expensive': CancellationReason.PRICE_TOO_HIGH,
      'price_too_high': CancellationReason.PRICE_TOO_HIGH,
      'delivery': CancellationReason.WAIT_TIME_TOO_LONG,
      'delivery_time': CancellationReason.WAIT_TIME_TOO_LONG,
      'wait_time': CancellationReason.WAIT_TIME_TOO_LONG,
      'found_alternative': CancellationReason.COMPETITOR_OFFER,
      'alternative': CancellationReason.COMPETITOR_OFFER,
      'competitor': CancellationReason.COMPETITOR_OFFER,
      'not_interested': CancellationReason.NO_INTEREST,
      'no_interest': CancellationReason.NO_INTEREST,
      'changed_mind': CancellationReason.CHANGED_MIND,
      'no_money': CancellationReason.NO_MONEY,
      'no_time': CancellationReason.NO_TIME,
      'other': CancellationReason.OTHER,
    };

    return reasonMap[reasonLower] || CancellationReason.OTHER;
  }

  /**
   * Map foreign key from legacy ID to new UUID
   * This creates a temporary lookup table to map old IDs to new UUIDs
   */
  private async mapForeignKey(
    context: MigrationContext,
    targetTable: string,
    legacyId: string | number | undefined
  ): Promise<string | null> {
    if (!legacyId) return null;

    try {
      // Try to find the entity in PostgreSQL by legacy ID
      // This assumes entities have a legacySystemId or similar field
      const query = `
        SELECT id FROM ${targetTable}
        WHERE legacy_system_id = $1
        LIMIT 1
      `;
      const result = await context.postgresConnection.query(query, [String(legacyId)]);

      if (result.length > 0) {
        return result[0].id;
      }

      // If not found, log warning and return null
      console.warn(
        `⚠️  Could not map foreign key: ${targetTable}.id=${legacyId}`
      );
      return null;
    } catch (error) {
      // If the target table doesn't have legacy_system_id field, handle gracefully
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(
        `⚠️  Error mapping foreign key for ${targetTable}: ${errorMessage}`
      );
      return null;
    }
  }

  /**
   * Validate migrated car request
   */
  async validate(target: CarRequest, source: MySQLCarRequest): Promise<boolean | string> {
    if (target.legacySystemId !== String(source.id)) {
      return `Legacy ID mismatch: ${target.legacySystemId} !== ${source.id}`;
    }
    if (!target.financingType) {
      return 'Financing type is required';
    }
    return true;
  }

  /**
   * Post-migration processing
   * Could be used to update relationships or perform data cleanup
   */
  async afterMigration(_context: MigrationContext): Promise<void> {
    console.log('  Post-processing: Car requests migration complete');

    // Example: Update any computed fields or relationships
    // that couldn't be set during the initial migration
  }
}
