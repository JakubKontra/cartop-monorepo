# Generated Files Location Guide 📁

## ✅ Files ARE Generated Successfully!

### 📊 File Statistics

**REST API (Orval)**: 360 lines generated
**GraphQL (Client)**: 357 lines generated
**GraphQL (Admin)**: 357 lines generated

---

## 🗂️ File Structure

```
cartop-monorepo/
│
├── packages/api-client/src/generated/          ← REST API Types & Hooks
│   ├── rest-api.schemas.ts                     (69 lines) - All DTO types
│   ├── marketing/
│   │   └── marketing.ts                        (191 lines) - Marketing hooks
│   └── notification/
│       └── notification.ts                     (100 lines) - Notification hooks
│
├── apps/client/src/gql/                        ← GraphQL Types (Client)
│   ├── graphql.ts                              (334 lines) - All GraphQL types
│   ├── gql.ts                                  (23 lines) - Query builder
│   └── index.ts                                (1 line) - Exports
│
└── apps/admin/src/gql/                         ← GraphQL Types (Admin)
    ├── graphql.ts                              (334 lines) - All GraphQL types
    ├── gql.ts                                  (23 lines) - Query builder
    └── index.ts                                (1 line) - Exports
```

---

## 🔍 How to View Files

### Option 1: VS Code

1. Open VS Code
2. Navigate to these paths:
   - `packages/api-client/src/generated/`
   - `apps/client/src/gql/`
   - `apps/admin/src/gql/`

**Note**: Files are now visible! (Updated .gitignore)

### Option 2: Terminal

```bash
# View REST API types
cat packages/api-client/src/generated/rest-api.schemas.ts

# View REST API hooks (Marketing)
cat packages/api-client/src/generated/marketing/marketing.ts

# View GraphQL types (Client)
cat apps/client/src/gql/graphql.ts

# View GraphQL types (Admin)
cat apps/admin/src/gql/graphql.ts
```

### Option 3: List All Generated Files

```bash
# REST API
find packages/api-client/src/generated -name "*.ts"

# GraphQL (Client)
ls -la apps/client/src/gql/

# GraphQL (Admin)
ls -la apps/admin/src/gql/
```

---

## 🎯 What You Can Use Now

### REST API Hooks (from `@cartop/api-client`)

```typescript
import {
  // Hooks
  useMarketingControllerCreateTemplate,
  useMarketingControllerHealthCheck,

  // Types
  CreateTemplateDto,
  TemplateResponseDto,
  HealthCheckResponseDto,

  // Axios instance
  AXIOS_INSTANCE,
  customInstance,
} from '@cartop/api-client';
```

### GraphQL Types (in client/admin apps)

```typescript
import { graphql } from '../gql';
import type {
  CatalogBrand,
  CatalogColor,
  User,
  CreateCatalogBrandInput,
  // ... all GraphQL types
} from '../gql/graphql';
```

---

## 🔄 Regenerate Anytime

```bash
# Regenerate all
yarn generate

# View what changed
git diff packages/api-client/src/generated/
git diff apps/client/src/gql/
git diff apps/admin/src/gql/
```

---

## ✅ Quick Verification

Run this to verify everything is generated:

```bash
echo "REST API files:"
ls -1 packages/api-client/src/generated/**/*.ts

echo -e "\nGraphQL Client files:"
ls -1 apps/client/src/gql/*.ts

echo -e "\nGraphQL Admin files:"
ls -1 apps/admin/src/gql/*.ts
```

---

## 🐛 Troubleshooting

### "I still don't see the files in VS Code"

1. **Refresh VS Code**: `Cmd+Shift+P` → "Developer: Reload Window"
2. **Check file explorer settings**: Ensure "Files: Exclude" doesn't hide these paths
3. **Use terminal to verify**: `ls packages/api-client/src/generated/`

### "Files are there but empty"

Run generation again:
```bash
./scripts/backend.sh status  # Ensure backend is running
yarn generate                 # Regenerate
```

### "Import errors"

```bash
yarn install  # Re-link workspace dependencies
```

---

Last updated: 2025-10-10
