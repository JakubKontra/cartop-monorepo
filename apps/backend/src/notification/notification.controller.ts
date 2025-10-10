import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { DevOnlyGuard } from './guards/dev-only.guard';

class TestEmailDto {
  email: string;
  userName?: string;
  resetLink?: string;
}

/**
 * Notification Controller
 * Provides test endpoints for development/local environments only
 */
@Controller('notifications')
@UseGuards(DevOnlyGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * Test endpoint: Send password reset email
   * Only available in development/local environments
   */
  @Post('test/password-reset')
  async testPasswordReset(@Body() body: TestEmailDto) {
    if (!body.email) {
      throw new BadRequestException('email is required');
    }

    await this.notificationService.sendPasswordReset({
      email: body.email,
      userName: body.userName || 'Test User',
      resetLink: body.resetLink || 'https://example.com/reset-password?token=test123',
      expirationTime: '1 hour',
    });

    return {
      success: true,
      message: `Password reset email queued to ${body.email}`,
    };
  }
}
