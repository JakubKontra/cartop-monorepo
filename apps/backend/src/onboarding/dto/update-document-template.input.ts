import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsBoolean, IsArray, IsInt, Min, IsOptional } from 'class-validator';

@InputType()
export class UpdateDocumentTemplateInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  helpText?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  acceptedFormats?: string[];

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  @IsOptional()
  maxSizeBytes?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}
