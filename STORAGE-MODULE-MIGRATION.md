# Storage Module Migration to File Module

## Summary

Successfully migrated all storage functionality from the separate `StorageModule` into the `FileModule`, consolidating file management and storage operations into a single cohesive module.

## Changes Made

### 1. Created Shared Tokens (`src/shared/tokens.ts`)
```typescript
export const STORAGE_ADAPTER = Symbol('STORAGE_ADAPTER');
```

### 2. Updated FileModule (`src/file/file.module.ts`)
- Changed to `@Global()` module for app-wide availability
- Added `forRoot()` dynamic module pattern
- Integrated storage adapter configuration from StorageModule
- Supports multiple storage drivers:
  - **S3** (AWS S3)
  - **DigitalOcean Spaces** (S3-compatible)
  - **MinIO** (Local/self-hosted S3-compatible)
- Exports `STORAGE_ADAPTER` and `FileService` globally

**Configuration via Environment Variables:**
```env
STORAGE_DRIVER=s3|minio|digitalocean

# For S3/DigitalOcean
AWS_REGION=eu-central-1
DO_SPACES_KEY=your-key
DO_SPACES_SECRET=your-secret
S3_BUCKET=your-bucket

# For MinIO
MINIO_ENDPOINT=localhost
MINIO_PORT=1483
MINIO_ROOT_USER=cartop
MINIO_ROOT_PASSWORD=cartop1337
```

### 3. Enhanced FileService (`src/file/file.service.ts`)
Added storage management methods:

- **`generateUploadUrl(filename, contentType)`**
  - Generates pre-signed URL for client-side uploads
  - Returns URL valid for 1 hour

- **`uploadToStorage(bucket, key, filePath, contentType)`**
  - Server-side file upload to storage
  - Returns public URL of uploaded file

- **`deleteFromStorage(file)`**
  - Deletes file from storage bucket
  - Uses file's relativePath

- **`removeCompletely(id)`**
  - Deletes file from both storage AND database
  - Continues with database deletion even if storage deletion fails

### 4. Enhanced FileAdminResolver (`src/file/file-admin.resolver.ts`)
Added new GraphQL mutations:

```graphql
# Generate pre-signed upload URL
mutation GenerateUploadUrl($filename: String!, $contentType: String!) {
  generateUploadUrl(filename: $filename, contentType: $contentType)
}

# Delete file from database only (keeps storage file)
mutation DeleteFile($id: String!) {
  deleteFile(id: $id)
}

# Delete file completely (both database and storage)
mutation DeleteFileCompletely($id: String!) {
  deleteFileCompletely(id: $id)
}
```

### 5. Updated app.module.ts
Changed:
```typescript
FileModule // Old
```
To:
```typescript
FileModule.forRoot() // New - with storage configuration
```

### 6. Removed StorageModule
- Deleted `/src/file/StorageModule/` directory
- Removed:
  - `storage.module.ts`
  - `storage.service.ts` (was empty)
  - `storage.resolver.ts` (functionality moved to FileAdminResolver)

### 7. Storage Adapters (Preserved)
Located in `/src/file/adapters/`:
- **`storage-adapter.interface.ts`** - Common interface
- **`s3.adapter.ts`** - AWS S3 / DigitalOcean Spaces implementation
- **`minio.adapter.ts`** - MinIO implementation

All adapters implement:
```typescript
interface StorageAdapter {
  upload(bucket, key, filePath, contentType?): Promise<string>
  getPresignedUploadUrl(bucket, key, contentType?): Promise<string>
  delete(bucket, key): Promise<void>
}
```

## File Upload Flow

### Client-Side Upload (Recommended)
1. **Frontend**: Call `generateUploadUrl` mutation
2. **Backend**: Generate pre-signed URL
3. **Frontend**: Upload file directly to S3/MinIO using pre-signed URL
4. **Frontend**: Call `createFile` mutation with metadata
5. **Backend**: Create File entity in database

### Server-Side Upload
1. **Frontend**: Send file to backend API endpoint
2. **Backend**: Save file temporarily
3. **Backend**: Call `fileService.uploadToStorage()`
4. **Backend**: Create File entity with metadata
5. **Backend**: Delete temporary file

## Benefits

✅ **Unified Module** - All file operations in one place
✅ **Better Encapsulation** - Storage logic tied to file management
✅ **Simpler Architecture** - One less module to import/maintain
✅ **Global Access** - Storage adapter available anywhere via DI
✅ **Consistent API** - All file operations through FileService
✅ **Flexible Storage** - Easy to switch between S3/MinIO/Spaces

## Migration Checklist

- [x] Create shared tokens file
- [x] Move storage adapters to file module
- [x] Update FileModule with storage configuration
- [x] Add storage methods to FileService
- [x] Add upload mutations to FileAdminResolver
- [x] Update app.module to use FileModule.forRoot()
- [x] Remove StorageModule directory
- [x] Test compilation

## Testing

To verify the migration:

```bash
# Start backend
cd apps/backend
yarn dev

# Check logs for storage configuration
# Should see: "[FileModule] Storage configuration: { driver: '...', ... }"

# Test GraphQL mutation
mutation {
  generateUploadUrl(
    filename: "test.jpg"
    contentType: "image/jpeg"
  )
}
```

## Notes

- **QuestionFile entity** references removed from new implementation
  - Old StorageModule used QuestionFile entity
  - New FileModule uses File entity (universal)
  - If QuestionFile is still needed, it can reference File via foreign key

- **No Breaking Changes** to existing File entity operations
  - All previous queries/mutations still work
  - Storage operations are additions, not replacements

- **Environment Variables** remain the same
  - Storage configuration unchanged
  - Same variables work for both old and new implementation
