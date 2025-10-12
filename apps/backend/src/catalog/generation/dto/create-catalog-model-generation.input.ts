import { InputType, Field, Int } from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';
import {
  IsString,
  IsBoolean,
  IsOptional,
  MinLength,
  IsInt,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { CatalogBodyType } from '../../../common/enums/catalog/catalog-body-type.enum';
import { CatalogEquipmentBrakeType } from '../../../common/enums/catalog/catalog-equipment-brake-type.enum';

@InputType()
export class CreateCatalogModelGenerationInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  legacySlug?: string;

  @Field()
  @IsUUID()
  modelId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  productionStart?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  productionStop?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  wheelbase?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  frontTrack?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  rearTrack?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  length?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  width?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  height?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  trunkSpaceMin?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  trunkSpaceMax?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @Field(() => CatalogBodyType, { nullable: true })
  @IsOptional()
  @IsEnum(CatalogBodyType)
  bodyType?: CatalogBodyType;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field(() => CatalogEquipmentBrakeType, { nullable: true })
  @IsOptional()
  @IsEnum(CatalogEquipmentBrakeType)
  frontBrakesType?: CatalogEquipmentBrakeType;

  @Field(() => CatalogEquipmentBrakeType, { nullable: true })
  @IsOptional()
  @IsEnum(CatalogEquipmentBrakeType)
  rearBrakesType?: CatalogEquipmentBrakeType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;
}
