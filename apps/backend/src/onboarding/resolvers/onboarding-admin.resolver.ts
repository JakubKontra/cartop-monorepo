import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/auth/current-user.decorator';
import { User } from '../../model/user/user.entity';
import { Onboarding, OnboardingStatus } from '../entities/onboarding.entity';
import { OnboardingDocument } from '../entities/onboarding-document.entity';
import { DocumentTemplate } from '../entities/document-template.entity';
import { OnboardingService } from '../onboarding.service';
import { ValidateDocumentInput } from '../dto/validate-document.input';

/**
 * Onboarding Admin Resolver
 * Admin operations for managing onboarding sessions
 */
@Resolver(() => Onboarding)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class OnboardingAdminResolver {
  constructor(private readonly onboardingService: OnboardingService) {}

  // === QUERIES ===

  @Query(() => [Onboarding], { name: 'allOnboardings' })
  async getAllOnboardings(
    @Args('status', { type: () => OnboardingStatus, nullable: true }) status?: OnboardingStatus,
    @Args('leasingCompanyId', { type: () => String, nullable: true }) leasingCompanyId?: string,
  ): Promise<Onboarding[]> {
    return this.onboardingService.findAll({ status, leasingCompanyId });
  }

  @Query(() => Onboarding, { name: 'onboarding' })
  async getOnboarding(@Args('id') id: string): Promise<Onboarding> {
    return this.onboardingService.findById(id);
  }

  @Query(() => [DocumentTemplate], { name: 'requiredDocumentsForOnboarding' })
  async getRequiredDocumentsForOnboarding(
    @Args('onboardingId') onboardingId: string,
  ): Promise<DocumentTemplate[]> {
    return this.onboardingService.getRequiredDocuments(onboardingId);
  }

  // === MUTATIONS ===

  @Mutation(() => Onboarding, { name: 'createOnboarding' })
  async createOnboarding(
    @Args('carRequestId') carRequestId: string,
    @Args('expirationDays', { type: () => Number, nullable: true, defaultValue: 30 })
    expirationDays?: number,
  ): Promise<Onboarding> {
    return this.onboardingService.createOnboarding(carRequestId, expirationDays);
  }

  @Mutation(() => OnboardingDocument, { name: 'validateDocument' })
  async validateDocument(
    @Args('documentId') documentId: string,
    @Args('input') input: ValidateDocumentInput,
    @CurrentUser() user: User,
  ): Promise<OnboardingDocument> {
    return this.onboardingService.validateDocument(
      documentId,
      user.id,
      input.status,
      input.note,
    );
  }

  @Mutation(() => Boolean, { name: 'sendOnboardingReminder' })
  async sendOnboardingReminder(@Args('onboardingId') onboardingId: string): Promise<boolean> {
    await this.onboardingService.sendReminder(onboardingId);
    return true;
  }

  @Mutation(() => Boolean, { name: 'updateOnboardingStatus' })
  async updateOnboardingStatus(
    @Args('onboardingId') onboardingId: string,
    @Args('status', { type: () => OnboardingStatus }) status: OnboardingStatus,
  ): Promise<boolean> {
    await this.onboardingService.updateStatus(onboardingId, status);
    return true;
  }
}
