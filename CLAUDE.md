# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

This is a Yarn v4 workspaces monorepo with three main applications and several shared packages:

**Applications:**
- `apps/backend` - NestJS GraphQL/REST API (port 3001)
- `apps/admin` - Vite + React + TanStack Router admin panel (port 3002)
- `apps/client` - Next.js 15 customer-facing app (port 3000)

**Shared Packages:**
- `packages/validation` - Zod schemas (shared validation between frontend/backend)
- `packages/api-client` - Auto-generated REST API types + React Query hooks
- `packages/ui-utils` - Tailwind utilities
- `packages/email-templates` - React Email templates
- `packages/eslint-config-cartop` - Shared ESLint config

## Common Commands

### Development
```bash
# Run all apps in parallel
yarn dev

# Run individual apps
yarn dev:backend    # Start NestJS API
yarn dev:frontend   # Start Next.js client app
yarn dev:admin      # Start Vite admin app
```

### Building
```bash
# Build all (packages first, then apps)
yarn build

# Build individual components
yarn build:packages  # Build @cartop/validation first
yarn build:backend
yarn build:frontend
yarn build:admin
```

### Code Generation
```bash
# Generate all API clients and GraphQL types
yarn generate

# Generate REST API client from OpenAPI spec
yarn generate:rest

# Generate GraphQL types for both frontend apps
yarn generate:gql

# Generate GraphQL types for specific app
yarn generate:gql:client
yarn generate:gql:admin
```

### Testing & Quality
```bash
yarn test           # Run tests in all workspaces
yarn lint           # Lint all workspaces
yarn type-check     # TypeScript check all workspaces
yarn typecheck      # Alternative TypeScript check command
yarn knip           # Check for unused dependencies
```

### Environment Setup
```bash
yarn env:pull       # Auto-setup environment files from examples
```

## Architecture Overview

### Backend (NestJS)

**Module Organization:**
- Feature modules in `src/` (auth, catalog, offer, file, car-request, notification, onboarding, etc.)
- Each module follows NestJS patterns: resolver/controller → service → repository
- `src/model/` contains TypeORM entities with dual decorators (ORM + GraphQL)

**Database:**
- Dual TypeORM connection pools: main database + separate audit database
- PostgreSQL primary (MySQL migration support exists)
- Auto-synchronize only in development
- Audit system uses CLS (Continuation Local Storage) for context capture

**GraphQL Setup:**
- Apollo Server with auto-generated schema from TypeORM entities
- Schema file: `src/schema.gql` (development), in-memory (production)
- Dual resolver pattern: `*-public.resolver.ts` (no auth) vs `*-admin.resolver.ts` (auth required)

**Authentication:**
- JWT via Passport with HTTP-only cookies
- Global guards: `JwtAuthGuard` + `RolesGuard`
- Decorators: `@Public()`, `@Roles()`, `@RequirePermission()`, `@CurrentUser()`
- Token refresh mechanism with automatic retry on 401

**File Storage:**
- Adapter pattern: supports S3, MinIO, DigitalOcean Spaces
- Runtime selection via `STORAGE_DRIVER` environment variable
- Interface: `src/file/adapters/storage-adapter.interface.ts`

