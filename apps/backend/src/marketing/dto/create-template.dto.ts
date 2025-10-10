import { IsArray, IsOptional, IsString, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for creating Ecomail email template
 */
export class CreateTemplateDto {
  /**
   * Array of offer IDs to include in the email template
   */
  @ApiProperty({
    description: 'Array of offer IDs to include in the email template',
    example: ['offer-1', 'offer-2', 'offer-3'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  offerIds: string[];

  /**
   * Name of the template in Ecomail
   */
  @ApiProperty({
    description: 'Name of the template in Ecomail',
    example: 'weekly-deals-2025-10-10',
  })
  @IsString()
  templateName: string;

  /**
   * Optional metadata for the template
   */
  @ApiPropertyOptional({
    description: 'Optional metadata for the template',
    example: {
      campaign: 'weekly-deals',
      date: '2025-10-10',
      region: 'EU',
    },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Response DTO for created template
 */
export class TemplateResponseDto {
  @ApiProperty({
    description: 'Template ID in Ecomail',
    example: 12345,
  })
  id: number;

  @ApiProperty({
    description: 'Template name',
    example: 'weekly-deals-2025-10-10',
  })
  name: string;

  @ApiProperty({
    description: 'HTML content of the template',
    example: '<html><body>...</body></html>',
  })
  html: string;

  @ApiProperty({
    description: 'Template creation timestamp',
    example: '2025-10-10T14:30:00Z',
  })
  created_at: string;

  @ApiProperty({
    description: 'Template last update timestamp',
    example: '2025-10-10T14:30:00Z',
  })
  updated_at: string;

  @ApiProperty({
    description: 'CSS inlining enabled (0 or 1)',
    example: 1,
  })
  inline_css: number;
}

/**
 * Health check response DTO
 */
export class HealthCheckResponseDto {
  @ApiProperty({
    description: 'Service status',
    example: 'ok',
    enum: ['ok', 'degraded'],
  })
  status: string;

  @ApiProperty({
    description: 'Ecomail integration status',
    example: true,
  })
  ecomail: boolean;
}
