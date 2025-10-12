import {
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNewsletterSubscription } from './entities/user-newsletter-subscription.entity';
import {
  SubscriptionSource,
  SubscriptionStatus,
} from './enums/subscription-source.enum';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';

/**
 * Newsletter Service
 * Handles newsletter subscription management
 * Stores all data locally - manual export to Ecomail can be done later
 */
@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    @InjectRepository(UserNewsletterSubscription)
    private readonly subscriptionRepository: Repository<UserNewsletterSubscription>,
  ) {
    this.logger.log('Newsletter service initialized (local storage only)');
  }

  /**
   * Subscribe to newsletter
   */
  async subscribe(
    dto: SubscribeNewsletterDto,
  ): Promise<UserNewsletterSubscription> {
    this.logger.log(`Processing newsletter subscription for: ${dto.email}`);

    // Check if user is already subscribed
    const existing = await this.subscriptionRepository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      // If already active, throw conflict
      if (existing.status === SubscriptionStatus.ACTIVE) {
        throw new ConflictException(
          'This email is already subscribed to the newsletter',
        );
      }

      // If unsubscribed, reactivate
      if (existing.status === SubscriptionStatus.UNSUBSCRIBED) {
        this.logger.log(`Reactivating unsubscribed email: ${dto.email}`);
        existing.status = SubscriptionStatus.ACTIVE;
        existing.source = dto.source || SubscriptionSource.WEB;
        existing.preferences = this.mapPreferences(dto.preferences);

        const updated = await this.subscriptionRepository.save(existing);
        return updated;
      }

      // If pending, update preferences
      if (existing.status === SubscriptionStatus.PENDING) {
        this.logger.log(`Updating pending subscription for: ${dto.email}`);
        existing.preferences = this.mapPreferences(dto.preferences);
        return await this.subscriptionRepository.save(existing);
      }
    }

    // Create new subscription - set to ACTIVE immediately (no email verification)
    const subscription = this.subscriptionRepository.create({
      email: dto.email,
      status: SubscriptionStatus.ACTIVE,
      source: dto.source || SubscriptionSource.WEB,
      preferences: this.mapPreferences(dto.preferences),
    });

    const saved = await this.subscriptionRepository.save(subscription);
    this.logger.log(
      `Created newsletter subscription (ID: ${saved.id}) for: ${dto.email} from source: ${saved.source}`,
    );

    return saved;
  }

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(email: string): Promise<UserNewsletterSubscription> {
    this.logger.log(`Processing unsubscribe request for: ${email}`);

    const subscription = await this.subscriptionRepository.findOne({
      where: { email },
    });

    if (!subscription) {
      throw new NotFoundException('Email not found in subscription list');
    }

    if (subscription.status === SubscriptionStatus.UNSUBSCRIBED) {
      throw new BadRequestException('Email is already unsubscribed');
    }

    subscription.status = SubscriptionStatus.UNSUBSCRIBED;
    const updated = await this.subscriptionRepository.save(subscription);

    this.logger.log(`Unsubscribed email: ${email}`);

    return updated;
  }

  /**
   * Update subscription preferences
   */
  async updatePreferences(
    email: string,
    preferences: any,
  ): Promise<UserNewsletterSubscription> {
    this.logger.log(`Updating preferences for: ${email}`);

    const subscription = await this.subscriptionRepository.findOne({
      where: { email },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    subscription.preferences = this.mapPreferences(preferences);
    const updated = await this.subscriptionRepository.save(subscription);

    this.logger.log(`Updated preferences for: ${email}`);

    return updated;
  }

  /**
   * Verify email subscription
   */
  async verifyEmail(token: string): Promise<UserNewsletterSubscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { verificationToken: token },
    });

    if (!subscription) {
      throw new NotFoundException('Invalid verification token');
    }

    if (subscription.status === SubscriptionStatus.ACTIVE) {
      throw new BadRequestException('Email already verified');
    }

    subscription.status = SubscriptionStatus.ACTIVE;
    subscription.verifiedAt = new Date();
    subscription.verificationToken = null;

    return await this.subscriptionRepository.save(subscription);
  }

  /**
   * Get subscribers with filters
   */
  async getSubscribers(filters?: {
    brandId?: string;
    modelId?: string;
    bodyType?: string;
    status?: SubscriptionStatus;
    source?: SubscriptionSource;
  }): Promise<UserNewsletterSubscription[]> {
    const query = this.subscriptionRepository.createQueryBuilder('subscription');

    if (filters?.status) {
      query.andWhere('subscription.status = :status', {
        status: filters.status,
      });
    }

    if (filters?.source) {
      query.andWhere('subscription.source = :source', {
        source: filters.source,
      });
    }

    // TODO: Add JSON column queries for preferences filtering
    // Complex filters like brandId, modelId would require JSON queries

    return await query.getMany();
  }

  /**
   * Get subscription statistics
   */
  async getStats(groupBy: 'source' | 'status' = 'source'): Promise<any[]> {
    return await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .select(`subscription.${groupBy}`, groupBy)
      .addSelect('COUNT(*)', 'count')
      .groupBy(`subscription.${groupBy}`)
      .getRawMany();
  }

  /**
   * Map DTO preferences to entity preferences
   */
  private mapPreferences(dtoPreferences: any): any {
    if (!dtoPreferences) return null;

    return {
      brands: dtoPreferences.brandIds || [],
      models: dtoPreferences.modelIds || [],
      bodyTypes: dtoPreferences.bodyTypes || [],
      priceRange: dtoPreferences.priceRange,
      frequency: dtoPreferences.frequency,
    };
  }
}
