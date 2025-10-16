/**
 * Onboarding Upload Service
 * Handles file uploads for onboarding document flow
 * Adapted from admin upload service for public use
 */

import type {
  CreateFileInput,
  CreateFilePublicMutation,
  GenerateUploadUrlPublicMutation,
  UploadOnboardingDocumentMutation,
  UploadDocumentInput,
} from '@/gql/graphql';

import { graphqlRequest } from '@/lib/graphql-client';
import {
  CREATE_FILE_PUBLIC_MUTATION,
  GENERATE_UPLOAD_URL_PUBLIC_MUTATION,
  UPLOAD_ONBOARDING_DOCUMENT_MUTATION,
} from '@/queries/onboarding';

/**
 * Upload progress information
 */
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Upload result with file information
 */
export interface OnboardingUploadResult {
  fileId: string;
  documentId: string;
  url: string;
  checksum: string;
  width?: number;
  height?: number;
}

/**
 * Calculate SHA-256 checksum of a file
 */
async function calculateChecksum(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Extract image dimensions if file is an image
 */
async function extractImageDimensions(
  file: File,
): Promise<{ width: number; height: number } | null> {
  if (!file.type.startsWith('image/')) {
    return null;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        height: img.height,
        width: img.width,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };

    img.src = url;
  });
}

/**
 * Parse file metadata
 */
function parseFileMetadata(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const nameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;

  return {
    extension,
    mimeType: file.type || 'application/octet-stream',
    name: nameWithoutExtension,
    size: file.size,
  };
}

/**
 * Upload file directly to storage using pre-signed URL
 */
async function uploadToStorage(
  file: File,
  presignedUrl: string,
  onProgress?: (progress: UploadProgress) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress({
          loaded: e.loaded,
          percentage: Math.round((e.loaded / e.total) * 100),
          total: e.total,
        });
      }
    });

    // Handle completion
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    // Handle errors
    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload aborted'));
    });

    // Send file
    xhr.open('PUT', presignedUrl);
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
    xhr.send(file);
  });
}

/**
 * Upload a file for onboarding
 *
 * Process:
 * 1. Calculate checksum for deduplication
 * 2. Get pre-signed URL from backend
 * 3. Upload directly to storage (MinIO/S3)
 * 4. Extract image dimensions if applicable
 * 5. Create file record in database
 * 6. Link file to onboarding document
 */
export async function uploadOnboardingDocument(
  token: string,
  documentTemplateId: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void,
): Promise<OnboardingUploadResult> {
  try {
    // Step 1: Calculate checksum
    const checksum = await calculateChecksum(file);

    // Step 2: Parse file metadata
    const metadata = parseFileMetadata(file);

    // Step 3: Get pre-signed URL
    const presignedUrlResponse = await graphqlRequest<
      GenerateUploadUrlPublicMutation,
      { filename: string; contentType: string }
    >({
      query: GENERATE_UPLOAD_URL_PUBLIC_MUTATION,
      variables: {
        contentType: metadata.mimeType,
        filename: file.name,
      },
    });

    const presignedUrl = presignedUrlResponse.generateUploadUrlPublic;

    // Step 4: Upload to storage with progress tracking
    await uploadToStorage(file, presignedUrl, onProgress);

    // Step 5: Extract image dimensions if applicable
    const dimensions = await extractImageDimensions(file);

    // Step 6: Create file record in database
    const createFileInput: CreateFileInput = {
      checksum,
      extension: metadata.extension,
      height: dimensions?.height,
      mimeType: metadata.mimeType,
      name: metadata.name,
      relativePath: extractRelativePathFromUrl(presignedUrl),
      size: metadata.size,
      width: dimensions?.width,
    };

    const fileResponse = await graphqlRequest<
      CreateFilePublicMutation,
      { input: CreateFileInput }
    >({
      query: CREATE_FILE_PUBLIC_MUTATION,
      variables: {
        input: createFileInput,
      },
    });

    const createdFile = fileResponse.createFilePublic;

    // Step 7: Link file to onboarding document
    const uploadDocumentInput: UploadDocumentInput = {
      documentTemplateId,
      fileId: createdFile.id,
    };

    const documentResponse = await graphqlRequest<
      UploadOnboardingDocumentMutation,
      { token: string; input: UploadDocumentInput }
    >({
      query: UPLOAD_ONBOARDING_DOCUMENT_MUTATION,
      variables: {
        input: uploadDocumentInput,
        token,
      },
    });

    const uploadedDocument = documentResponse.uploadOnboardingDocument;

    // Step 8: Return complete result
    return {
      checksum: createdFile.checksum,
      documentId: uploadedDocument.id,
      fileId: createdFile.id,
      height: createdFile.height || undefined,
      url: createdFile.url,
      width: createdFile.width || undefined,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw error instanceof Error ? error : new Error('Upload failed');
  }
}

/**
 * Extract relative path from pre-signed URL
 * Pre-signed URLs contain the full storage path, we need to extract just the relative path
 */
function extractRelativePathFromUrl(presignedUrl: string): string {
  try {
    const url = new URL(presignedUrl);
    // Remove leading slash and bucket name from path
    // Example: /cartop/uploads/2024/01/file.jpg -> uploads/2024/01/file.jpg
    const pathParts = url.pathname.split('/').filter(Boolean);
    // Remove bucket name (first part)
    pathParts.shift();
    return pathParts.join('/');
  } catch {
    // Fallback: use current date structure
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `uploads/${year}/${month}/unknown`;
  }
}
