import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core';
import {
  GENERATE_UPLOAD_URL,
  CREATE_FILE,
  GET_FILE_BY_CHECKSUM,
} from './upload.graphql';

/**
 * Upload Result
 * Returned after successful file upload
 */
export interface UploadResult {
  fileId: string;
  url: string;
  relativePath: string;
  name: string;
  extension: string;
  size: number;
  mimeType: string;
  checksum: string;
  width?: number;
  height?: number;
  isImage: boolean;
}

/**
 * Upload Progress
 * Tracks upload progress
 */
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Upload Service
 * Handles file uploads to MinIO/S3 storage with full metadata tracking
 *
 * Note: This service requires an Apollo Client instance to be passed in.
 * This allows it to work outside of React components.
 */
export class UploadService {
  /**
   * Upload a file to storage
   *
   * Process:
   * 1. Calculate file checksum (SHA-256)
   * 2. Check for duplicate (optional optimization)
   * 3. Get pre-signed upload URL from backend
   * 4. Upload file directly to MinIO/S3
   * 5. Extract image dimensions if applicable
   * 6. Create File entity in database
   * 7. Return complete file metadata
   *
   * @param client - Apollo Client instance
   * @param file - The file to upload
   * @param onProgress - Optional progress callback
   * @returns Promise with upload result containing file metadata
   */
  static async uploadFile(
    client: ApolloClient<NormalizedCacheObject>,
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    try {
      // Step 1: Calculate checksum
      const checksum = await this.calculateChecksum(file);

      // Step 2: Check for duplicate - return existing file if found
      // Note: Duplicate check is disabled for now due to auth issues
      // TODO: Fix authentication in queries or handle conflicts differently
      // const duplicate = await this.checkDuplicate(client, checksum);
      // if (duplicate) {
      //   console.log('Duplicate file detected, returning existing file:', duplicate.fileId);
      //   return duplicate;
      // }

      // Step 3: Get pre-signed upload URL from backend
      const { data: urlData } = await client.mutate({
        mutation: GENERATE_UPLOAD_URL,
        variables: {
          filename: file.name,
          contentType: file.type,
        },
      });

      const signedUrl = urlData?.generateUploadUrl;
      if (!signedUrl) {
        throw new Error('Failed to generate upload URL');
      }

      // Step 4: Upload file directly to MinIO/S3
      await this.uploadToStorage(file, signedUrl, onProgress);

      // Step 5: Extract image dimensions if applicable
      const dimensions = await this.getImageDimensions(file);

      // Step 6: Extract file path from signed URL
      const url = new URL(signedUrl);
      const relativePath = url.pathname.replace(/^\/[^/]+\//, ''); // Remove bucket name

      // Step 7: Parse file metadata
      const extension = file.name.split('.').pop() || '';
      const isImage = file.type.startsWith('image/');

      // Step 8: Create File entity in database
      const { data: fileData } = await client.mutate({
        mutation: CREATE_FILE,
        variables: {
          input: {
            relativePath,
            name: file.name,
            extension,
            size: file.size,
            mimeType: file.type,
            checksum,
            width: dimensions?.width,
            height: dimensions?.height,
          },
        },
      });

      const createdFile = fileData?.createFile;
      if (!createdFile) {
        throw new Error('Failed to create file record');
      }

      // Step 9: Return complete upload result
      return {
        fileId: createdFile.id,
        url: createdFile.url,
        relativePath: createdFile.relativePath,
        name: createdFile.name,
        extension: createdFile.extension,
        size: createdFile.size,
        mimeType: createdFile.mimeType,
        checksum: createdFile.checksum,
        width: createdFile.width ?? undefined,
        height: createdFile.height ?? undefined,
        isImage: createdFile.isImage,
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw error instanceof Error ? error : new Error('Upload failed');
    }
  }

  /**
   * Upload file to storage using pre-signed URL
   *
   * @param file - The file to upload
   * @param signedUrl - Pre-signed upload URL from backend
   * @param onProgress - Optional progress callback
   */
  private static async uploadToStorage(
    file: File,
    signedUrl: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            onProgress({
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100),
            });
          }
        });
      }

      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(
            new Error(
              `Upload failed with status ${xhr.status}: ${xhr.statusText}`
            )
          );
        }
      });

      // Handle errors
      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed due to network error'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload was aborted'));
      });

      // Open connection and send file
      xhr.open('PUT', signedUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);
    });
  }

  /**
   * Check if file with same checksum already exists (duplicate detection)
   *
   * @param client - Apollo Client instance
   * @param checksum - The file checksum to check
   * @returns Existing file if duplicate found, null otherwise
   */
  private static async checkDuplicate(
    client: ApolloClient<NormalizedCacheObject>,
    checksum: string
  ): Promise<UploadResult | null> {
    try {
      const { data, errors } = await client.query({
        query: GET_FILE_BY_CHECKSUM,
        variables: { checksum },
        errorPolicy: 'all', // Get both data and errors
      });

      // If there are errors, log them but don't fail
      if (errors && errors.length > 0) {
        console.warn('Errors during duplicate check:', errors);
        // Continue anyway - we'll try to upload
      }

      const existing = data?.fileByChecksum;
      if (existing) {
        // Return existing file as upload result
        return {
          fileId: existing.id,
          url: existing.url,
          relativePath: existing.relativePath,
          name: existing.name,
          extension: existing.extension,
          size: existing.size,
          mimeType: existing.mimeType,
          checksum: existing.checksum,
          width: existing.width ?? undefined,
          height: existing.height ?? undefined,
          isImage: existing.isImage,
        };
      }

      return null;
    } catch (error) {
      // If duplicate check fails, continue with upload
      console.warn('Duplicate check failed:', error);
      return null;
    }
  }

  /**
   * Get image dimensions from file
   *
   * @param file - The image file
   * @returns Promise with width and height, or null if not an image
   */
  static async getImageDimensions(
    file: File
  ): Promise<{ width: number; height: number } | null> {
    if (!file.type.startsWith('image/')) {
      return null;
    }

    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
        URL.revokeObjectURL(img.src);
      };

      img.onerror = () => {
        resolve(null);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Calculate SHA-256 checksum for file using Web Crypto API
   *
   * @param file - The file to hash
   * @returns Promise with hex string checksum
   */
  static async calculateChecksum(file: File): Promise<string> {
    try {
      // Read file as ArrayBuffer
      const buffer = await file.arrayBuffer();

      // Calculate SHA-256 hash
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

      // Convert ArrayBuffer to hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');

      return hashHex;
    } catch (error) {
      console.error('Checksum calculation failed:', error);
      // Fallback to timestamp-based checksum if crypto fails
      return `fallback-${Date.now()}-${file.name}-${file.size}`;
    }
  }

  /**
   * Delete a file (database only, keeps storage file)
   * This is useful when you want to remove file reference but keep file in storage
   *
   * @param fileId - The file ID to delete
   */
  static async deleteFile(fileId: string): Promise<void> {
    // This will be implemented when needed
    // Uses DELETE_FILE mutation from upload.graphql.ts
    console.log('Delete file:', fileId);
  }

  /**
   * Delete a file completely (both database and storage)
   *
   * @param fileId - The file ID to delete
   */
  static async deleteFileCompletely(fileId: string): Promise<void> {
    // This will be implemented when needed
    // Uses DELETE_FILE_COMPLETELY mutation from upload.graphql.ts
    console.log('Delete file completely:', fileId);
  }
}
