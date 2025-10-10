import { Injectable, Logger } from '@nestjs/common';
import { EcomailClient } from './EcomailClient';
import {
  CreateTemplateRequest,
  CreateTemplateResponse,
  AddSubscriberRequest,
  SubscriberResponse,
  SubscribersResponse,
  TriggerAutomationRequest,
  EcomailSuccessResponse,
  AutomationsResponse,
  SubscriberListsResponse,
} from './ecomail-api.types';

/**
 * Ecomail Service
 * Handles communication with Ecomail API for marketing campaigns
 */
@Injectable()
export class EcomailService {
  private readonly logger = new Logger(EcomailService.name);
  private api: EcomailClient;

  constructor() {
    const apiKey =
      process.env.ECOMAIL_API_KEY || process.env.ECOMAIL_KEY || '';
    if (!apiKey) {
      this.logger.warn(
        'Missing ECOMAIL_API_KEY; Ecomail API calls will fail.',
      );
    }
    this.api = new EcomailClient(apiKey);
    this.logger.log('EcomailService initialized');
  }

  /**
   * Create a new email template in Ecomail
   */
  async createTemplate(
    data: CreateTemplateRequest,
  ): Promise<CreateTemplateResponse> {
    try {
      this.logger.log(`Creating Ecomail template: ${data.name}`);
      const result = await this.api.createTemplate(data);
      this.logger.log(
        `Successfully created Ecomail template: ${data.name} (ID: ${result.id})`,
      );
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Failed to create Ecomail template: ${data.name}`,
        errorMessage,
      );
      throw error;
    }
  }

  /**
   * List all campaigns/automations
   */
  listCampaigns(): Promise<AutomationsResponse> {
    return this.api.listAutomations();
  }

  /**
   * Get subscriber data by email
   */
  getSubscriber(email: string): Promise<SubscriberListsResponse> {
    return this.api.getSubscriberList(email);
  }

  /**
   * Get subscribers for a given list
   */
  getSubscribers(listId: string, page?: number): Promise<SubscribersResponse> {
    if (page != null) {
      return this.api.page(page).getSubscribers(listId);
    }
    return this.api.getSubscribers(listId);
  }

  /**
   * Add subscriber to a list
   */
  addSubscriber(
    listId: string,
    data: AddSubscriberRequest,
  ): Promise<SubscriberResponse> {
    return this.api.addSubscriber(listId, data);
  }

  /**
   * Trigger automation/pipeline
   */
  triggerAutomation(
    automationId: string,
    data: TriggerAutomationRequest,
  ): Promise<EcomailSuccessResponse> {
    return this.api.triggerAutomation(automationId, data);
  }

  /**
   * Health check - verify Ecomail API key is configured
   */
  healthCheck(): boolean {
    return !!(process.env.ECOMAIL_API_KEY || process.env.ECOMAIL_KEY);
  }
}
