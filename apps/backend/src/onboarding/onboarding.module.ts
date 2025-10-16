import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onboarding } from './entities/onboarding.entity';
import { OnboardingDocument } from './entities/onboarding-document.entity';
import { DocumentTemplate } from './entities/document-template.entity';
import { CarRequest } from '../car-request/entities/car-request.entity';
import { OnboardingService } from './onboarding.service';
import { DocumentTemplateService } from './document-template.service';
import { OnboardingAdminResolver } from './resolvers/onboarding-admin.resolver';
import { OnboardingPublicResolver } from './resolvers/onboarding-public.resolver';
import { DocumentTemplateResolver } from './resolvers/document-template.resolver';
import { FileModule } from '../file/file.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Onboarding,
      OnboardingDocument,
      DocumentTemplate,
      CarRequest,
    ]),
    FileModule,
    NotificationModule,
  ],
  providers: [
    OnboardingService,
    DocumentTemplateService,
    OnboardingAdminResolver,
    OnboardingPublicResolver,
    DocumentTemplateResolver,
  ],
  exports: [OnboardingService, DocumentTemplateService],
})
export class OnboardingModule {}
