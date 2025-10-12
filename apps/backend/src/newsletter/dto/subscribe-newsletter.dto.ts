import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsArray,
  IsString,
  IsBoolean,
  IsEnum,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CatalogBodyType } from '../../common/enums/catalog/catalog-body-type.enum';
import { SubscriptionSource } from '../enums/subscription-source.enum';

/**
 * Price Range DTO
 */
export class PriceRangeDto {
  @ApiProperty({ required: false, description: 'Minimum price' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  min?: number;

  @ApiProperty({ required: false, description: 'Maximum price' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  max?: number;
}

/**
 * Subscription Preferences DTO
 */
export class SubscriptionPreferencesDto {
  @ApiProperty({
    required: false,
    type: [String],
    description: 'Array of brand UUIDs to filter by',
    example: ['550e8400-e29b-41d4-a716-446655440000'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  brandIds?: string[];

  @ApiProperty({
    required: false,
    type: [String],
    description: 'Array of model UUIDs to filter by',
    example: ['650e8400-e29b-41d4-a716-446655440001'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  modelIds?: string[];

  @ApiProperty({
    required: false,
    enum: CatalogBodyType,
    isArray: true,
    description: 'Array of body types to filter by',
    example: [CatalogBodyType.SUV, CatalogBodyType.SEDAN_LIFTBACK],
  })
  @IsOptional()
  @IsArray()
  @IsEnum(CatalogBodyType, { each: true })
  bodyTypes?: CatalogBodyType[];

  @ApiProperty({
    required: false,
    type: PriceRangeDto,
    description: 'Price range filter',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceRangeDto)
  priceRange?: PriceRangeDto;

  @ApiProperty({
    required: false,
    enum: ['daily', 'weekly', 'monthly'],
    description: 'Notification frequency preference',
    example: 'weekly',
  })
  @IsOptional()
  @IsEnum(['daily', 'weekly', 'monthly'])
  frequency?: 'daily' | 'weekly' | 'monthly';
}

/**
 * Subscribe to Newsletter DTO
 */
export class SubscribeNewsletterDto {
  @ApiProperty({
    description: 'Email address for newsletter subscription',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
    type: SubscriptionPreferencesDto,
    description: 'Optional filter preferences for personalized newsletters',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SubscriptionPreferencesDto)
  preferences?: SubscriptionPreferencesDto;

  @ApiProperty({
    description: 'User consent to privacy policy (GDPR compliance)',
    example: true,
  })
  @IsBoolean()
  consent: boolean;

  @ApiProperty({
    required: false,
    enum: SubscriptionSource,
    description: 'Source of subscription (auto-set to WEB if not provided)',
    example: SubscriptionSource.WEB,
  })
  @IsOptional()
  @IsEnum(SubscriptionSource)
  source?: SubscriptionSource;
}

/**
 * Subscription Response DTO
 */
export class SubscriptionResponseDto {
  @ApiProperty({ description: 'Subscription ID' })
  id: number;

  @ApiProperty({ description: 'Email address' })
  email: string;

  @ApiProperty({ description: 'Subscription status' })
  status: string;

  @ApiProperty({ description: 'Subscription source' })
  source: string;

  @ApiProperty({ required: false, description: 'Preferences' })
  preferences?: SubscriptionPreferencesDto;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Success message' })
  message: string;
}
