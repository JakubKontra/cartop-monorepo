import { InputType, Field, Int, Float } from '@nestjs/graphql';
import {
  IsString,
  IsUUID,
  IsEnum,
  IsInt,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
  MinLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CatalogEngineFuelType,
  CatalogEngineTransmissionType,
  CatalogEngineDriveType,
} from '../../../common/enums/catalog';

@InputType()
export class CreateCatalogEngineInput {
  // Required fields
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field()
  @IsUUID()
  generationId: string;

  // Optional identifiers
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  legacySystemId?: string;

  // Engine type properties
  @Field(() => CatalogEngineFuelType, { nullable: true })
  @IsOptional()
  @IsEnum(CatalogEngineFuelType)
  fuelType?: CatalogEngineFuelType;

  @Field(() => CatalogEngineTransmissionType, { nullable: true })
  @IsOptional()
  @IsEnum(CatalogEngineTransmissionType)
  transmissionType?: CatalogEngineTransmissionType;

  @Field(() => CatalogEngineDriveType, { nullable: true })
  @IsOptional()
  @IsEnum(CatalogEngineDriveType)
  driveType?: CatalogEngineDriveType;

  // Consumption
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  consumptionCombined?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  consumptionCity?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  consumptionOutOfCity?: number;

  // Performance
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  performance?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  torque?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  volume?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  emission?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  rangeKm?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  acceleration?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  fuelTankVolume?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  cylinderCount?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxSpeed?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  weight?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  gearsCount?: number;

  // Production period
  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  productionStart?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  productionStop?: Date;

  // Flags
  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  recommended?: boolean;
}
