import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotificationPreference } from './user-notification-preference.entity';
import { randomBytes } from 'crypto';

export interface UpdatePreferenceInput {
  emailEnabled?: boolean;
  transactionalEmails?: boolean;
  marketingEmails?: boolean;
  systemAlerts?: boolean;
}

/**
 * Preference Service
 * Manages user notification preferences and unsubscribe functionality
 */
@Injectable()
export class PreferenceService {
  private readonly logger = new Logger(PreferenceService.name);

  constructor(
    @InjectRepository(UserNotificationPreference)
    private readonly preferenceRepo: Repository<UserNotificationPreference>,
  ) {}

  /**
   * Get user's notification preferences
   * Creates default preferences if none exist
   */
  async getPreferences(userId: string): Promise<UserNotificationPreference> {
    let preference = await this.preferenceRepo.findOne({
      where: { userId },
    });

    if (!preference) {
      preference = await this.createDefaultPreferences(userId);
    }

    return preference;
  }

  /**
   * Create default notification preferences for a user
   */
  async createDefaultPreferences(
    userId: string,
  ): Promise<UserNotificationPreference> {
    const unsubscribeToken = this.generateUnsubscribeToken();

    const preference = this.preferenceRepo.create({
      userId,
      emailEnabled: true,
      transactionalEmails: true,
      marketingEmails: true,
      systemAlerts: true,
      unsubscribeToken,
    });

    await this.preferenceRepo.save(preference);

    this.logger.log(`Created default preferences for user ${userId}`);

    return preference;
  }

  /**
   * Update user's notification preferences
   */
  async updatePreferences(
    userId: string,
    updates: UpdatePreferenceInput,
  ): Promise<UserNotificationPreference> {
    let preference = await this.preferenceRepo.findOne({
      where: { userId },
    });

    if (!preference) {
      preference = await this.createDefaultPreferences(userId);
    }

    // Apply updates
    Object.assign(preference, updates);

    await this.preferenceRepo.save(preference);

    this.logger.log(`Updated preferences for user ${userId}`);

    return preference;
  }

  /**
   * Unsubscribe user from all emails using unsubscribe token
   */
  async unsubscribeByToken(token: string): Promise<UserNotificationPreference> {
    const preference = await this.preferenceRepo.findOne({
      where: { unsubscribeToken: token },
    });

    if (!preference) {
      throw new NotFoundException('Invalid unsubscribe token');
    }

    preference.emailEnabled = false;
    await this.preferenceRepo.save(preference);

    this.logger.log(`User ${preference.userId} unsubscribed via token`);

    return preference;
  }

  /**
   * Unsubscribe from marketing emails only
   */
  async unsubscribeFromMarketing(userId: string): Promise<UserNotificationPreference> {
    const preference = await this.getPreferences(userId);

    preference.marketingEmails = false;
    await this.preferenceRepo.save(preference);

    this.logger.log(`User ${userId} unsubscribed from marketing emails`);

    return preference;
  }

  /**
   * Regenerate unsubscribe token for a user
   */
  async regenerateUnsubscribeToken(userId: string): Promise<string> {
    const preference = await this.getPreferences(userId);

    const newToken = this.generateUnsubscribeToken();
    preference.unsubscribeToken = newToken;

    await this.preferenceRepo.save(preference);

    this.logger.log(`Regenerated unsubscribe token for user ${userId}`);

    return newToken;
  }

  /**
   * Generate a unique unsubscribe token
   */
  private generateUnsubscribeToken(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Get preference by unsubscribe token (for displaying unsubscribe page)
   */
  async getPreferenceByToken(token: string): Promise<UserNotificationPreference | null> {
    return this.preferenceRepo.findOne({
      where: { unsubscribeToken: token },
    });
  }
}
