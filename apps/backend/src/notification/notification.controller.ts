import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { DevOnlyGuard } from './guards/dev-only.guard';
import { Public } from '../common/decorators/auth/public.decorator';

class TestEmailDto {
  email: string;
  [key: string]: any;
}

/**
 * Notification Controller
 * Provides test endpoints for development/local environments only
 * These endpoints queue actual emails for testing the full email flow
 */
@Controller('notifications')
@Public()
@UseGuards(DevOnlyGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  /**
   * List all available test endpoints
   */
  @Get('test')
  listTestEndpoints() {
    return {
      message: 'Email Testing Endpoints (Dev Only)',
      endpoints: [
        {
          method: 'POST',
          path: '/notifications/test/password-reset',
          description: 'Send password reset email',
          body: { email: 'user@example.com', resetPasswordLink: 'https://...' },
        },
        {
          method: 'POST',
          path: '/notifications/test/account-verify',
          description: 'Send account verification email',
          body: { email: 'user@example.com', loginLink: 'https://...' },
        },
        {
          method: 'POST',
          path: '/notifications/test/password-success',
          description: 'Send password success email',
          body: { email: 'user@example.com' },
        },
        {
          method: 'POST',
          path: '/notifications/test/contact-inquiry',
          description: 'Send contact inquiry email to admin',
          body: {
            adminEmail: 'admin@cartop.cz',
            customerName: 'Jan Novák',
            customerEmail: 'jan@example.com',
            customerPhone: '+420777123456',
            message: 'Message text',
          },
        },
        {
          method: 'POST',
          path: '/notifications/test/contact-confirmation',
          description: 'Send contact confirmation to customer',
          body: { email: 'user@example.com' },
        },
        {
          method: 'POST',
          path: '/notifications/test/documents-complete',
          description: 'Send documents complete notification',
          body: { email: 'user@example.com', offerLink: 'https://...' },
        },
      ],
      preview: {
        description: 'For instant HTML preview without queueing, use /email-preview endpoints',
        example: 'GET /email-preview/forgotten-password',
      },
    };
  }

  /**
   * Test endpoint: Send password reset email
   */
  @Post('test/password-reset')
  async testPasswordReset(@Body() body: TestEmailDto) {
    if (!body.email) {
      throw new BadRequestException('email is required');
    }

    await this.notificationService.sendPasswordReset({
      email: body.email,
      resetPasswordLink:
        body.resetPasswordLink || 'https://cartop.cz/reset-password?token=test123',
      operatingSystem: body.operatingSystem || 'Windows',
      browserName: body.browserName || 'Chrome',
    });

    return {
      success: true,
      message: `Password reset email queued to ${body.email}`,
    };
  }

  /**
   * Test endpoint: Send account verification email
   */
  @Post('test/account-verify')
  async testAccountVerify(@Body() body: TestEmailDto) {
    if (!body.email) {
      throw new BadRequestException('email is required');
    }

    await this.notificationService.sendAccountVerification({
      email: body.email,
      loginLink: body.loginLink || 'https://cartop.cz/verify?token=test123',
    });

    return {
      success: true,
      message: `Account verification email queued to ${body.email}`,
    };
  }

  /**
   * Test endpoint: Send password success email
   */
  @Post('test/password-success')
  async testPasswordSuccess(@Body() body: TestEmailDto) {
    if (!body.email) {
      throw new BadRequestException('email is required');
    }

    await this.notificationService.sendPasswordSuccess({
      email: body.email,
    });

    return {
      success: true,
      message: `Password success email queued to ${body.email}`,
    };
  }

  /**
   * Test endpoint: Send contact inquiry email
   */
  @Post('test/contact-inquiry')
  async testContactInquiry(@Body() body: any) {
    if (!body.adminEmail || !body.customerName || !body.customerEmail) {
      throw new BadRequestException(
        'adminEmail, customerName, and customerEmail are required',
      );
    }

    await this.notificationService.sendContactInquiry({
      adminEmail: body.adminEmail,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone || '+420777123456',
      message: body.message || 'Test inquiry message',
    });

    return {
      success: true,
      message: `Contact inquiry email queued to ${body.adminEmail}`,
    };
  }

  /**
   * Test endpoint: Send contact confirmation email
   */
  @Post('test/contact-confirmation')
  async testContactConfirmation(@Body() body: TestEmailDto) {
    if (!body.email) {
      throw new BadRequestException('email is required');
    }

    await this.notificationService.sendContactConfirmation({
      email: body.email,
    });

    return {
      success: true,
      message: `Contact confirmation email queued to ${body.email}`,
    };
  }

  /**
   * Test endpoint: Send documents complete email
   */
  @Post('test/documents-complete')
  async testDocumentsComplete(@Body() body: TestEmailDto) {
    if (!body.email) {
      throw new BadRequestException('email is required');
    }

    await this.notificationService.sendDocumentsComplete({
      email: body.email,
      items: body.items,
      offerLink: body.offerLink,
    });

    return {
      success: true,
      message: `Documents complete email queued to ${body.email}`,
    };
  }

  /**
   * Test endpoint: Send document incomplete email
   */
  @Post('test/document-incomplete')
  async testDocumentIncomplete(@Body() body: TestEmailDto) {
    if (!body.email) {
      throw new BadRequestException('email is required');
    }

    await this.notificationService.sendDocumentIncomplete({
      email: body.email,
      saleRepresentativeName: body.saleRepresentativeName,
      comment: body.comment,
    });

    return {
      success: true,
      message: `Document incomplete email queued to ${body.email}`,
    };
  }

  /**
   * Test endpoint: Send required documents email
   */
  @Post('test/required-documents')
  async testRequiredDocuments(@Body() body: TestEmailDto) {
    if (!body.email) {
      throw new BadRequestException('email is required');
    }

    await this.notificationService.sendRequiredDocuments({
      email: body.email,
      items: body.items,
    });

    return {
      success: true,
      message: `Required documents email queued to ${body.email}`,
    };
  }
}
