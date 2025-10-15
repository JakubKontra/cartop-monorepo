import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { render } from '@react-email/render';
import { JSX } from 'react';
type EmailTemplatesModule = typeof import('@cartop/email-templates');
import { DevOnlyGuard } from './guards/dev-only.guard';
import { Public } from '../common/decorators/auth/public.decorator';

/**
 * Email Preview Controller
 * Provides email preview endpoints for development/testing
 * Only available in development/local environments
 */
@Controller('email-preview')
@Public()
@UseGuards(DevOnlyGuard)
export class EmailPreviewController {
  private emailTemplatesModule: EmailTemplatesModule | null = null;

  private async getTemplatesModule(): Promise<EmailTemplatesModule> {
    if (!this.emailTemplatesModule) {
      this.emailTemplatesModule = await import('@cartop/email-templates');
    }
    return this.emailTemplatesModule;
  }
  /**
   * List all available email templates
   */
  @Get()
  async listTemplates() {
    const templates = [
      { name: 'forgotten-password', component: 'LostPasswordTemplate', category: 'transactional' },
      { name: 'account-verify', component: 'AccountVerifyTemplate', category: 'transactional' },
      { name: 'password-success', component: 'PasswordSuccessTemplate', category: 'transactional' },
      { name: 'change-password', component: 'ChangePasswordTemplate', category: 'transactional' },
      { name: 'contact-inquiry', component: 'ContactInquiryTemplate', category: 'transactional' },
      {
        name: 'contact-confirmation',
        component: 'ContactConfirmationTemplate',
        category: 'transactional',
      },
      {
        name: 'documents-complete',
        component: 'DocumentsCompleteTemplate',
        category: 'transactional',
      },
      {
        name: 'document-incomplete',
        component: 'DocumentIncompleteTemplate',
        category: 'transactional',
      },
      {
        name: 'required-documents',
        component: 'RequiredDocumentsTemplate',
        category: 'transactional',
      },
      {
        name: 'reminder-missing-docs',
        component: 'ReminderMissingDocsTemplate',
        category: 'transactional',
      },
      { name: 'single-leasing', component: 'SingleLeasingTemplate', category: 'offer' },
      { name: 'multiple-leasing', component: 'MultipleLeasingTemplate', category: 'offer' },
    ];

    return {
      templates,
      baseUrl: '/email-preview/render',
      example: '/email-preview/render?template=forgotten-password',
    };
  }

  /**
   * Preview forgotten password email
   */
  @Get('forgotten-password')
  async previewForgottenPassword(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(
      EmailTemplates.LostPasswordTemplate({
        resetPasswordLink: 'https://cartop.cz/reset-password?token=SAMPLE_TOKEN',
        operatingSystem: 'macOS',
        browserName: 'Chrome',
      }),
    );
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Preview account verification email
   */
  @Get('account-verify')
  async previewAccountVerify(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(
      EmailTemplates.AccountVerifyTemplate({
        loginLink: 'https://cartop.cz/verify?token=SAMPLE_TOKEN',
        urlLink: 'https://cartop.cz/verify?token=SAMPLE_TOKEN',
      }),
    );
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Preview password success email
   */
  @Get('password-success')
  async previewPasswordSuccess(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(
      EmailTemplates.PasswordSuccessTemplate({
        loginLink: 'https://cartop.cz/login',
        firstName: 'Jan',
        lastName: 'Novák',
      }),
    );
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Preview contact inquiry email
   */
  @Get('contact-inquiry')
  async previewContactInquiry(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(EmailTemplates.ContactInquiryTemplate({}));
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Preview contact confirmation email
   */
  @Get('contact-confirmation')
  async previewContactConfirmation(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(EmailTemplates.ContactConfirmationTemplate());
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Preview documents complete email
   */
  @Get('documents-complete')
  async previewDocumentsComplete(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(
      EmailTemplates.DocumentsCompleteTemplate({
        items: [
          'zimní pneumatiky za zvýhodněnou cenu',
          'pojištění s nulovou spoluúčastí',
          'zvýhodněné balíčky při objednávce společně s vozem',
        ],
        offerLink: 'https://cartop.cz/offers/sample-offer',
      }),
    );
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Preview document incomplete email
   */
  @Get('document-incomplete')
  async previewDocumentIncomplete(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(
      EmailTemplates.DocumentIncompleteTemplate({
        saleRepresentativeName: 'Petr Novák',
        comment: 'Je potřeba doložit kopii občanského průkazu a výpis z účtu za poslední 3 měsíce.',
      }),
    );
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Preview required documents email
   */
  @Get('required-documents')
  async previewRequiredDocuments(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(
      EmailTemplates.RequiredDocumentsTemplate({
        items: [
          'Občanský průkaz nebo pas',
          'Potvrzení o příjmu za poslední 3 měsíce',
          'Výpis z bankovního účtu',
        ],
      }),
    );
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Preview single leasing offer email
   */
  @Get('single-leasing')
  async previewSingleLeasing(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(
      EmailTemplates.SingleLeasingTemplate({
        catalogPrice: '1 294 488 Kč s DPH',
        ourPrice: '11 999 Kč bez DPH',
        originalPrice: '19 638 Kč bez DPH',
        validityHeadline: 'DO 3 MĚSÍCŮ',
        validityNote: 'Platí pro omezený počet kusů!',
      }),
    );
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Preview multiple leasing offers email
   */
  @Get('multiple-leasing')
  async previewMultipleLeasing(@Res() res: FastifyReply) {
    const EmailTemplates = await this.getTemplatesModule();
    const html = await render(EmailTemplates.MultipleLeasingTemplate({}));
    res.header('Content-Type', 'text/html');
    res.send(html);
  }

  /**
   * Generic render endpoint - render any template with query params
   */
  @Get('render')
  async renderTemplate(
    @Query('template') templateName: string,
    @Query() params: Record<string, unknown>,
    @Res() res: FastifyReply,
  ) {
    if (!templateName) {
      res.status(400).send({
        error: 'Template name is required',
        example: '/email-preview/render?template=forgotten-password',
      });
      return;
    }

    // Remove 'template' from params to avoid passing it to the component
    const componentProps = { ...params } as Record<string, unknown>;
    delete (componentProps as Record<string, unknown>).template;

    // Template mapping
    const EmailTemplates = await this.getTemplatesModule();
    const templateMap: Record<string, keyof EmailTemplatesModule> = {
      'forgotten-password': 'LostPasswordTemplate',
      'account-verify': 'AccountVerifyTemplate',
      'password-success': 'PasswordSuccessTemplate',
      'change-password': 'ChangePasswordTemplate',
      'contact-inquiry': 'ContactInquiryTemplate',
      'contact-confirmation': 'ContactConfirmationTemplate',
      'documents-complete': 'DocumentsCompleteTemplate',
      'document-incomplete': 'DocumentIncompleteTemplate',
      'required-documents': 'RequiredDocumentsTemplate',
      'reminder-missing-docs': 'ReminderMissingDocsTemplate',
      'single-leasing': 'SingleLeasingTemplate',
      'multiple-leasing': 'MultipleLeasingTemplate',
    };

    const componentName = templateMap[templateName];
    if (!componentName) {
      res.status(404).send({
        error: `Template '${templateName}' not found`,
        available: Object.keys(templateMap),
      });
      return;
    }

    try {
      const TemplateComponent = EmailTemplates[
        componentName as keyof EmailTemplatesModule
      ] as unknown as (props: unknown) => JSX.Element;
      const html = await render(TemplateComponent(componentProps));
      res.header('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).send({
        error: 'Failed to render template',
        details: errorMessage,
      });
    }
  }
}
