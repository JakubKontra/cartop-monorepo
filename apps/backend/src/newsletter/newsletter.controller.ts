import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Public } from '../common/decorators/auth/public.decorator';
import { NewsletterService } from './newsletter.service';
import {
  SubscribeNewsletterDto,
  SubscriptionResponseDto,
} from './dto/subscribe-newsletter.dto';
import {
  UnsubscribeNewsletterDto,
  UnsubscribeResponseDto,
} from './dto/unsubscribe-newsletter.dto';

/**
 * Newsletter Controller
 * REST endpoints for newsletter subscription management
 *
 * All endpoints are public (no authentication required)
 */
@ApiTags('Newsletter')
@Controller('api/newsletter')
export class NewsletterController {
  private readonly logger = new Logger(NewsletterController.name);

  constructor(private readonly newsletterService: NewsletterService) {}

  /**
   * Subscribe to newsletter
   * POST /api/newsletter/subscribe
   */
  @Public()
  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Subscribe to newsletter',
    description:
      'Subscribe an email address to the newsletter with optional filter preferences. ' +
      'Supports anonymous subscriptions and personalized filters for brands, models, and body types.',
  })
  @ApiBody({
    type: SubscribeNewsletterDto,
    examples: {
      'Basic Subscription': {
        value: {
          email: 'user@example.com',
          consent: true,
        },
      },
      'With Preferences': {
        value: {
          email: 'user@example.com',
          consent: true,
          preferences: {
            brandIds: ['550e8400-e29b-41d4-a716-446655440000'],
            bodyTypes: ['suv', 'sedan_liftback'],
            priceRange: {
              min: 20000,
              max: 50000,
            },
            frequency: 'weekly',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully subscribed to newsletter',
    type: SubscriptionResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data or consent not given',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email already subscribed',
  })
  async subscribe(
    @Body() dto: SubscribeNewsletterDto,
  ): Promise<SubscriptionResponseDto> {
    this.logger.log(`Received subscription request for: ${dto.email}`);

    if (!dto.consent) {
      this.logger.warn(
        `Subscription rejected for ${dto.email} - consent not given`,
      );
      throw new Error('You must accept the privacy policy to subscribe');
    }

    const subscription = await this.newsletterService.subscribe(dto);

    return {
      id: subscription.id,
      email: subscription.email,
      status: subscription.status,
      source: subscription.source,
      preferences: dto.preferences,
      createdAt: subscription.createdAt,
      message: 'Successfully subscribed to newsletter',
    };
  }

  /**
   * Unsubscribe from newsletter
   * POST /api/newsletter/unsubscribe
   */
  @Public()
  @Post('unsubscribe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Unsubscribe from newsletter',
    description:
      'Unsubscribe an email address from the newsletter. ' +
      'The subscription will be marked as unsubscribed but not deleted.',
  })
  @ApiBody({
    type: UnsubscribeNewsletterDto,
    examples: {
      example: {
        value: {
          email: 'user@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully unsubscribed from newsletter',
    type: UnsubscribeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found - Email not in subscription list',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Email already unsubscribed',
  })
  async unsubscribe(
    @Body() dto: UnsubscribeNewsletterDto,
  ): Promise<UnsubscribeResponseDto> {
    this.logger.log(`Received unsubscribe request for: ${dto.email}`);

    await this.newsletterService.unsubscribe(dto.email);

    return {
      message: 'Successfully unsubscribed from newsletter',
      email: dto.email,
    };
  }

  /**
   * Verify email subscription
   * GET /api/newsletter/verify/:token
   */
  @Public()
  @Get('verify/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify email subscription',
    description:
      'Verify a newsletter subscription using the token sent via email. ' +
      'Changes subscription status from pending to active.',
  })
  @ApiParam({
    name: 'token',
    description: 'Verification token from email',
    example: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
  })
  @ApiResponse({
    status: 200,
    description: 'Email successfully verified',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Email verified successfully',
        },
        email: {
          type: 'string',
          example: 'user@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found - Invalid verification token',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Email already verified',
  })
  async verifyEmail(@Param('token') token: string): Promise<any> {
    this.logger.log(`Received email verification request for token: ${token}`);

    const subscription = await this.newsletterService.verifyEmail(token);

    return {
      message: 'Email verified successfully',
      email: subscription.email,
    };
  }

  /**
   * Get newsletter statistics (for internal use/admin)
   * GET /api/newsletter/stats
   */
  @Public()
  @Get('stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get newsletter subscription statistics',
    description:
      'Get statistics about newsletter subscriptions grouped by source. ' +
      'Useful for analytics and reporting.',
  })
  @ApiResponse({
    status: 200,
    description: 'Subscription statistics',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          source: { type: 'string', example: 'web' },
          count: { type: 'string', example: '42' },
        },
      },
    },
  })
  async getStats(): Promise<any[]> {
    this.logger.log('Received stats request');
    return await this.newsletterService.getStats('source');
  }
}
