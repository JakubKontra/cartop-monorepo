import { graphql } from '@/gql';

/**
 * Generate Upload URL Mutation
 * Generates a pre-signed URL for uploading files directly to storage (MinIO/S3)
 */
export const GENERATE_UPLOAD_URL = graphql(`
  mutation GenerateUploadUrl($filename: String!, $contentType: String!) {
    generateUploadUrl(filename: $filename, contentType: $contentType)
  }
`);

/**
 * Create File Mutation
 * Creates a file record in the database after successful upload to storage
 */
export const CREATE_FILE = graphql(`
  mutation CreateFile($input: CreateFileInput!) {
    createFile(input: $input) {
      id
      relativePath
      url
      name
      extension
      size
      mimeType
      checksum
      width
      height
      alt
      title
      thumbnailPath
      isImage
      createdAt
      updatedAt
    }
  }
`);

/**
 * Delete File Mutation
 * Deletes a file record from the database only (storage file remains)
 */
export const DELETE_FILE = graphql(`
  mutation DeleteFile($id: String!) {
    deleteFile(id: $id)
  }
`);

/**
 * Delete File Completely Mutation
 * Deletes both the file record and the file from storage
 */
export const DELETE_FILE_COMPLETELY = graphql(`
  mutation DeleteFileCompletely($id: String!) {
    deleteFileCompletely(id: $id)
  }
`);

/**
 * Get File by Checksum Query
 * Used for duplicate detection before uploading
 */
export const GET_FILE_BY_CHECKSUM = graphql(`
  query GetFileByChecksum($checksum: String!) {
    fileByChecksum(checksum: $checksum) {
      id
      url
      relativePath
      name
      extension
      size
      mimeType
      checksum
      width
      height
      isImage
    }
  }
`);
