import { Injectable, Logger } from '@nestjs/common';
import { render } from '@react-email/render';
import { EcomailService } from './ecomail/EcomailService';
import { CreateTemplateDto } from './dto/create-template.dto';
import { CreateTemplateResponse } from './ecomail/ecomail-api.types';
import { OfferData } from './templates/offer-email';

/**
 * Marketing Service
 * Handles email template creation and syncing to Ecomail
 */
@Injectable()
export class MarketingService {
  private readonly logger = new Logger(MarketingService.name);

  constructor(private readonly ecomailService: EcomailService) {}

  /**
   * Create and sync email template to Ecomail
   */
  async createEmailTemplate(
    dto: CreateTemplateDto,
  ): Promise<CreateTemplateResponse> {
    try {
      this.logger.log(
        `Creating email template: ${dto.templateName} with ${dto.offerIds.length} offers`,
      );

      // 1. Fetch offer data (stub for now - will be replaced when offer entity exists)
      const offers = await this.fetchOfferData(dto.offerIds);

      // 2. Render React Email template to HTML
      const html = await this.renderEmailTemplate({
        offers,
        title: dto.templateName,
        metadata: dto.metadata,
      });

      // 3. Sync to Ecomail
      const result = await this.ecomailService.createTemplate({
        name: dto.templateName,
        html,
        inline_css: 1, // Enable CSS inlining
      });

      this.logger.log(
        `Successfully created and synced template: ${dto.templateName} (Ecomail ID: ${result.id})`,
      );

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Failed to create email template: ${dto.templateName}`,
        errorMessage,
      );
      throw error;
    }
  }

  /**
   * Fetch offer data by IDs
   * TODO: Replace this stub with actual data fetching when offer entity exists
   */
  private async fetchOfferData(offerIds: string[]): Promise<OfferData[]> {
    this.logger.debug(`Fetching data for ${offerIds.length} offers`);

    // STUB: Return placeholder data for now
    // TODO: Replace with actual database query when offer entity is created
    // Example: return this.offerRepository.findByIds(offerIds);

    return offerIds.map((id) => ({
      id,
      title: `Offer ${id}`,
      description: `This is a placeholder description for offer ${id}. Replace with actual offer data.`,
      price: '$XX,XXX',
      imageUrl: `https://placeholder.com/offer-${id}.jpg`,
    }));
  }

  /**
   * Render email template to HTML
   */
  private async renderEmailTemplate(data: {
    offers: OfferData[];
    title?: string;
    metadata?: Record<string, string | number | boolean>;
  }): Promise<string> {
    try {
      // Dynamic import of template
      const templatePath = './templates/offer-email';
      const templateModule = await import(templatePath);
      const TemplateComponent = templateModule.default;

      // Render React component to HTML
      const html = await render(
        TemplateComponent({
          offers: data.offers,
          title: data.title,
          metadata: data.metadata,
        }),
      );

      this.logger.debug(`Rendered email template to HTML (${html.length} chars)`);
      return html;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to render email template: ${errorMessage}`);
      throw new Error('Template rendering failed');
    }
  }

  /**
   * Health check for Ecomail integration
   */
  healthCheck(): boolean {
    return this.ecomailService.healthCheck();
  }
}
