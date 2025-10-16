import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customAlphabet } from 'nanoid';
import { Onboarding, OnboardingStatus } from './entities/onboarding.entity';
import { OnboardingDocument, DocumentValidationStatus } from './entities/onboarding-document.entity';
import { DocumentTemplate } from './entities/document-template.entity';
import { DocumentTemplateService } from './document-template.service';
import { FileService } from '../file/file.service';
import { EmailService } from '../notification/email/email.service';
import { CarRequest } from '../car-request/entities/car-request.entity';

// Generate URL-safe tokens
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 32);

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Onboarding)
    private readonly onboardingRepo: Repository<Onboarding>,
    @InjectRepository(OnboardingDocument)
    private readonly onboardingDocRepo: Repository<OnboardingDocument>,
    @InjectRepository(DocumentTemplate)
    private readonly documentTemplateRepo: Repository<DocumentTemplate>,
    @InjectRepository(CarRequest)
    private readonly carRequestRepo: Repository<CarRequest>,
    private readonly documentTemplateService: DocumentTemplateService,
    private readonly fileService: FileService,
    private readonly emailService: EmailService,
  ) {}

  // === CREATE ===

  /**
   * Create a new onboarding session for a car request
   */
  async createOnboarding(carRequestId: string, expirationDays = 30): Promise<Onboarding> {
    // Verify car request exists and has a leasing company
    const carRequest = await this.carRequestRepo.findOne({
      where: { id: carRequestId },
      relations: ['leasingCompany', 'customer'],
    });

    if (!carRequest) {
      throw new NotFoundException(`Car request with ID ${carRequestId} not found`);
    }

    if (!carRequest.leasingCompanyId) {
      throw new BadRequestException('Car request must have a leasing company assigned');
    }

    // Check if onboarding already exists
    const existing = await this.onboardingRepo.findOne({
      where: { carRequestId },
    });

    if (existing) {
      throw new BadRequestException('Onboarding already exists for this car request');
    }

    // Generate unique token
    const token = nanoid();

    // Calculate expiration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expirationDays);

    // Create onboarding
    const onboarding = this.onboardingRepo.create({
      token,
      carRequestId,
      leasingCompanyId: carRequest.leasingCompanyId,
      status: OnboardingStatus.PENDING,
      expiresAt,
    });

    const saved = await this.onboardingRepo.save(onboarding);

    // Send initial email with upload link
    if (carRequest.customer?.email || carRequest.requestEmail) {
      const email = carRequest.customer?.email || carRequest.requestEmail!;
      const uploadLink = `${process.env.CLIENT_URL}/onboarding/${token}`;

      await this.emailService.sendEmail({
        to: email,
        subject: 'Complete Your Document Upload',
        template: 'required-documents',
        data: {
          uploadLink,
          expiresAt: expiresAt.toISOString(),
          customerName: carRequest.customer?.firstName || carRequest.requestFirstName || 'Customer',
        },
        userId: carRequest.customerId,
      });
    }

    return saved;
  }

  // === READ ===

  /**
   * Get onboarding by token (public access)
   */
  async findByToken(token: string): Promise<Onboarding> {
    const onboarding = await this.onboardingRepo.findOne({
      where: { token },
      relations: [
        'leasingCompany',
        'carRequest',
        'documents',
        'documents.documentTemplate',
        'documents.file',
      ],
    });

    if (!onboarding) {
      throw new NotFoundException('Onboarding session not found');
    }

    // Check if expired
    if (new Date() > onboarding.expiresAt && onboarding.status !== OnboardingStatus.COMPLETE) {
      await this.updateStatus(onboarding.id, OnboardingStatus.EXPIRED);
      onboarding.status = OnboardingStatus.EXPIRED;
    }

    return onboarding;
  }

  /**
   * Get onboarding by ID (admin access)
   */
  async findById(id: string): Promise<Onboarding> {
    const onboarding = await this.onboardingRepo.findOne({
      where: { id },
      relations: [
        'leasingCompany',
        'carRequest',
        'carRequest.customer',
        'documents',
        'documents.documentTemplate',
        'documents.file',
        'documents.validatedBy',
      ],
    });

    if (!onboarding) {
      throw new NotFoundException(`Onboarding with ID ${id} not found`);
    }

    return onboarding;
  }

  /**
   * Get all onboardings (admin access)
   */
  async findAll(filters?: {
    status?: OnboardingStatus;
    leasingCompanyId?: string;
  }): Promise<Onboarding[]> {
    const query = this.onboardingRepo
      .createQueryBuilder('onboarding')
      .leftJoinAndSelect('onboarding.leasingCompany', 'leasingCompany')
      .leftJoinAndSelect('onboarding.carRequest', 'carRequest')
      .leftJoinAndSelect('carRequest.customer', 'customer')
      .orderBy('onboarding.createdAt', 'DESC');

    if (filters?.status) {
      query.andWhere('onboarding.status = :status', { status: filters.status });
    }

    if (filters?.leasingCompanyId) {
      query.andWhere('onboarding.leasingCompanyId = :leasingCompanyId', {
        leasingCompanyId: filters.leasingCompanyId,
      });
    }

    return query.getMany();
  }

  /**
   * Get required document templates for an onboarding
   * Returns both global templates and company-specific templates
   * Company-specific templates override global ones with the same fieldName
   */
  async getRequiredDocuments(onboardingId: string): Promise<DocumentTemplate[]> {
    const onboarding = await this.findById(onboardingId);

    // Use DocumentTemplateService which handles global + specific templates
    return this.documentTemplateService.findByLeasingCompany(onboarding.leasingCompanyId);
  }

  // === UPLOAD DOCUMENT ===

  /**
   * Upload a document for onboarding (public access via token)
   */
  async uploadDocument(
    token: string,
    documentTemplateId: string,
    fileId: string,
  ): Promise<OnboardingDocument> {
    const onboarding = await this.findByToken(token);

    // Verify onboarding is not expired or complete
    if (onboarding.status === OnboardingStatus.EXPIRED) {
      throw new BadRequestException('This onboarding session has expired');
    }

    if (onboarding.status === OnboardingStatus.COMPLETE) {
      throw new BadRequestException('This onboarding session is already complete');
    }

    // Verify document template belongs to this leasing company or is global
    const template = await this.documentTemplateRepo.findOne({
      where: [
        // Company-specific template
        { id: documentTemplateId, leasingCompanyId: onboarding.leasingCompanyId },
        // Global template
        { id: documentTemplateId, leasingCompanyId: null },
      ],
    });

    if (!template) {
      throw new NotFoundException('Document template not found');
    }

    // Verify file exists
    await this.fileService.findOne(fileId);

    // Check if document already exists (replace if so)
    const existing = await this.onboardingDocRepo.findOne({
      where: {
        onboardingId: onboarding.id,
        documentTemplateId,
      },
    });

    if (existing) {
      // Update existing
      existing.fileId = fileId;
      existing.validationStatus = DocumentValidationStatus.PENDING;
      existing.validationNote = undefined;
      existing.validatedById = undefined;
      existing.validatedAt = undefined;
      await this.onboardingDocRepo.save(existing);

      // Reload with relations for GraphQL response
      const updated = await this.onboardingDocRepo.findOne({
        where: { id: existing.id },
        relations: ['file', 'documentTemplate'],
      });

      return updated!;
    }

    // Create new document
    const document = this.onboardingDocRepo.create({
      onboardingId: onboarding.id,
      documentTemplateId,
      fileId,
      validationStatus: DocumentValidationStatus.PENDING,
    });

    const saved = await this.onboardingDocRepo.save(document);

    // Update onboarding status to IN_PROGRESS if it was PENDING
    if (onboarding.status === OnboardingStatus.PENDING) {
      await this.updateStatus(onboarding.id, OnboardingStatus.IN_PROGRESS);
    }

    return saved;
  }

  // === VALIDATE DOCUMENT ===

  /**
   * Validate or reject a document (admin only)
   */
  async validateDocument(
    documentId: string,
    validatorId: string,
    status: DocumentValidationStatus,
    note?: string,
  ): Promise<OnboardingDocument> {
    const document = await this.onboardingDocRepo.findOne({
      where: { id: documentId },
      relations: ['onboarding', 'onboarding.carRequest', 'onboarding.carRequest.customer'],
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // Update validation
    document.validationStatus = status;
    document.validationNote = note;
    document.validatedById = validatorId;
    document.validatedAt = new Date();

    await this.onboardingDocRepo.save(document);

    // Check if all documents are validated
    await this.checkCompletionStatus(document.onboarding.id);

    return document;
  }

  // === STATUS MANAGEMENT ===

  /**
   * Check if onboarding is complete and update status
   */
  private async checkCompletionStatus(onboardingId: string): Promise<void> {
    const onboarding = await this.findById(onboardingId);
    const requiredTemplates = await this.getRequiredDocuments(onboardingId);
    const documents = onboarding.documents || [];

    // Check if all required documents are uploaded
    const requiredIds = requiredTemplates.filter((t) => t.isRequired).map((t) => t.id);
    const uploadedIds = documents.map((d) => d.documentTemplateId);
    const allUploaded = requiredIds.every((id) => uploadedIds.includes(id));

    if (!allUploaded) {
      return; // Not all documents uploaded yet
    }

    // Check validation status
    const allApproved = documents.every(
      (d) => d.validationStatus === DocumentValidationStatus.APPROVED,
    );
    const anyRejected = documents.some(
      (d) => d.validationStatus === DocumentValidationStatus.REJECTED,
    );

    if (allApproved) {
      await this.updateStatus(onboardingId, OnboardingStatus.COMPLETE);
      onboarding.completedAt = new Date();
      await this.onboardingRepo.save(onboarding);

      // Send completion email
      await this.sendCompletionEmail(onboarding);
    } else if (anyRejected) {
      await this.updateStatus(onboardingId, OnboardingStatus.INCOMPLETE);

      // Send rejection email
      await this.sendRejectionEmail(onboarding);
    }
  }

  /**
   * Update onboarding status
   */
  async updateStatus(onboardingId: string, status: OnboardingStatus): Promise<void> {
    await this.onboardingRepo.update(onboardingId, { status });
  }

  // === EMAIL NOTIFICATIONS ===

  /**
   * Send completion email
   */
  private async sendCompletionEmail(onboarding: Onboarding): Promise<void> {
    const carRequest = onboarding.carRequest;
    const email = carRequest.customer?.email || carRequest.requestEmail;

    if (!email) return;

    await this.emailService.sendEmail({
      to: email,
      subject: 'Documents Approved - Application Complete',
      template: 'documents-complete',
      data: {
        customerName: carRequest.customer?.firstName || carRequest.requestFirstName || 'Customer',
      },
      userId: carRequest.customerId,
    });
  }

  /**
   * Send rejection email with list of rejected documents
   */
  private async sendRejectionEmail(onboarding: Onboarding): Promise<void> {
    const carRequest = onboarding.carRequest;
    const email = carRequest.customer?.email || carRequest.requestEmail;

    if (!email) return;

    const rejectedDocs = (onboarding.documents || [])
      .filter((d) => d.validationStatus === DocumentValidationStatus.REJECTED)
      .map((d) => ({
        name: d.documentTemplate.name,
        reason: d.validationNote || 'Document needs to be resubmitted',
      }));

    const uploadLink = `${process.env.CLIENT_URL}/onboarding/${onboarding.token}`;

    await this.emailService.sendEmail({
      to: email,
      subject: 'Document Resubmission Required',
      template: 'document-incomplete',
      data: {
        customerName: carRequest.customer?.firstName || carRequest.requestFirstName || 'Customer',
        rejectedDocuments: rejectedDocs,
        uploadLink,
      },
      userId: carRequest.customerId,
    });
  }

  /**
   * Send reminder email for incomplete onboarding
   */
  async sendReminder(onboardingId: string): Promise<void> {
    const onboarding = await this.findById(onboardingId);

    if (onboarding.status === OnboardingStatus.COMPLETE) {
      throw new BadRequestException('Onboarding is already complete');
    }

    const carRequest = onboarding.carRequest;
    const email = carRequest.customer?.email || carRequest.requestEmail;

    if (!email) {
      throw new BadRequestException('No email address available for this onboarding');
    }

    const uploadLink = `${process.env.CLIENT_URL}/onboarding/${onboarding.token}`;
    const requiredTemplates = await this.getRequiredDocuments(onboardingId);
    const uploadedIds = (onboarding.documents || []).map((d) => d.documentTemplateId);
    const missingDocs = requiredTemplates
      .filter((t) => t.isRequired && !uploadedIds.includes(t.id))
      .map((t) => t.name);

    await this.emailService.sendEmail({
      to: email,
      subject: 'Reminder: Complete Your Document Upload',
      template: 'reminder-missing-docs',
      data: {
        customerName: carRequest.customer?.firstName || carRequest.requestFirstName || 'Customer',
        missingDocuments: missingDocs,
        uploadLink,
        expiresAt: onboarding.expiresAt.toISOString(),
      },
      userId: carRequest.customerId,
    });

    // Update reminder timestamp
    onboarding.lastReminderSentAt = new Date();
    await this.onboardingRepo.save(onboarding);
  }
}
