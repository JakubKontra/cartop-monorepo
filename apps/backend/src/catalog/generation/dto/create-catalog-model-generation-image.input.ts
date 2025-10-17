import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUUID, IsInt, Min, IsBoolean, IsOptional, IsString, IsEnum } from 'class-validator';
import { CatalogImageType } from '../../../common/enums/catalog/catalog-image-type.enum';

@InputType()
export class CreateCatalogModelGenerationImageInput {
  @Field(() => Int, { description: 'Display order', defaultValue: 0 })
  @IsInt()
  @Min(0)
  order: number;

  @Field({ defaultValue: false })
  @IsBoolean()
  active: boolean;

  @Field(() => CatalogImageType, { description: 'Type/purpose of this image', defaultValue: CatalogImageType.EXTERIOR })
  @IsEnum(CatalogImageType)
  imageType: CatalogImageType;

  @Field({ nullable: true, description: 'Description/alt text for SEO' })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int, { nullable: true, description: '360 gallery frame position (0-35)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  galleryPosition?: number;

  @Field()
  @IsUUID()
  generationId: string;

  @Field()
  @IsUUID()
  imageId: string;

  @Field({ nullable: true, description: 'Exterior color ID for this image' })
  @IsOptional()
  @IsUUID()
  exteriorColorId?: string;

  @Field({ nullable: true, description: 'Interior color ID for this image' })
  @IsOptional()
  @IsUUID()
  interiorColorId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;
}
