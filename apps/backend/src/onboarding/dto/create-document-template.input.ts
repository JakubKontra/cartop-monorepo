import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsBoolean, IsArray, IsInt, Min, IsUUID, IsOptional } from 'class-validator';

@InputType()
export class CreateDocumentTemplateInput {
  @Field()
  @IsUUID()
  leasingCompanyId: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  fieldName: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  helpText?: string;

  @Field()
  @IsBoolean()
  isRequired: boolean;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  acceptedFormats: string[];

  @Field(() => Int)
  @IsInt()
  @Min(1)
  maxSizeBytes: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}
