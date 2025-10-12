import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsOptional, MinLength, IsUUID } from 'class-validator';

@InputType()
export class CreateCatalogBrandInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field()
  @IsString()
  @MinLength(2)
  slug: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySlug?: string;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isHighlighted?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isRecommended?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  logoId?: string;
}
