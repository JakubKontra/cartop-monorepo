# Leasing Companies Feature Implementation

## Overview
Complete admin UI implementation for managing leasing companies with file upload functionality using AWS S3 (prepared for integration).

## Completed Tasks

### 1. Backend (Already Complete)
- ✅ LeasingCompany entity with File relation
- ✅ GraphQL mutations and queries
- ✅ Admin resolver with CRUD operations

### 2. Frontend Admin UI

#### File Structure
```
apps/admin/src/
├── components/
│   └── image-upload/
│       ├── image-upload.tsx       # Dropzone component
│       └── index.ts
├── lib/
│   └── upload/
│       └── upload-service.ts      # AWS S3 upload service (placeholder)
├── features/
│   └── leasing-companies/
│       ├── components/
│       │   ├── leasing-companies-columns.tsx
│       │   ├── leasing-companies-table.tsx
│       │   ├── data-table-row-actions.tsx
│       │   ├── leasing-company-delete-dialog.tsx
│       │   └── leasing-company-form.tsx
│       ├── data/
│       │   └── schema.ts
│       ├── pages/
│       │   ├── leasing-company-create-page.tsx
│       │   └── leasing-company-edit-page.tsx
│       ├── types/
│       │   └── index.ts
│       ├── leasing-companies.graphql.ts
│       └── index.tsx (list page)
└── routes/
    └── _authenticated/
        └── leasing-companies/
            ├── index.tsx
            ├── new.tsx
            └── $companyId.edit.tsx
```

#### Components Created

1. **ImageUpload Component** (`components/image-upload/image-upload.tsx`)
   - Drag & drop file upload using react-dropzone
   - Image preview with remove functionality
   - Upload progress indicator
   - File validation (type, size)
   - Styled with shadcn/ui components
   - Ready for AWS S3 integration

2. **Upload Service** (`lib/upload/upload-service.ts`)
   - Placeholder service for AWS S3 integration
   - Methods prepared:
     - `uploadFile()` - Upload to S3
     - `deleteFile()` - Delete from S3
     - `getImageDimensions()` - Extract image metadata
     - `calculateChecksum()` - SHA-256 hashing
   - Returns file metadata (id, url, path, dimensions, etc.)

3. **Leasing Company Form** (`features/leasing-companies/components/leasing-company-form.tsx`)
   - Name field (required)
   - Website URL field (optional)
   - Logo upload with ImageUpload component
   - React Hook Form + Zod validation
   - Reusable for create & edit

4. **Data Table** (`features/leasing-companies/components/leasing-companies-table.tsx`)
   - Columns: Checkbox, Name, Logo preview, Website link, Created date, Actions
   - Filtering by name
   - Sorting
   - Pagination
   - Row selection

5. **Pages**
   - List page with "Add Leasing Company" button
   - Create page (separate route, not modal)
   - Edit page (separate route, not modal)
   - Delete confirmation dialog (only dialog used)

#### Routes Added
```
/leasing-companies           → List all leasing companies
/leasing-companies/new       → Create new leasing company
/leasing-companies/:id/edit  → Edit leasing company
```

#### Navigation
- Added "Leasing Companies" link to sidebar under "Catalog" section
- Icon: Building2 from lucide-react

## AWS S3 Integration (TODO)

The frontend is fully prepared for AWS S3 integration. To complete the implementation:

### 1. Install AWS SDK
```bash
yarn workspace @cartop/admin add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### 2. Update `lib/upload/upload-service.ts`

Replace placeholder implementations with:

```typescript
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Implementation steps:
// 1. Get pre-signed URL from backend
// 2. Upload file directly to S3
// 3. Calculate checksum (SHA-256)
// 4. Extract image dimensions
// 5. Create File entity via GraphQL mutation
// 6. Return UploadResult with file metadata
```

### 3. Backend Changes Needed

Add endpoint to generate pre-signed URLs:

```graphql
type Mutation {
  generateUploadUrl(
    fileName: String!
    fileType: String!
    fileSize: Int!
  ): UploadUrlResponse!
}

type UploadUrlResponse {
  uploadUrl: String!
  fileId: String!
  relativePath: String!
}
```

### 4. Upload Flow

1. **Frontend**: User selects file in ImageUpload component
2. **Frontend**: Call `generateUploadUrl` mutation
3. **Backend**: Generate pre-signed S3 URL, create File entity
4. **Frontend**: Upload file directly to S3 using pre-signed URL
5. **Frontend**: Calculate checksum, extract dimensions
6. **Frontend**: Update File entity with metadata via mutation
7. **Frontend**: Return fileId to form

### 5. Security Considerations

- Validate file types on backend
- Limit file sizes (current: 5MB)
- Set appropriate CORS policies on S3 bucket
- Use temporary credentials
- Implement virus scanning if needed

## Dependencies Installed

```json
{
  "react-dropzone": "^14.3.8"
}
```

## GraphQL Queries Used

- `GetAllLeasingCompanies` - List all companies
- `GetLeasingCompany` - Get single company
- `CreateLeasingCompany` - Create new company
- `UpdateLeasingCompany` - Update company
- `DeleteLeasingCompany` - Delete company

## Form Validation Schema

```typescript
{
  name: z.string().min(2, 'Name must be at least 2 characters'),
  link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  logoId: z.string().uuid('Must be a valid UUID').optional().or(z.literal(''))
}
```

## Features

✅ Full CRUD operations
✅ Data table with filtering, sorting, pagination
✅ File upload with drag & drop
✅ Image preview
✅ Progress indicator
✅ Type-safe GraphQL operations
✅ Form validation
✅ Responsive design
✅ Separate pages for create/edit (no modals)
✅ Delete confirmation dialog
✅ Loading states
✅ Error handling

## Next Steps

1. **Integrate AWS S3 SDK**
   - Install packages
   - Implement upload service
   - Add backend pre-signed URL endpoint

2. **Add Image Optimization**
   - Thumbnail generation
   - Image compression
   - WebP conversion

3. **Add File Manager (Future)**
   - Browse all uploaded files
   - Reuse existing files
   - Bulk operations

4. **Testing**
   - Test file upload flow
   - Test image preview
   - Test CRUD operations
   - Test error scenarios

## Notes

- All files are stored in File entity (single table for all file types)
- Image-specific fields (width, height) are nullable
- Checksum field for duplicate detection
- CDN URL configured via environment variable
- Logo relation is nullable (optional)
