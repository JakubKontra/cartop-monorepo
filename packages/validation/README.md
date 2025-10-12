# @cartop/validation

Shared validation schemas for the Cartop monorepo using Zod, organized by entity.

## Philosophy

- **Entity-Based Organization** - Schemas organized by domain entities (User, Newsletter, etc.)
- **Czech Language** - All error messages in Czech (future i18n will handle translations)
- **Type-Safe** - Full TypeScript support with inferred types
- **DRY** - Single source of truth for validation across all apps

## Installation

This package is internal to the monorepo and included via workspace protocol:

```json
{
  "dependencies": {
    "@cartop/validation": "workspace:*"
  }
}
```

## Structure

```
packages/validation/src/schemas/
├── user/              # User entity schemas
│   ├── email.ts
│   ├── password.ts
│   ├── name.ts
│   └── index.ts
├── newsletter/        # Newsletter entity schemas
│   ├── consent.ts
│   └── index.ts
├── common/            # Common/shared schemas
│   ├── phone.ts
│   ├── url.ts
│   ├── slug.ts
│   ├── uuid.ts
│   ├── consent.ts
│   └── index.ts
└── index.ts           # Re-exports all schemas
```

## Usage

### Import from Root

```typescript
import { emailSchema, passwordSchema, firstNameSchema } from '@cartop/validation'
```

### Import from Specific Entity

```typescript
import { emailSchema, passwordSchema } from '@cartop/validation/user'
import { newsletterConsentSchema } from '@cartop/validation/newsletter'
import { phoneSchema, slugSchema } from '@cartop/validation/common'
```

## Entity Schemas

### User Entity

```typescript
import { emailSchema, passwordSchema, firstNameSchema, lastNameSchema } from '@cartop/validation'
import { z } from 'zod'

// User registration form
const registrationSchema = z.object({
  email: emailSchema,                    // "E-mail je povinný", "Zadejte prosím platnou e-mailovou adresu"
  password: passwordSchema,              // "Heslo je povinné", "Heslo musí mít alespoň 8 znaků"
  firstName: firstNameSchema,            // "Křestní jméno je povinné", "Křestní jméno musí mít alespoň 2 znaky"
  lastName: lastNameSchema,              // "Příjmení je povinné", "Příjmení musí mít alespoň 2 znaky"
})
```

**Available Schemas:**
- `emailSchema` - Email validation (required)
- `optionalEmailSchema` - Optional email
- `passwordSchema` - Basic password (min 8 chars)
- `strongPasswordSchema` - Strong password (uppercase, lowercase, number, special char)
- `createPasswordConfirmSchema()` - Password confirmation factory
- `nameSchema` - General name (min 2 chars)
- `firstNameSchema` - First name (min 2 chars)
- `lastNameSchema` - Last name (min 2 chars)

### Newsletter Entity

```typescript
import { emailSchema, newsletterConsentSchema } from '@cartop/validation'
import { z } from 'zod'

// Newsletter subscription form
const newsletterSchema = z.object({
  email: emailSchema,
  consent: newsletterConsentSchema,      // "Musíte souhlasit s odběrem newsletteru"
})
```

**Available Schemas:**
- `emailSchema` - Re-exported from user entity
- `newsletterConsentSchema` - Newsletter-specific consent

### Common Schemas

```typescript
import {
  phoneSchema,
  urlSchema,
  slugSchema,
  uuidSchema,
  consentSchema
} from '@cartop/validation'
```

**Available Schemas:**
- `phoneSchema` - Czech phone number (optional)
- `urlSchema` - URL validation
- `optionalUrlSchema` - Optional URL
- `slugSchema` - Slug validation (lowercase, numbers, hyphens)
- `uuidSchema` - UUID validation
- `consentSchema` - General GDPR consent
- `privacyPolicyConsentSchema` - Privacy policy consent

## Examples

### User Registration with Password Confirmation

```typescript
import { emailSchema, passwordSchema, firstNameSchema, lastNameSchema } from '@cartop/validation'
import { z } from 'zod'

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Potvrďte prosím heslo'),
  firstName: firstNameSchema,
  lastName: lastNameSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Hesla se neshodují',
  path: ['confirmPassword'],
})

type SignUpForm = z.infer<typeof signUpSchema>
```

### Newsletter Signup Form

```typescript
import { emailSchema, newsletterConsentSchema } from '@cartop/validation'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: emailSchema,
  consent: newsletterConsentSchema,
})

type NewsletterForm = z.infer<typeof newsletterSchema>
```

### Brand/Model Admin Form

```typescript
import { slugSchema, urlSchema } from '@cartop/validation'
import { z } from 'zod'

const brandSchema = z.object({
  name: z.string().min(1, 'Název je povinný'),
  slug: slugSchema,
  logoUrl: urlSchema,
})

type BrandForm = z.infer<typeof brandSchema>
```

## Adding New Entity Schemas

To add validation for a new entity (e.g., "Offer"):

1. Create entity folder: `src/schemas/offer/`
2. Add schema files: `offer/price.ts`, `offer/description.ts`, etc.
3. Create index: `offer/index.ts` to export all schemas
4. Re-export in main `src/index.ts`:

```typescript
// Offer entity validation
export * from './schemas/offer'
```

## Benefits

✅ **Entity-Based Organization** - Easy to find and maintain related schemas
✅ **Scalable** - Add new entities without touching existing code
✅ **Czech-Only** - Simple, consistent error messages
✅ **Type-Safe** - Full TypeScript inference
✅ **DRY** - Single source of truth
✅ **Future-Proof** - i18n system will handle translations

## Internationalization

Currently, all error messages are in Czech. In the future, translations will be handled by an i18n system (e.g., next-i18next, i18next) at the application level, not in the validation schemas.
