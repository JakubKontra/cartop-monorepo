import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DocumentValidationStatus } from '../entities/onboarding-document.entity';

@InputType()
export class ValidateDocumentInput {
  @Field(() => DocumentValidationStatus)
  @IsEnum(DocumentValidationStatus)
  status: DocumentValidationStatus;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  note?: string;
}