**Audit System:**
- Non-blocking fire-and-forget logging (doesn't block transactions)
- TypeORM subscriber pattern with `@Auditable()` decorator
- Separate database connection for audit writes
- CLS captures user context (userId, IP, userAgent) across async operations

### Admin App (Vite + React)

**Routing:**
- TanStack Router with file-based routing
- Auto-generated `routeTree.gen.ts` from `src/routes/`
- Layout groups: `(auth)`, `(errors)`, `_authenticated`
- Dynamic routes: `$userId/edit`, `$brandId/edit`, etc.

**State Management:**
- Apollo Client for GraphQL (queries/mutations)
- TanStack Query for REST APIs
- Zustand for auth state (`auth-store.ts`)
- Theme/Direction/Font providers

**GraphQL Client:**
- Apollo Client with auth link, error link, HTTP link
- Automatic token refresh on 401 errors with retry logic
- Token state synchronized between cookies and memory
- Cache strategy: cache-and-network for queries

**Code Generation:**
- GraphQL Codegen generates types in `src/gql/`
- Fragment masking disabled for simpler types
- Orval generates REST hooks from OpenAPI spec

### Client App (Next.js)

**Configuration:**
- Next.js 15.5.4 with App Router
- Output: standalone (for Docker containerization)
- Transpiles workspace packages: validation, api-client, ui-utils

**Structure:**
- `src/app/` - App Router pages (auth, brands, contacts, katalog, onboarding, etc.)
- `src/app/api/` - Next.js API routes (webhooks, revalidation)
- `src/components/` - Shared components
- `src/queries/` - GraphQL queries

### Shared Validation Package

**Purpose:** Single source of truth for validation

**Location:** `packages/validation/src/`

**Organization:**
- `schemas/` - Zod schemas by domain (user, common, newsletter)
- `regex/` - Regex patterns for NestJS `@Matches()` decorators
- `translations/` - Czech error messages for Zod
- `error-handler.ts` - Zod error parsing utility

**Build:** Dual CJS + ESM output for maximum compatibility

### Code Generation Pipeline

**GraphQL (Admin + Client):**
1. Backend exposes schema at `/graphql`
2. GraphQL Codegen reads schema from `VITE_GRAPHQL_URL`
3. Generates fully-typed hooks from `src/**/*.tsx` queries
4. Output: `src/gql/graphql.ts` (types) + `src/gql/gql.ts` (helper)

**REST APIs:**
1. Backend exposes OpenAPI spec at `/api/docs-json`
2. Orval generates React Query hooks from spec
3. Tags-split mode: separate files per OpenAPI tag
4. Output: `packages/api-client/src/generated/`
5. Custom fetch-based HTTP client (no Axios)

## Key Architectural Patterns

**Dual API Strategy:**
- GraphQL for admin complexity (nested queries, relationships)
- REST for simple public APIs (marketing, notifications, newsletter)

**Resolver Segmentation:**
- Public resolvers: no authentication required
- Admin resolvers: JWT + roles required
- Same entity, different access patterns

**Token Refresh Flow:**
1. Apollo error link detects 401/UNAUTHENTICATED
2. Calls `refreshToken` mutation
3. Updates Zustand store with new tokens
4. Retries original operation
5. Falls back to logout on refresh failure

**Non-Blocking Audit:**
- Audit writes don't await (fire-and-forget)
- Errors logged separately, don't affect user operations
- Separate connection pool prevents query starvation

**Storage Adapter Pattern:**
- Interface defines contract: upload, delete, getPresignedUrl
- Implementations: S3Adapter, MinioAdapter
- Runtime selection via environment variable
- Injected as `STORAGE_ADAPTER` token

## TypeScript Configuration

- Interface over type for object definitions
- Type for unions, intersections, mapped types
- Avoid `any`, prefer `unknown`
- Use strict mode
- Explicit return types for public functions
- Readonly for immutable properties

## Code Quality Guidelines

- Verify information before presenting it
- Make changes file by file
- Don't suggest whitespace-only changes
- Don't summarize changes
- Preserve existing code structure
- Provide real file links, not placeholders
- Use constants over magic numbers
- Functions should have single responsibility
- Extract repeated code into reusable functions

## Environment Requirements

- Node.js >= 22.0.0
- Yarn >= 3.0.0 (using Yarn 4.10.3)

## Important Notes

- Always run `yarn build:packages` before building apps (validation package must be built first)
- GraphQL schema auto-generates from backend TypeORM entities
- Password fields explicitly excluded from GraphQL via custom decorators
- Admin app uses Vite (no SSR), Client app uses Next.js (SSR enabled)
- Token state must stay synchronized between cookies and memory (admin app)
- Audit system uses separate database connection for performance isolation
- File uploads use presigned URLs for direct client-to-storage uploads
