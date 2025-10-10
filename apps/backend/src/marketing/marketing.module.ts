import { Module } from '@nestjs/common';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';
import { EcomailService } from './ecomail/EcomailService';

/**
 * Marketing Module
 * Handles Ecomail integration for marketing campaigns
 */
@Module({
  controllers: [MarketingController],
  providers: [MarketingService, EcomailService],
  exports: [MarketingService, EcomailService],
})
export class MarketingModule {}
