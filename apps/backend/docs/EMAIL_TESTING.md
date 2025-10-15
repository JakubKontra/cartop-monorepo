# Email Testing Guide

This guide explains how to test and preview email templates locally in the Cartop backend.

## Overview

The email system provides two ways to test emails:

1. **Email Preview** - Instant HTML rendering in browser (no queue, no actual sending)
2. **Email Testing** - Full flow testing with queue and Mailgun (requires configuration)

---

## 1. Email Preview (Recommended for Development)

Preview email templates instantly in your browser without queueing or sending.

### Quick Start

```bash
# Start the backend server
npm run dev

# Open in browser:
http://localhost:3000/email-preview
```

### Available Preview Endpoints

#### List All Templates
```
GET http://localhost:3000/email-preview
```

Returns a list of all available email templates with example URLs.

#### Preview Specific Templates

**Transactional Emails:**
```bash
# Password Reset
GET http://localhost:3000/email-preview/forgotten-password

# Account Verification
GET http://localhost:3000/email-preview/account-verify

# Password Success
GET http://localhost:3000/email-preview/password-success

# Contact Inquiry (to admin)
GET http://localhost:3000/email-preview/contact-inquiry

# Contact Confirmation (to customer)
GET http://localhost:3000/email-preview/contact-confirmation

# Documents Complete
GET http://localhost:3000/email-preview/documents-complete

# Document Incomplete
GET http://localhost:3000/email-preview/document-incomplete

# Required Documents
GET http://localhost:3000/email-preview/required-documents
```

**Offer Emails:**
```bash
# Single Leasing Offer
GET http://localhost:3000/email-preview/single-leasing

# Multiple Leasing Offers
GET http://localhost:3000/email-preview/multiple-leasing
```

#### Generic Render Endpoint

You can also use the generic render endpoint with query parameters:

```bash
# Basic usage
GET http://localhost:3000/email-preview/render?template=forgotten-password

# With custom parameters
GET http://localhost:3000/email-preview/render?template=forgotten-password&operatingSystem=macOS&browserName=Safari
```

---

## 2. Full Email Testing with Queue

Test the complete email flow including queueing and sending via Mailgun.

### Prerequisites

1. **LocalStack** (for SQS queue)
   ```bash
   docker-compose up -d localstack
   ```

2. **Mailgun Configuration** (in `.env`)
   ```env
   MAILGUN_API_KEY=your-mailgun-api-key
   MAILGUN_DOMAIN=mg.yourdomain.com
   EMAIL_FROM=noreply@yourdomain.com
   ```

3. **Environment** must be `development` or `local`

### Testing Endpoints

#### List Available Test Endpoints
```bash
GET http://localhost:3000/notifications/test
```

#### Test Password Reset
```bash
POST http://localhost:3000/notifications/test/password-reset
Content-Type: application/json

{
  "email": "test@example.com",
  "resetPasswordLink": "https://cartop.cz/reset?token=abc123",
  "operatingSystem": "macOS",
  "browserName": "Chrome"
}
```

#### Test Account Verification
```bash
POST http://localhost:3000/notifications/test/account-verify
Content-Type: application/json

{
  "email": "test@example.com",
  "loginLink": "https://cartop.cz/verify?token=xyz789"
}
```

#### Test Password Success
```bash
POST http://localhost:3000/notifications/test/password-success
Content-Type: application/json

{
  "email": "test@example.com"
}
```

#### Test Contact Inquiry
```bash
POST http://localhost:3000/notifications/test/contact-inquiry
Content-Type: application/json

{
  "adminEmail": "admin@cartop.cz",
  "customerName": "Jan Novák",
  "customerEmail": "jan.novak@example.com",
  "customerPhone": "+420777123456",
  "message": "Dobrý den, mám zájem o leasing vozidla."
}
```

#### Test Contact Confirmation
```bash
POST http://localhost:3000/notifications/test/contact-confirmation
Content-Type: application/json

{
  "email": "test@example.com",
  "phoneNumber": "+420 608 599 607"
}
```

#### Test Documents Complete
```bash
POST http://localhost:3000/notifications/test/documents-complete
Content-Type: application/json

{
  "email": "test@example.com",
  "items": [
    "zimní pneumatiky",
    "pojištění vozidla",
    "servisní balíček"
  ],
  "offerLink": "https://cartop.cz/offers/12345"
}
```

