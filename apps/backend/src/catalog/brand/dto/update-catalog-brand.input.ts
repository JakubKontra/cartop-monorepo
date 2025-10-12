import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsOptional, MinLength, IsUUID } from 'class-validator';

@InputType()
export class UpdateCatalogBrandInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isHighlighted?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isRecommended?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  logoId?: string;
}
