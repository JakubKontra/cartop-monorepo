# Swagger/OpenAPI Documentation

This project includes Swagger/OpenAPI documentation for all REST API endpoints.

## 📚 Accessing Swagger UI

**Development/Local**: http://localhost:3000/api/docs

**Production**: Swagger is **automatically disabled** in production environments for security.

## Features

### 1. Interactive API Testing
- Try out endpoints directly from your browser
- No need for Postman or cURL
- Instant feedback with request/response previews

### 2. Complete Documentation
- All request parameters documented
- Response schemas with examples
- HTTP status codes explained
- Authentication requirements clearly marked

### 3. Multiple Examples
Each endpoint includes multiple real-world examples:
- **Weekly Deals** - Example campaign template
- **New Arrivals** - Product launch template
- And more...

### 4. Authentication Support
- JWT Bearer token authentication
- Click "Authorize" button to set your token
- Token persists across requests in the same session

## Configuration

### Enable/Disable Swagger

Swagger is controlled by the `NODE_ENV` environment variable:

```bash
# Enable Swagger (default for development)
NODE_ENV=development

# Disable Swagger (production)
NODE_ENV=production
```

### Customization

Swagger configuration is in `src/main.ts`:

```typescript
const config = new DocumentBuilder()
  .setTitle('Cartop API')
  .setDescription('REST API documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
```

## Adding Swagger to New Endpoints

### 1. Controller Decorators

```typescript
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Marketing')  // Group endpoints
@Controller('api/marketing')
export class MarketingController {

  @Post('templates')
  @ApiBearerAuth('JWT-auth')  // Require authentication
  @ApiOperation({
    summary: 'Create template',
    description: 'Detailed description here...',
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: ResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async createTemplate(@Body() dto: CreateDto) {
    // Implementation
  }
}
```

### 2. DTO Decorators

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateDto {
  @ApiProperty({
    description: 'Field description',
    example: 'example-value',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Optional field',
    example: 'optional-value',
  })
  @IsOptional()
  @IsString()
  optional?: string;
}
```

### 3. Response DTOs

```typescript
export class ResponseDto {
  @ApiProperty({
    description: 'Response ID',
    example: 123,
  })
  id: number;

  @ApiProperty({
    description: 'Response message',
    example: 'Success',
  })
  message: string;
}
```

## Best Practices

### 1. Always Add Descriptions
```typescript
@ApiOperation({
  summary: 'Short summary',  // Required
  description: 'Detailed explanation of what this endpoint does...',  // Recommended
})
```

### 2. Provide Examples
```typescript
@ApiProperty({
  description: 'User email',
  example: 'user@example.com',  // Always provide examples
})
email: string;
```

### 3. Document All Status Codes
```typescript
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
```

### 4. Use Tags for Organization
```typescript
@ApiTags('Marketing')  // Groups all marketing endpoints together
@ApiTags('Health')     // Groups health check endpoints
```

### 5. Document Authentication
```typescript
@ApiBearerAuth('JWT-auth')  // Shows lock icon in Swagger UI
```

## Security Considerations

### Why Disable in Production?

1. **Information Disclosure** - Reveals API structure to potential attackers
2. **Performance** - Swagger UI adds overhead
3. **Security Best Practice** - Internal documentation should not be publicly accessible

### Production Documentation

For production environments, consider:
- Separate documentation site (e.g., docs.yourapp.com)
- API documentation as part of developer portal
- Rate-limited, authenticated access to Swagger UI

## Troubleshooting

### Swagger UI not loading?

1. Check `NODE_ENV` is not set to `production`
2. Verify server is running: http://localhost:3000
3. Check console logs for Swagger initialization message

### Missing endpoints in Swagger?

1. Ensure controller has `@Controller()` decorator
2. Verify module is imported in `AppModule`
3. Check if `@ApiTags()` is present on controller

### Authentication not working?

1. Click "Authorize" button (🔒 icon)
2. Enter your JWT token in format: `your-token-here` (no "Bearer" prefix needed)
3. Click "Authorize" to save

## Resources

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

## Example Usage

### 1. Start the Server
```bash
yarn dev:backend
```

### 2. Open Swagger UI
Navigate to: http://localhost:3000/api/docs

### 3. Authorize (if needed)
Click the "Authorize" 🔒 button and enter your JWT token

### 4. Try an Endpoint
1. Expand the endpoint you want to test
2. Click "Try it out"
3. Fill in the request body/parameters
4. Click "Execute"
5. View the response below

## Current Endpoints

### Marketing (Public - No Auth Required)
- `POST /api/marketing/ecomail/templates` - Create email template
- `GET /api/marketing/health` - Health check

> **Note**: Marketing endpoints are currently public for development/testing purposes. They use the `@Public()` decorator to bypass JWT authentication. In production, you may want to add authentication by removing this decorator.

More endpoints will be added as the API grows.

## Adding Authentication to Endpoints

To add authentication to an endpoint, simply remove the `@Public()` decorator:

```typescript
// Public endpoint (current)
@Public()
@Post('templates')
async create() { }

// Protected endpoint
@Post('templates')
@ApiBearerAuth('JWT-auth')  // Keep this for Swagger docs
async create() { }
```
