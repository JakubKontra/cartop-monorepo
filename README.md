# Cartop Monorepo

This is a Yarn workspaces monorepo containing the Cartop backend API, frontend application, admin panel, and shared packages.

## Structure

```
cartop-monorepo/
├── apps/
│   ├── backend/          # NestJS API (port 3001)
│   ├── frontend/         # Next.js user-facing app (port 3000)
│   └── admin/            # Next.js admin panel (port 3002)
├── packages/
│   ├── shared/           # Shared utilities
│   ├── formatting/       # Formatting utilities (currency, dates, numbers)
│   └── types/            # Shared TypeScript types
└── package.json          # Root package.json with workspace configuration
```

## Prerequisites

- Node.js >= 18.0.0
- Yarn >= 3.0.0

## Getting Started

### Install Dependencies

From the root directory:

```bash
yarn install
```

This will install dependencies for all workspaces.

### Development

Run all applications in development mode:

```bash
yarn dev
```

Or run individual applications:

```bash
# Backend API (http://localhost:3001)
yarn dev:backend

# Frontend (http://localhost:3000)
yarn dev:frontend

# Admin Panel (http://localhost:3002)
yarn dev:admin
```

### Building

Build all applications:

```bash
yarn build
```

Or build individual applications:

```bash
yarn build:backend
yarn build:frontend
yarn build:admin
```

### Testing & Linting

```bash
# Run tests across all workspaces
yarn test

# Lint all workspaces
yarn lint

# Type check all workspaces
yarn type-check
```

## Using Shared Packages

All apps can import from shared packages using the `@cartop/*` namespace:

### In Backend (NestJS)

```typescript
import { formatCurrency } from '@cartop/formatting';
import { User, UserRole } from '@cartop/types';
import { capitalize, HTTP_STATUS } from '@cartop/shared';

const price = formatCurrency(1999.99); // "$1,999.99"
```

### In Frontend/Admin (Next.js)

```typescript
import { formatDate, formatCurrency } from '@cartop/formatting';
import { ApiResponse, User } from '@cartop/types';
import { APP_NAME } from '@cartop/shared';

export default function ProductPage() {
  const price = formatCurrency(49.99);
  return <div>{price}</div>;
}
```

## Workspace Configuration

The monorepo uses:

- **Yarn Workspaces** for dependency management
- **TypeScript Path Mappings** for cross-workspace imports
- **Shared TypeScript Config** (`tsconfig.base.json`) for consistent settings

All workspace packages are referenced using the `workspace:*` protocol in `package.json` files, which Yarn resolves to the local packages during installation.

## Environment Variables

Each app has an `.env.example` file. Copy these to `.env.local` and configure:

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env

# Frontend
cp apps/frontend/.env.example apps/client/.env.local

# Admin
cp apps/admin/.env.example apps/admin/.env.local
```

## Adding New Packages

1. Create a new directory under `packages/`
2. Add `package.json` with name `@cartop/package-name`
3. Add `tsconfig.json` extending from the base config
4. Add to workspace apps by installing: `yarn workspace @cartop/app-name add @cartop/package-name@workspace:*`
5. Update path mappings in `tsconfig.base.json` if needed

## Scripts Reference

| Script | Description |
|--------|-------------|
| `yarn dev` | Run all apps in development mode |
| `yarn build` | Build all apps |
| `yarn test` | Run tests across all workspaces |
| `yarn lint` | Lint all workspaces |
| `yarn type-check` | Type check all workspaces |
| `yarn clean` | Clean all build artifacts and node_modules |

## Next Steps

1. Install dependencies: `yarn install`
2. Set up environment variables
3. Start development: `yarn dev`
4. Open:
   - Backend API: http://localhost:3001
   - Frontend: http://localhost:3000
   - Admin: http://localhost:3002
