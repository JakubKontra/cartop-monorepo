import { useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/client/react';
import { UploadService, type UploadResult, type UploadProgress } from './upload-service';

/**
 * File Upload Hook State
 */
interface UseFileUploadState {
  /** Whether a file is currently being uploaded */
  uploading: boolean;
  /** Upload progress (0-100) */
  progress: number;
  /** Error message if upload failed */
  error: string | null;
}

/**
 * File Upload Hook Return Value
 */
interface UseFileUploadReturn extends UseFileUploadState {
  /** Upload a file */
  upload: (file: File) => Promise<UploadResult>;
  /** Delete a file from database only */
  deleteFile: (fileId: string) => Promise<void>;
  /** Delete a file completely (database + storage) */
  deleteFileCompletely: (fileId: string) => Promise<void>;
  /** Reset error state */
  resetError: () => void;
}

/**
 * Reusable File Upload Hook
 *
 * Provides a simple interface for uploading files with progress tracking and error handling.
 * Works with any entity that needs file uploads (brands, leasing companies, users, etc.)
 *
 * @example
 * ```tsx
 * function MyForm() {
 *   const { upload, uploading, progress, error } = useFileUpload();
 *
 *   const handleFileSelect = async (file: File) => {
 *     try {
 *       const result = await upload(file);
 *       // Use result.fileId in your form
 *       setValue('logoId', result.fileId);
 *     } catch (err) {
 *       // Error is already tracked in hook state
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       {uploading && <Progress value={progress} />}
 *       {error && <Alert>{error}</Alert>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useFileUpload(): UseFileUploadReturn {
  const client = useApolloClient();
  const [state, setState] = useState<UseFileUploadState>({
    uploading: false,
    progress: 0,
    error: null,
  });

  /**
   * Upload a file to storage
   */
  const upload = useCallback(async (file: File): Promise<UploadResult> => {
    // Reset state
    setState({
      uploading: true,
      progress: 0,
      error: null,
    });

    try {
      const result = await UploadService.uploadFile(
        client,
        file,
        (progress: UploadProgress) => {
          setState((prev) => ({
            ...prev,
            progress: progress.percentage,
          }));
        }
      );

      // Upload successful
      setState({
        uploading: false,
        progress: 100,
        error: null,
      });

      return result;
    } catch (error) {
      // Upload failed
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setState({
        uploading: false,
        progress: 0,
        error: errorMessage,
      });

      throw error;
    }
  }, [client]);

  /**
   * Delete a file (database only, keeps storage file)
   */
  const deleteFile = useCallback(async (fileId: string): Promise<void> => {
    try {
      await UploadService.deleteFile(fileId);
    } catch (error) {
      console.error('Delete file error:', error);
      throw error;
    }
  }, []);

  /**
   * Delete a file completely (both database and storage)
   */
  const deleteFileCompletely = useCallback(async (fileId: string): Promise<void> => {
    try {
      await UploadService.deleteFileCompletely(fileId);
    } catch (error) {
      console.error('Delete file completely error:', error);
      throw error;
    }
  }, []);

  /**
   * Reset error state
   */
  const resetError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...state,
    upload,
    deleteFile,
    deleteFileCompletely,
    resetError,
  };
}
