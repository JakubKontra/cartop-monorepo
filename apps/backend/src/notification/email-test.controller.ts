import { Controller, Post, Get, Body, Param, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { DevOnlyGuard } from './guards/dev-only.guard';
import { Public } from '../common/decorators/auth/public.decorator';
import { NotificationService } from './notification.service';
import { EmailService } from './email/email.service';

interface SendEmailDto {
  to: string;
  template?: string;
  data?: Record<string, unknown>;
}

interface TemplateInfo {
  name: string;
  category: string;
  requiredFields: string[];
  optionalFields: string[];
  example: Record<string, unknown>;
}

/**
 * Email Test Controller
 * Provides endpoints to send test emails via Mailpit in development
 * Only available in development/local environments
 */
@ApiTags('Email Testing (Dev Only)')
@Controller('email-test')
@Public()
@UseGuards(DevOnlyGuard)
export class EmailTestController {
  private readonly logger = new Logger(EmailTestController.name);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Check email configuration and provider status
   */
  @Get('config')
  @ApiOperation({ summary: 'Check email provider configuration' })
  @ApiResponse({ status: 200, description: 'Configuration status' })
  async getEmailConfig(): Promise<{
    nodeEnv: string;
    hasSmtpConfig: boolean;
    emailProvider: string;
    smtpHost?: string;
    smtpPort?: string;
    emailFrom?: string;
    providerHealthy: boolean;
    recommendations: string[];
  }> {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const emailFrom = process.env.EMAIL_FROM;
    const hasSmtpConfig = !!smtpHost;

    // Determine which provider will be used
    const isDevelopment = nodeEnv === 'development';
    const emailProvider = isDevelopment && hasSmtpConfig ? 'smtp' : 'mailgun';

    // Check provider health
    const providerHealthy = await this.emailService.healthCheck();

    const recommendations: string[] = [];

    if (!hasSmtpConfig && isDevelopment) {
      recommendations.push('Add SMTP_HOST=localhost to .env to use Mailpit');
      recommendations.push('Add SMTP_PORT=1025 to .env for Mailpit SMTP port');
    }

    if (!emailFrom) {
      recommendations.push('Set EMAIL_FROM in .env (e.g., noreply@cartop.cz)');
    }

    if (!providerHealthy) {
      if (emailProvider === 'smtp') {
        recommendations.push('SMTP provider not healthy - check if Mailpit is running (docker-compose up)');
      } else {
        recommendations.push('Mailgun not configured - set MAILGUN_API_KEY and MAILGUN_DOMAIN');
      }
    }

    return {
      nodeEnv,
      hasSmtpConfig,
      emailProvider,
      smtpHost,
      smtpPort,
      emailFrom,
      providerHealthy,
      recommendations,
    };
  }

  /**
   * List all available email templates with their required fields
   */
  @Get('templates')
  @ApiOperation({ summary: 'List available email templates' })
  @ApiResponse({ status: 200, description: 'List of templates with field information' })
  getTemplates(): { templates: TemplateInfo[]; mailpitUrl: string } {
    const templates: TemplateInfo[] = [
      {
        name: 'forgotten-password',
        category: 'transactional',
        requiredFields: ['email', 'resetPasswordLink'],
        optionalFields: ['operatingSystem', 'browserName', 'userId'],
        example: {
          email: 'test@example.com',
          resetPasswordLink: 'https://cartop.cz/reset-password?token=SAMPLE_TOKEN',
          operatingSystem: 'macOS',
          browserName: 'Chrome',
        },
      },
      {
        name: 'account-verify',
        category: 'transactional',
        requiredFields: ['email', 'loginLink'],
        optionalFields: ['urlLink', 'userId'],
        example: {
          email: 'test@example.com',
          loginLink: 'https://cartop.cz/verify?token=SAMPLE_TOKEN',
          urlLink: 'https://cartop.cz/verify?token=SAMPLE_TOKEN',
        },
      },
      {
        name: 'password-success',
        category: 'transactional',
        requiredFields: ['email'],
        optionalFields: ['userId'],
        example: {
          email: 'test@example.com',
        },
      },
      {
        name: 'contact-inquiry',
        category: 'transactional',
        requiredFields: ['adminEmail', 'customerName', 'customerEmail', 'customerPhone', 'message'],
        optionalFields: ['replyTo'],
        example: {
          adminEmail: 'admin@example.com',
          customerName: 'Jan Novák',
          customerEmail: 'jan.novak@example.com',
          customerPhone: '+420 123 456 789',
          message: 'Mám zájem o operativní leasing na Škoda Octavia.',
          replyTo: 'jan.novak@example.com',
        },
      },
      {
        name: 'contact-confirmation',
        category: 'transactional',
        requiredFields: ['email'],
        optionalFields: ['userId'],
        example: {
          email: 'test@example.com',
        },
      },
      {
        name: 'documents-complete',
        category: 'transactional',
        requiredFields: ['email'],
        optionalFields: ['items', 'offerLink', 'userId'],
        example: {
          email: 'test@example.com',
          items: ['zimní pneumatiky', 'zvýhodněné balíčky při objednávce společně s vozem'],
          offerLink: 'https://cartop.cz/offers/sample-offer',
        },
      },
      {
        name: 'document-incomplete',
        category: 'transactional',
        requiredFields: ['email'],
        optionalFields: ['saleRepresentativeName', 'comment', 'userId'],
        example: {
          email: 'test@example.com',
          saleRepresentativeName: 'Petr Novák',
          comment: 'Je potřeba doložit chybějící dokumenty.',
        },
      },
      {
        name: 'required-documents',
        category: 'transactional',
        requiredFields: ['email'],
        optionalFields: ['items', 'userId'],
        example: {
          email: 'test@example.com',
          items: ['Občanský průkaz', 'Výpis z účtu'],
        },
      },
    ];

    return {
      templates,
      mailpitUrl: 'http://localhost:8025',
    };
  }

  /**
   * Send a test email for a specific template with default data
   */
  @Post('send/:templateName')
  @ApiOperation({ summary: 'Send test email for specific template' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'test@example.com' },
      },
      required: ['to'],
    },
  })
  @ApiResponse({ status: 200, description: 'Email queued successfully' })
  @ApiResponse({ status: 400, description: 'Invalid template name' })
  async sendTemplateEmail(
    @Param('templateName') templateName: string,
    @Body() body: { to: string },
  ): Promise<{ success: boolean; message: string; mailpitUrl: string }> {
    const { to } = body;

    try {
      switch (templateName) {
        case 'forgotten-password':
          await this.notificationService.sendPasswordReset({
            email: to,
            resetPasswordLink: 'https://cartop.cz/reset-password?token=TEST_TOKEN_' + Date.now(),
            operatingSystem: 'macOS',
            browserName: 'Chrome',
          });
          break;

        case 'account-verify':
          await this.notificationService.sendAccountVerification({
            email: to,
            loginLink: 'https://cartop.cz/verify?token=TEST_TOKEN_' + Date.now(),
            urlLink: 'https://cartop.cz/verify?token=TEST_TOKEN_' + Date.now(),
          });
          break;

        case 'password-success':
          await this.notificationService.sendPasswordSuccess({
            email: to,
          });
          break;

        case 'contact-inquiry':
          await this.notificationService.sendContactInquiry({
            adminEmail: to,
            customerName: 'Jan Novák',
            customerEmail: 'jan.novak@example.com',
            customerPhone: '+420 123 456 789',
            message: 'Mám zájem o operativní leasing na Škoda Octavia.',
            replyTo: 'jan.novak@example.com',
          });
          break;

        case 'contact-confirmation':
          await this.notificationService.sendContactConfirmation({
            email: to,
          });
          break;

        case 'documents-complete':
          await this.notificationService.sendDocumentsComplete({
            email: to,
            items: ['zimní pneumatiky', 'zvýhodněné balíčky při objednávce společně s vozem'],
            offerLink: 'https://cartop.cz/offers/sample-offer',
          });
          break;

        case 'document-incomplete':
          await this.notificationService.sendDocumentIncomplete({
            email: to,
            saleRepresentativeName: 'Petr Novák',
            comment: 'Je potřeba doložit kopii občanského průkazu a výpis z účtu za poslední 3 měsíce.',
          });
          break;

        case 'required-documents':
          await this.notificationService.sendRequiredDocuments({
            email: to,
            items: ['Občanský průkaz', 'Potvrzení o příjmu za poslední 3 měsíce', 'Výpis z bankovního účtu'],
          });
          break;

        default:
          return {
            success: false,
            message: `Unknown template: ${templateName}`,
            mailpitUrl: 'http://localhost:8025',
          };
      }

      this.logger.log(`Test email queued: ${templateName} to ${to}`);

      return {
        success: true,
        message: `Email '${templateName}' queued successfully to ${to}. Check Mailpit to view it.`,
        mailpitUrl: 'http://localhost:8025',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to send test email: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Send a custom test email with provided data
   */
  @Post('send')
  @ApiOperation({ summary: 'Send custom test email' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'test@example.com' },
        template: { type: 'string', example: 'forgotten-password' },
        data: {
          type: 'object',
          example: {
            resetPasswordLink: 'https://cartop.cz/reset-password?token=CUSTOM_TOKEN',
            operatingSystem: 'Windows',
            browserName: 'Firefox',
          },
        },
      },
      required: ['to', 'template'],
    },
  })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async sendCustomEmail(
    @Body() emailDto: SendEmailDto,
  ): Promise<{ success: boolean; message: string; mailpitUrl: string }> {
    const { to, template, data = {} } = emailDto;

    if (!template) {
      return {
        success: false,
        message: 'Template name is required',
        mailpitUrl: 'http://localhost:8025',
      };
    }

    try {
      // Map template names to notification service methods
      switch (template) {
        case 'forgotten-password':
          await this.notificationService.sendPasswordReset({
            email: to,
            resetPasswordLink: (data.resetPasswordLink as string) || 'https://cartop.cz/reset-password?token=CUSTOM_TOKEN',
            operatingSystem: (data.operatingSystem as string) || 'Unknown',
            browserName: (data.browserName as string) || 'Unknown',
            userId: data.userId as string,
          });
          break;

        case 'account-verify':
          await this.notificationService.sendAccountVerification({
            email: to,
            loginLink: (data.loginLink as string) || 'https://cartop.cz/verify?token=CUSTOM_TOKEN',
            urlLink: (data.urlLink as string) || undefined,
            userId: data.userId as string,
          });
          break;

        case 'password-success':
          await this.notificationService.sendPasswordSuccess({
            email: to,
            userId: data.userId as string,
          });
          break;

        case 'contact-inquiry':
          await this.notificationService.sendContactInquiry({
            adminEmail: to,
            customerName: (data.customerName as string) || 'Test User',
            customerEmail: (data.customerEmail as string) || 'customer@example.com',
            customerPhone: (data.customerPhone as string) || '+420 123 456 789',
            message: (data.message as string) || 'Test message',
            replyTo: data.replyTo as string,
          });
          break;

        case 'contact-confirmation':
          await this.notificationService.sendContactConfirmation({
            email: to,
            userId: data.userId as string,
          });
          break;

        case 'documents-complete':
          await this.notificationService.sendDocumentsComplete({
            email: to,
            items: (data.items as string[]) || undefined,
            offerLink: data.offerLink as string,
            userId: data.userId as string,
          });
          break;

        case 'document-incomplete':
          await this.notificationService.sendDocumentIncomplete({
            email: to,
            saleRepresentativeName: data.saleRepresentativeName as string,
            comment: data.comment as string,
            userId: data.userId as string,
          });
          break;

        case 'required-documents':
          await this.notificationService.sendRequiredDocuments({
            email: to,
            items: (data.items as string[]) || undefined,
            userId: data.userId as string,
          });
          break;

        default:
          return {
            success: false,
            message: `Unknown template: ${template}`,
            mailpitUrl: 'http://localhost:8025',
          };
      }

      this.logger.log(`Custom test email queued: ${template} to ${to}`);

      return {
        success: true,
        message: `Email '${template}' queued successfully to ${to}. Check Mailpit to view it.`,
        mailpitUrl: 'http://localhost:8025',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to send custom test email: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Send test email directly (bypasses queue - immediate send)
   * Use this when the queue processor is not running
   */
  @Post('send-direct/:templateName')
  @ApiOperation({ summary: 'Send test email directly without queue (immediate)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'test@example.com' },
      },
      required: ['to'],
    },
  })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  async sendDirectEmail(
    @Param('templateName') templateName: string,
    @Body() body: { to: string },
  ): Promise<{ success: boolean; message: string; mailpitUrl: string }> {
    const { to } = body;

    try {
      // Template data mapping with sensible defaults
      const templateDataMap: Record<string, { subject: string; template: string; data: Record<string, unknown> }> = {
        'forgotten-password': {
          subject: 'Obnovení hesla k účtu Cartop.cz',
          template: 'forgotten-password',
          data: {
            resetPasswordLink: 'https://cartop.cz/reset-password?token=TEST_TOKEN_' + Date.now(),
            operatingSystem: 'macOS',
            browserName: 'Chrome',
          },
        },
        'account-verify': {
          subject: 'Ověření účtu Cartop.cz',
          template: 'account-verify',
          data: {
            loginLink: 'https://cartop.cz/verify?token=TEST_TOKEN_' + Date.now(),
            urlLink: 'https://cartop.cz/verify?token=TEST_TOKEN_' + Date.now(),
          },
        },
        'password-success': {
          subject: 'Heslo bylo úspěšně změněno',
          template: 'password-success',
          data: {
            loginLink: 'https://cartop.cz/login',
            firstName: 'Jan',
            lastName: 'Novák',
          },
        },
        'contact-inquiry': {
          subject: 'Nová poptávka od Jan Novák',
          template: 'contact-inquiry',
          data: {
            customerName: 'Jan Novák',
            customerEmail: 'jan.novak@example.com',
            customerPhone: '+420 123 456 789',
            message: 'Mám zájem o operativní leasing na Škoda Octavia. Rád bych získal více informací o dostupných možnostech.',
          },
        },
        'contact-confirmation': {
          subject: 'Děkujeme za Vaši poptávku',
          template: 'contact-confirmation',
          data: {},
        },
        'documents-complete': {
          subject: 'Podklady kompletní - Speciální nabídka',
          template: 'documents-complete',
          data: {
            items: [
              'zimní pneumatiky za zvýhodněnou cenu',
              'pojištění s nulovou spoluúčastí',
              'zvýhodněné balíčky při objednávce společně s vozem',
            ],
            offerLink: 'https://cartop.cz/offers/sample-offer-' + Date.now(),
          },
        },
        'document-incomplete': {
          subject: 'Neúplné podklady - Akce potřebná',
          template: 'document-incomplete',
          data: {
            saleRepresentativeName: 'Petr Novák',
            comment: 'Je potřeba doložit kopii občanského průkazu a výpis z účtu za poslední 3 měsíce. Dokumenty můžete nahrát přes náš portál nebo zaslat e-mailem.',
          },
        },
        'required-documents': {
          subject: 'Potřebné dokumenty pro Vaši žádost',
          template: 'required-documents',
          data: {
            items: [
              'Občanský průkaz nebo pas',
              'Potvrzení o příjmu za poslední 3 měsíce',
              'Výpis z bankovního účtu za poslední 3 měsíce',
            ],
          },
        },
      };

      const emailData = templateDataMap[templateName];
      if (!emailData) {
        return {
          success: false,
          message: `Unknown template: ${templateName}. Available: ${Object.keys(templateDataMap).join(', ')}`,
          mailpitUrl: 'http://localhost:8025',
        };
      }

      // Send email directly using EmailService
      await this.emailService.sendEmail({
        to,
        subject: emailData.subject,
        template: emailData.template,
        data: emailData.data,
      });

      this.logger.log(`Test email sent directly: ${templateName} to ${to}`);

      return {
        success: true,
        message: `Email '${templateName}' sent directly to ${to}. Check Mailpit at http://localhost:8025`,
        mailpitUrl: 'http://localhost:8025',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to send direct test email: ${errorMessage}`, error);
      throw error;
    }
  }

  /**
   * Send all test emails at once (direct send)
   * Useful for quickly testing all email templates
   */
  @Post('send-all')
  @ApiOperation({ summary: 'Send all email templates at once (direct)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'test@example.com', description: 'Email address to send all templates to' },
      },
      required: ['to'],
    },
  })
  @ApiResponse({ status: 200, description: 'All emails sent successfully' })
  async sendAllEmails(
    @Body() body: { to: string },
  ): Promise<{ success: boolean; sent: string[]; failed: string[]; mailpitUrl: string }> {
    const { to } = body;
    const sent: string[] = [];
    const failed: string[] = [];

    const templates = [
      {
        name: 'forgotten-password',
        subject: 'Obnovení hesla k účtu Cartop.cz',
        template: 'forgotten-password',
        data: {
          resetPasswordLink: 'https://cartop.cz/reset-password?token=TEST_' + Date.now(),
          operatingSystem: 'macOS',
          browserName: 'Chrome',
        },
      },
      {
        name: 'account-verify',
        subject: 'Ověření účtu Cartop.cz',
        template: 'account-verify',
        data: {
          loginLink: 'https://cartop.cz/verify?token=TEST_' + Date.now(),
          urlLink: 'https://cartop.cz/verify?token=TEST_' + Date.now(),
        },
      },
      {
        name: 'password-success',
        subject: 'Heslo bylo úspěšně změněno',
        template: 'password-success',
        data: {
          loginLink: 'https://cartop.cz/login',
          firstName: 'Jan',
          lastName: 'Novák',
        },
      },
      {
        name: 'contact-inquiry',
        subject: 'Nová poptávka od Jan Novák',
        template: 'contact-inquiry',
        data: {
          customerName: 'Jan Novák',
          customerEmail: 'jan.novak@example.com',
          customerPhone: '+420 123 456 789',
          message: 'Mám zájem o operativní leasing na Škoda Octavia.',
        },
      },
      {
        name: 'contact-confirmation',
        subject: 'Děkujeme za Vaši poptávku',
        template: 'contact-confirmation',
        data: {},
      },
      {
        name: 'documents-complete',
        subject: 'Podklady kompletní - Speciální nabídka',
        template: 'documents-complete',
        data: {
          items: ['zimní pneumatiky', 'pojištění s nulovou spoluúčastí'],
          offerLink: 'https://cartop.cz/offers/sample-' + Date.now(),
        },
      },
      {
        name: 'document-incomplete',
        subject: 'Neúplné podklady - Akce potřebná',
        template: 'document-incomplete',
        data: {
          saleRepresentativeName: 'Petr Novák',
          comment: 'Je potřeba doložit chybějící dokumenty.',
        },
      },
      {
        name: 'required-documents',
        subject: 'Potřebné dokumenty pro Vaši žádost',
        template: 'required-documents',
        data: {
          items: ['Občanský průkaz', 'Výpis z účtu', 'Potvrzení o příjmu'],
        },
      },
    ];

    for (const emailTemplate of templates) {
      try {
        await this.emailService.sendEmail({
          to,
          subject: emailTemplate.subject,
          template: emailTemplate.template,
          data: emailTemplate.data,
        });
        sent.push(emailTemplate.name);
        this.logger.log(`Sent test email: ${emailTemplate.name} to ${to}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        failed.push(`${emailTemplate.name}: ${errorMessage}`);
        this.logger.error(`Failed to send ${emailTemplate.name}: ${errorMessage}`, error);
      }
    }

    return {
      success: failed.length === 0,
      sent,
      failed,
      mailpitUrl: 'http://localhost:8025',
    };
  }
}