#### Test Document Incomplete
```bash
POST http://localhost:3000/notifications/test/document-incomplete
Content-Type: application/json

{
  "email": "test@example.com",
  "missingDocuments": [
    "Kopie občanského průkazu",
    "Potvrzení o příjmu"
  ],
  "uploadLink": "https://cartop.cz/upload"
}
```

#### Test Required Documents
```bash
POST http://localhost:3000/notifications/test/required-documents
Content-Type: application/json

{
  "email": "test@example.com",
  "documentList": [
    "Občanský průkaz",
    "Výpis z účtu"
  ],
  "uploadLink": "https://cartop.cz/upload"
}
```

---

## 3. React Email Development Server

For component-level development and iteration:

```bash
# Navigate to email templates package
cd packages/email-templates

# Start React Email dev server
yarn dev

# Opens at http://localhost:3001
```

This provides:
- Hot reload for template changes
- Component playground
- Mobile/desktop preview
- Export to HTML

---

## 4. Testing with Mailgun Sandbox

For production-like testing without sending real emails:

1. Go to [Mailgun Dashboard](https://app.mailgun.com)
2. Use the **Sandbox domain** (free)
3. Add authorized recipients in Mailgun settings
4. Update `.env`:
   ```env
   MAILGUN_DOMAIN=sandboxXXXXXXXXXXXX.mailgun.org
   ```

Only authorized email addresses will receive emails in sandbox mode.

---

## 5. Architecture

### Email Flow

```
User Action
    ↓
NotificationService.sendXXX()
    ↓
Queue Email Job (SQS)
    ↓
NotificationProcessor (async)
    ↓
EmailService.sendEmail()
    ↓
Render Template (@app/emails)
    ↓
MailgunProvider.send()
    ↓
Mailgun API
    ↓
Recipient Inbox
```

### Components

- **NotificationService** - Business logic, user preferences
- **EmailService** - Template rendering, email sending
- **NotificationProcessor** - Queue job processing
- **EmailPreviewController** - Preview endpoints (dev only)
- **NotificationController** - Test endpoints (dev only)
- **@app/emails** - React Email templates package

---

## 6. Troubleshooting

### Preview Endpoint Returns 404
- Ensure backend is running: `npm run dev`
- Check route guard: DevOnlyGuard only allows development/local environments

### Test Endpoint Returns 403
- Set `NODE_ENV=development` or `NODE_ENV=local` in `.env`
- DevOnlyGuard blocks production/staging environments

### Email Not Sent
1. Check LocalStack is running:
   ```bash
   docker ps | grep localstack
   ```

2. Check SQS queue exists:
   ```bash
   aws --endpoint-url=http://localhost:4566 sqs list-queues
   ```

3. Check Mailgun configuration in `.env`

4. Check backend logs for errors:
   ```bash
   npm run dev
   # Look for EmailService or MailgunProvider errors
   ```

### Template Rendering Error
1. Check template exists in `@app/emails` package
2. Verify template mapping in `EmailService.ts`
3. Check template parameters match interface

---

## 7. Best Practices

### Development Workflow

1. **Design Phase** - Use React Email dev server
   ```bash
   cd packages/email-templates && yarn dev
   ```

2. **Integration Testing** - Use preview endpoints
   ```bash
   curl http://localhost:3000/email-preview/forgotten-password
   ```

3. **Flow Testing** - Use test endpoints with sandbox
   ```bash
   curl -X POST http://localhost:3000/notifications/test/password-reset \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

4. **Production** - Remove test data, use real Mailgun domain

### Security Notes

- Preview and test endpoints are **dev-only** (blocked in production)
- Never commit real Mailgun API keys to git
- Use `.env.local` for local overrides (git-ignored)
- Test with sandbox domain before production

---

## 8. Quick Reference

| Task | Command/URL |
|------|-------------|
| Preview all templates | `GET http://localhost:3000/email-preview` |
| Preview specific template | `GET http://localhost:3000/email-preview/forgotten-password` |
| List test endpoints | `GET http://localhost:3000/notifications/test` |
| Test password reset | `POST http://localhost:3000/notifications/test/password-reset` |
| React Email dev server | `cd packages/email-templates && yarn dev` |
| Build templates | `cd packages/email-templates && yarn build` |
| Check queue | `aws --endpoint-url=http://localhost:4566 sqs list-queues` |

---

## 9. Related Documentation

- [React Email Documentation](https://react.email)
- [Mailgun API Docs](https://documentation.mailgun.com)
- [LocalStack SQS Guide](https://docs.localstack.cloud/user-guide/aws/sqs/)
