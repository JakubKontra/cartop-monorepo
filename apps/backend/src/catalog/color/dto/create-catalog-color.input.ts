import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, Matches, IsEnum } from 'class-validator';
import { CatalogColorType } from '../../../common/enums/catalog/catalog-color-type.enum';

@InputType()
export class CreateCatalogColorInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'Color must be a valid hex code (e.g., #FFFFFF)' })
  color?: string;

  @Field(() => CatalogColorType)
  @IsEnum(CatalogColorType)
  type: CatalogColorType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;
}
