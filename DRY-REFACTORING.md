# DRY Refactoring - Code Deduplication

This document summarizes the code deduplication and DRY (Don't Repeat Yourself) improvements made to the Cartop monorepo.

## Summary

Created two new shared packages to eliminate code duplication across client and admin applications:
- `@cartop/validation` - Shared Zod validation schemas (entity-based, Czech-only)
- `@cartop/ui-utils` - Shared UI utility functions

## Changes Made

### 1. Created `@cartop/validation` Package

**Location:** `packages/validation/`

**Purpose:** Centralized validation schemas using Zod with bilingual support (Czech/English)

**Features:**
- ✅ Entity-based organization (user, newsletter, common)
- ✅ Email validation schemas
- ✅ Password validation (basic + strong)
- ✅ GDPR consent validation
- ✅ Common field validations (name, phone, URL, slug, UUID)
- ✅ Czech-only error messages (future i18n will handle translations)
- ✅ Type-safe schemas

**Files Created:**
```
packages/validation/
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── index.ts
    └── schemas/
        ├── user/
        │   ├── index.ts
        │   ├── email.ts
        │   ├── password.ts
        │   └── name.ts
        ├── newsletter/
        │   ├── index.ts
        │   └── consent.ts
        └── common/
            ├── index.ts
            ├── phone.ts
            ├── url.ts
            ├── slug.ts
            ├── uuid.ts
            └── consent.ts
```

### 2. Created `@cartop/ui-utils` Package

**Location:** `packages/ui-utils/`

**Purpose:** Shared UI utility functions for React/Next.js applications

**Features:**
- ✅ `cn()` function - Tailwind CSS class merger with conflict resolution
- ✅ Uses clsx + tailwind-merge under the hood
- ✅ Type-safe ClassValue handling

**Files Created:**
```
packages/ui-utils/
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── index.ts
    └── cn.ts
```

### 3. Updated Client App (`@cartop/client`)

**Changes:**
- ✅ Added `@cartop/validation` and `@cartop/ui-utils` dependencies
- ✅ Updated `NewsletterSignup.tsx` to use shared validation schemas
- ✅ Updated `utils/cv.ts` to re-export `cn()` from shared package
- ✅ Removed empty `lib/api/` directory
- ✅ Removed `tailwind-merge` from dependencies (now in shared package)

**Files Modified:**
- `package.json` - Added workspace dependencies
- `src/components/molecules/NewsletterSignup.tsx` - Uses `emailSchema`, `newsletterConsentSchema`
- `src/utils/cv.ts` - Re-exports from `@cartop/ui-utils`

### 4. Updated Admin App (`@cartop/admin`)

**Changes:**
- ✅ Added `@cartop/validation` and `@cartop/ui-utils` dependencies
- ✅ Updated user schemas to use shared validation
- ✅ Updated `lib/utils.ts` to re-export `cn()` from shared package
- ✅ Removed `clsx` and `tailwind-merge` from dependencies

**Files Modified:**
- `package.json` - Added workspace dependencies, removed duplicated packages
- `src/lib/utils.ts` - Re-exports from `@cartop/ui-utils`
- `src/features/users/data/schema.ts` - Uses shared email, name, password schemas (Czech versions)

### 5. Dependency Cleanup

**Removed Duplicates:**
- ❌ `clsx` removed from `@cartop/admin` (now in `@cartop/ui-utils`)
- ❌ `tailwind-merge` removed from `@cartop/admin` (now in `@cartop/ui-utils`)
- ❌ `tailwind-merge` removed from `@cartop/client` (never directly used)

## Benefits Achieved

### Before
- ❌ Email validation duplicated in 10+ files
- ❌ `cn()` utility function duplicated in client & admin
- ❌ Inconsistent validation error messages
- ❌ Hard to maintain validation rules

### After
- ✅ **Single Source of Truth** - Validation rules defined once
- ✅ **Consistent Error Messages** - Same messages across all apps
- ✅ **Type Safety** - TypeScript types inferred from shared schemas
- ✅ **Entity-Based Organization** - Schemas organized by domain entities
- ✅ **Czech-Only** - Simplified, future i18n will handle translations
- ✅ **DRY Code** - Zero duplication of utilities and validation
- ✅ **Easy Maintenance** - Update once, use everywhere
- ✅ **Smaller Bundle Size** - Shared dependencies across apps

## Usage Examples

### Validation Package

```typescript
// Before (duplicated)
const emailSchema = z.string().min(1, "E-mail je povinný").email("Zadejte prosím platnou e-mailovou adresu")

// After (shared)
import { emailSchema } from '@cartop/validation'
```

### UI Utils Package

```typescript
// Before (duplicated in both apps)
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// After (shared)
import { cn } from '@cartop/ui-utils'
```

## Files Removed

- ✅ `apps/client/src/lib/api/` (empty directory)
- ✅ Duplicated validation logic in NewsletterSignup component
- ✅ Duplicated `cn()` implementations

## Next Steps (Optional Future Improvements)

1. **Migrate More Validation**
   - Update remaining admin forms to use shared schemas
   - Add validation for other entities (brands, models, etc.)

2. **Add More UI Utils**
   - Common formatting functions (dates, currency, etc.)
   - Shared React hooks
   - Common helper functions

3. **Backend Integration**
   - Consider sharing validation schemas between frontend and backend
   - Use same Zod schemas for DTO validation in NestJS

## Documentation

Each package includes comprehensive README files:
- `packages/validation/README.md` - Validation schema usage guide
- `packages/ui-utils/README.md` - UI utilities usage guide

## Testing

All packages pass TypeScript type checking:
```bash
yarn workspace @cartop/validation type-check  # ✅ Pass
yarn workspace @cartop/ui-utils type-check     # ✅ Pass
```
