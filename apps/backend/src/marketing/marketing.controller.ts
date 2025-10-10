import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Public } from '../common/decorators/auth/public.decorator';
import { MarketingService } from './marketing.service';
import {
  CreateTemplateDto,
  TemplateResponseDto,
  HealthCheckResponseDto,
} from './dto/create-template.dto';

/**
 * Marketing Controller
 * REST endpoints for Ecomail integration
 */
@ApiTags('Marketing')
@Controller('api/marketing')
export class MarketingController {
  private readonly logger = new Logger(MarketingController.name);

  constructor(private readonly marketingService: MarketingService) {}

  /**
   * Create email template in Ecomail
   * POST /api/marketing/ecomail/templates
   */
  @Public()
  @Post('ecomail/templates')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create email template in Ecomail',
    description:
      'Creates an HTML email template from offer data and syncs it to Ecomail. ' +
      'The template is rendered using React Email and uploaded to Ecomail for use in campaigns. ' +
      '**Note:** This endpoint is publicly accessible for development/testing purposes.',
  })
  @ApiBody({
    type: CreateTemplateDto,
    description: 'Template creation parameters',
    examples: {
      'Weekly Deals': {
        value: {
          offerIds: ['offer-1', 'offer-2', 'offer-3'],
          templateName: 'weekly-deals-2025-10-10',
          metadata: {
            campaign: 'weekly-deals',
            date: '2025-10-10',
          },
        },
      },
      'New Arrivals': {
        value: {
          offerIds: ['new-1', 'new-2'],
          templateName: 'new-arrivals-october',
          metadata: {
            campaign: 'new-arrivals',
            month: 'october',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Template successfully created and synced to Ecomail',
    type: TemplateResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['offerIds must be an array', 'templateName must be a string'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error - Template creation failed',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Template rendering failed' },
      },
    },
  })
  async createTemplate(
    @Body() dto: CreateTemplateDto,
  ): Promise<TemplateResponseDto> {
    this.logger.log(
      `Received request to create template: ${dto.templateName} with offer IDs: ${dto.offerIds.join(', ')}`,
    );

    const result = await this.marketingService.createEmailTemplate(dto);

    return {
      id: result.id,
      name: result.name,
      html: result.html,
      created_at: result.created_at,
      updated_at: result.updated_at,
      inline_css: result.inline_css,
    };
  }

  /**
   * Health check endpoint
   * GET /api/marketing/health
   */
  @Public()
  @Get('health')
  @HttpCode(HttpStatus.OK)
  @ApiTags('Health')
  @ApiOperation({
    summary: 'Health check',
    description:
      'Check if the marketing service and Ecomail integration are properly configured. ' +
      'Returns the status of the service and whether Ecomail API key is configured.',
  })
  @ApiResponse({
    status: 200,
    description: 'Service health status',
    type: HealthCheckResponseDto,
  })
  healthCheck(): HealthCheckResponseDto {
    const isHealthy = this.marketingService.healthCheck();
    return {
      status: isHealthy ? 'ok' : 'degraded',
      ecomail: isHealthy,
    };
  }
}
