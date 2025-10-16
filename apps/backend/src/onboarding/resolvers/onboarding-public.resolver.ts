import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Public } from '../../common/decorators/auth/public.decorator';
import { Onboarding } from '../entities/onboarding.entity';
import { OnboardingDocument } from '../entities/onboarding-document.entity';
import { DocumentTemplate } from '../entities/document-template.entity';
import { OnboardingService } from '../onboarding.service';
import { UploadDocumentInput } from '../dto/upload-document.input';

/**
 * Onboarding Public Resolver
 * Public operations for document upload (no authentication required)
 */
@Resolver(() => Onboarding)
@Public()
export class OnboardingPublicResolver {
  constructor(private readonly onboardingService: OnboardingService) {}

  // === QUERIES ===

  @Query(() => Onboarding, { name: 'onboardingByToken' })
  async getOnboardingByToken(@Args('token') token: string): Promise<Onboarding> {
    return this.onboardingService.findByToken(token);
  }

  @Query(() => [DocumentTemplate], { name: 'requiredDocumentsByToken' })
  async getRequiredDocumentsByToken(@Args('token') token: string): Promise<DocumentTemplate[]> {
    const onboarding = await this.onboardingService.findByToken(token);
    return this.onboardingService.getRequiredDocuments(onboarding.id);
  }

  // === MUTATIONS ===

  @Mutation(() => OnboardingDocument, { name: 'uploadOnboardingDocument' })
  async uploadOnboardingDocument(
    @Args('token') token: string,
    @Args('input') input: UploadDocumentInput,
  ): Promise<OnboardingDocument> {
    return this.onboardingService.uploadDocument(
      token,
      input.documentTemplateId,
      input.fileId,
    );
  }
}
