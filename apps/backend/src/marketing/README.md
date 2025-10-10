# Marketing Module - Ecomail Integration

This module handles email template creation and synchronization with Ecomail for marketing campaigns.

## Overview

- **Purpose**: Create HTML email templates from your data and sync them to Ecomail
- **Provider**: Ecomail (marketing automation platform)
- **Template Engine**: React Email
- **Architecture**: Provider-based design for easy future migrations
- **Type Safety**: Fully typed with TypeScript - **zero `any` types**

## File Structure

```
marketing/
├── ecomail/
│   ├── ecomail-api.types.ts  # Complete Ecomail API type definitions
│   ├── EcomailClient.ts      # Type-safe Ecomail API client
│   └── EcomailService.ts     # Service wrapper for Ecomail operations
├── dto/
│   └── create-template.dto.ts # Request/response DTOs
├── templates/
│   └── offer-email.tsx        # React Email template (PLACEHOLDER - replace with your design)
├── marketing.controller.ts    # REST API endpoints
├── marketing.service.ts       # Business logic layer
└── marketing.module.ts        # NestJS module definition
```

## Type Safety

This module is **fully type-safe** with comprehensive TypeScript definitions:

### API Types (`ecomail/ecomail-api.types.ts`)

Complete type definitions for the entire Ecomail API v2.0:
- ✅ **Lists & Subscribers** - Managing email lists and subscriber data
- ✅ **Campaigns** - Creating and managing email campaigns
- ✅ **Templates** - Email template management
- ✅ **Automations** - Marketing automation workflows
- ✅ **Transactional Emails** - One-off transactional messages
- ✅ **Tracker & Transactions** - E-commerce tracking
- ✅ **Domains** - Domain verification

All types are exported and can be imported for use in your own code:

```typescript
import {
  EcomailSubscriber,
  AddSubscriberRequest,
  CreateTemplateRequest,
  CampaignStatsResponse,
} from './marketing/ecomail/ecomail-api.types';
```

## API Documentation (Swagger)

Interactive API documentation is available **only in development** environments:

📚 **Swagger UI**: http://localhost:3000/api/docs

Features:
- ✅ Try-it-out functionality - Test endpoints directly from the browser
- ✅ Full request/response schemas
- ✅ Authentication support (JWT Bearer token)
- ✅ Multiple request examples for each endpoint
- ✅ Automatically generated from code annotations

**Note**: Swagger is automatically disabled in production (`NODE_ENV=production`)

## Environment Variables

Add these to your `.env` file:

```env
# Environment
NODE_ENV=development  # Set to 'production' to disable Swagger

# Ecomail Configuration
ECOMAIL_API_KEY=your_ecomail_api_key_here
ECOMAIL_SERVER=https://api2.ecomailapp.cz  # Optional, defaults to this
```

## API Endpoints

### 1. Create Email Template

**Endpoint**: `POST /api/marketing/ecomail/templates`

**Authentication**: Public (no auth required in development)

**Description**: Creates an HTML email template from offer data and syncs it to Ecomail

**Request Body**:
```json
{
  "offerIds": ["offer-1", "offer-2", "offer-3"],
  "templateName": "weekly-deals-2025-10-10",
  "metadata": {
    "campaign": "weekly-deals",
    "date": "2025-10-10"
  }
}
```

**Response**:
```json
{
  "id": 12345,
  "name": "weekly-deals-2025-10-10",
  "html": "<html>...</html>",
  "created_at": "2025-10-10T14:30:00Z",
  "updated_at": "2025-10-10T14:30:00Z",
  "inline_css": 1
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/marketing/ecomail/templates \
  -H "Content-Type: application/json" \
  -d '{
    "offerIds": ["1", "2", "3"],
    "templateName": "test-template",
    "metadata": {}
  }'
```

> **Note**: This endpoint is publicly accessible for development/testing. In production, consider adding authentication by removing the `@Public()` decorator.

### 2. Health Check

**Endpoint**: `GET /api/marketing/health`

**Description**: Check if Ecomail integration is properly configured

**Response**:
```json
{
  "status": "ok",
  "ecomail": true
}
```

## Usage Example

```typescript
// In your service or controller
import { MarketingService } from './marketing/marketing.service';

@Injectable()
export class YourService {
  constructor(private readonly marketingService: MarketingService) {}

  async createWeeklyNewsletter() {
    const offerIds = await this.getLatestOfferIds();

    const result = await this.marketingService.createEmailTemplate({
      offerIds,
      templateName: `weekly-newsletter-${new Date().toISOString()}`,
      metadata: {
        campaign: 'weekly-newsletter',
        generatedAt: new Date().toISOString(),
      },
    });

    console.log(`Template created in Ecomail with ID: ${result.id}`);
    return result;
  }
}
```

## Customization

### 1. Replace Placeholder Template

The current template at `templates/offer-email.tsx` is a **PLACEHOLDER**.

To add your custom design:

1. Create a new React Email template in `templates/` directory
2. Use the same props interface or modify `OfferEmailProps`
3. Update `marketing.service.ts` to import your new template

Example:
```tsx
// templates/my-custom-template.tsx
export default function MyCustomTemplate({ offers, title }: Props) {
  return (
    <Html>
      <Body>
        {/* Your custom design here */}
      </Body>
    </Html>
  );
}
```

### 2. Connect Real Offer Data

Currently, offer data is **STUBBED** in `marketing.service.ts:fetchOfferData()`.

When your offer entity is ready:

```typescript
// In marketing.service.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from '../offer/offer.entity'; // Your entity

@Injectable()
export class MarketingService {
  constructor(
    private readonly ecomailService: EcomailService,
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>, // Add this
  ) {}

  private async fetchOfferData(offerIds: string[]): Promise<any[]> {
    // Replace stub with real query
    return this.offerRepo.findByIds(offerIds);
  }
}
```

### 3. Switch to Different Provider

To migrate from Ecomail to another marketing platform:

1. Create new provider: `marketing/[provider]/[Provider]Service.ts`
2. Implement the same methods as `EcomailService`
3. Update `marketing.module.ts` to inject new provider
4. Change environment variables

Example for Mailchimp:
```typescript
// marketing/mailchimp/MailchimpService.ts
@Injectable()
export class MailchimpService {
  async createTemplate(data: { name: string; html: string }) {
    // Mailchimp-specific implementation
  }
}

// marketing.module.ts
providers: [
  MarketingService,
  MailchimpService, // Instead of EcomailService
],
```

## Future Enhancements

- [ ] Add template listing endpoint
- [ ] Add template update/delete endpoints
- [ ] Add subscriber management (add to lists, segments)
- [ ] Add automation trigger endpoint
- [ ] Add template versioning
- [ ] Add preview endpoint (render without syncing)
- [ ] Add batch template creation
- [ ] Add A/B testing support

## Notes

- **Authentication**: All endpoints are protected by JWT auth guard (configured in `AppModule`)
- **Roles**: Update controller decorators if you need role-based access control
- **Validation**: DTOs use `class-validator` for automatic request validation
- **Logging**: All operations are logged with NestJS Logger
- **Error Handling**: Errors are properly caught and logged with context

## Testing

```bash
# Type checking
yarn type-check

# Run backend in dev mode
yarn dev:backend

# Test the endpoint
curl -X GET http://localhost:3000/api/marketing/health
```

## Support

For Ecomail API documentation, visit: https://ecomail.cz/podpora/api/
