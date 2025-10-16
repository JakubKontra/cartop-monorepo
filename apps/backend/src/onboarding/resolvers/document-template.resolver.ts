import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { DocumentTemplate } from '../entities/document-template.entity';
import { DocumentTemplateService } from '../document-template.service';
import { CreateDocumentTemplateInput } from '../dto/create-document-template.input';
import { UpdateDocumentTemplateInput } from '../dto/update-document-template.input';

/**
 * Document Template Resolver
 * Admin-only operations for managing document templates
 */
@Resolver(() => DocumentTemplate)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class DocumentTemplateResolver {
  constructor(private readonly templateService: DocumentTemplateService) {}

  // === QUERIES ===

  @Query(() => [DocumentTemplate], { name: 'allDocumentTemplates' })
  async getAllDocumentTemplates(
    @Args('leasingCompanyId', { type: () => String, nullable: true }) leasingCompanyId?: string,
  ): Promise<DocumentTemplate[]> {
    return this.templateService.findAll(leasingCompanyId);
  }

  @Query(() => DocumentTemplate, { name: 'documentTemplate' })
  async getDocumentTemplate(@Args('id') id: string): Promise<DocumentTemplate> {
    return this.templateService.findOne(id);
  }

  @Query(() => [DocumentTemplate], { name: 'documentTemplatesByLeasingCompany' })
  async getDocumentTemplatesByLeasingCompany(
    @Args('leasingCompanyId') leasingCompanyId: string,
  ): Promise<DocumentTemplate[]> {
    return this.templateService.findByLeasingCompany(leasingCompanyId);
  }

  // === MUTATIONS ===

  @Mutation(() => DocumentTemplate, { name: 'createDocumentTemplate' })
  async createDocumentTemplate(
    @Args('input') input: CreateDocumentTemplateInput,
  ): Promise<DocumentTemplate> {
    return this.templateService.create(input);
  }

  @Mutation(() => DocumentTemplate, { name: 'updateDocumentTemplate' })
  async updateDocumentTemplate(
    @Args('id') id: string,
    @Args('input') input: UpdateDocumentTemplateInput,
  ): Promise<DocumentTemplate> {
    return this.templateService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteDocumentTemplate' })
  async deleteDocumentTemplate(@Args('id') id: string): Promise<boolean> {
    return this.templateService.remove(id);
  }

  @Mutation(() => Boolean, { name: 'reorderDocumentTemplates' })
  async reorderDocumentTemplates(
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Promise<boolean> {
    await this.templateService.reorder(ids);
    return true;
  }
}
