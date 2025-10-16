import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentTemplate } from './entities/document-template.entity';

export interface CreateDocumentTemplateInput {
  leasingCompanyId?: string | null; // Nullable - allows global templates
  name: string;
  fieldName: string;
  description?: string;
  helpText?: string;
  isRequired: boolean;
  acceptedFormats: string[];
  maxSizeBytes: number;
  displayOrder?: number;
}

export interface UpdateDocumentTemplateInput {
  name?: string;
  description?: string;
  helpText?: string;
  isRequired?: boolean;
  acceptedFormats?: string[];
  maxSizeBytes?: number;
  displayOrder?: number;
}

@Injectable()
export class DocumentTemplateService {
  constructor(
    @InjectRepository(DocumentTemplate)
    private readonly templateRepo: Repository<DocumentTemplate>,
  ) {}

  // === CREATE ===

  async create(input: CreateDocumentTemplateInput): Promise<DocumentTemplate> {
    // Check if fieldName already exists for this company (or globally if company is null)
    const where = input.leasingCompanyId
      ? { fieldName: input.fieldName, leasingCompanyId: input.leasingCompanyId }
      : { fieldName: input.fieldName, leasingCompanyId: null };

    const existing = await this.templateRepo.findOne({ where });

    if (existing) {
      const scope = input.leasingCompanyId ? 'this leasing company' : 'global templates';
      throw new ConflictException(
        `Document template with field name "${input.fieldName}" already exists in ${scope}`,
      );
    }

    const template = this.templateRepo.create(input);
    return this.templateRepo.save(template);
  }

  // === READ ===

  async findAll(leasingCompanyId?: string): Promise<DocumentTemplate[]> {
    const query = this.templateRepo
      .createQueryBuilder('template')
      .leftJoinAndSelect('template.leasingCompany', 'leasingCompany')
      .orderBy('template.displayOrder', 'ASC')
      .addOrderBy('template.name', 'ASC');

    if (leasingCompanyId) {
      query.where('template.leasingCompanyId = :leasingCompanyId', { leasingCompanyId });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<DocumentTemplate> {
    const template = await this.templateRepo.findOne({
      where: { id },
      relations: ['leasingCompany'],
    });

    if (!template) {
      throw new NotFoundException(`Document template with ID ${id} not found`);
    }

    return template;
  }

  /**
   * Find templates for a leasing company
   * Returns both global templates and company-specific templates
   * Company-specific templates override global ones with the same fieldName
   */
  async findByLeasingCompany(leasingCompanyId: string): Promise<DocumentTemplate[]> {
    // Get global templates (leasingCompanyId is NULL)
    const globalTemplates = await this.templateRepo.find({
      where: { leasingCompanyId: null },
      order: { displayOrder: 'ASC', name: 'ASC' },
    });

    // Get company-specific templates
    const companyTemplates = await this.templateRepo.find({
      where: { leasingCompanyId },
      order: { displayOrder: 'ASC', name: 'ASC' },
    });

    // Merge templates, with company-specific templates overriding global ones
    const templateMap = new Map<string, DocumentTemplate>();

    // Add global templates first
    for (const template of globalTemplates) {
      templateMap.set(template.fieldName, template);
    }

    // Override with company-specific templates
    for (const template of companyTemplates) {
      templateMap.set(template.fieldName, template);
    }

    // Return as array, sorted by displayOrder then name
    return Array.from(templateMap.values()).sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
      }
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Find only global templates
   */
  async findGlobalTemplates(): Promise<DocumentTemplate[]> {
    return this.templateRepo.find({
      where: { leasingCompanyId: null },
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  // === UPDATE ===

  async update(id: string, input: UpdateDocumentTemplateInput): Promise<DocumentTemplate> {
    const template = await this.findOne(id);

    Object.assign(template, input);

    return this.templateRepo.save(template);
  }

  // === DELETE ===

  async remove(id: string): Promise<boolean> {
    const template = await this.findOne(id);
    await this.templateRepo.remove(template);
    return true;
  }

  // === REORDER ===

  async reorder(ids: string[]): Promise<void> {
    for (let i = 0; i < ids.length; i++) {
      await this.templateRepo.update(ids[i], { displayOrder: i });
    }
  }
}
