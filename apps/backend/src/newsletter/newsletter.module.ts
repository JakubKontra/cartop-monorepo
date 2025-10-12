import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { UserNewsletterSubscription } from './entities/user-newsletter-subscription.entity';

/**
 * Newsletter Module
 * Handles newsletter subscription management (local storage only)
 * Data can be manually exported to Ecomail when needed
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([UserNewsletterSubscription]),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService],
  exports: [NewsletterService],
})
export class NewsletterModule {}
