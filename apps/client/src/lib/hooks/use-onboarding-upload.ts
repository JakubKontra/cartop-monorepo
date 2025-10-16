'use client';

import { useState, useCallback } from 'react';

import type { OnboardingUploadResult, UploadProgress } from '@/lib/services/onboarding-upload.service';

import { uploadOnboardingDocument } from '@/lib/services/onboarding-upload.service';

/**
 * Onboarding Upload Hook State
 */
interface UseOnboardingUploadState {
  /** Whether a file is currently being uploaded */
  uploading: boolean;
  /** Upload progress (0-100) */
  progress: number;
  /** Error message if upload failed */
  error: string | null;
}

/**
 * Onboarding Upload Hook Return Value
 */
interface UseOnboardingUploadReturn extends UseOnboardingUploadState {
  /** Upload a document for onboarding */
  upload: (
    token: string,
    documentTemplateId: string,
    file: File,
  ) => Promise<OnboardingUploadResult>;
  /** Reset error state */
  resetError: () => void;
}

/**
 * Onboarding Upload Hook
 *
 * Provides a simple interface for uploading documents during onboarding
 * with progress tracking and error handling.
 *
 * @example
 * ```tsx
 * function DocumentUpload({ token, templateId }) {
 *   const { upload, uploading, progress, error } = useOnboardingUpload();
 *
 *   const handleFileSelect = async (file: File) => {
 *     try {
 *       const result = await upload(token, templateId, file);
 *       console.log('Uploaded:', result);
 *     } catch (err) {
 *       // Error is already tracked in hook state
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       {uploading && <div>Progress: {progress}%</div>}
 *       {error && <div>Error: {error}</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useOnboardingUpload(): UseOnboardingUploadReturn {
  const [state, setState] = useState<UseOnboardingUploadState>({
    error: null,
    progress: 0,
    uploading: false,
  });

  /**
   * Upload a document file
   */
  const upload = useCallback(
    async (
      token: string,
      documentTemplateId: string,
      file: File,
    ): Promise<OnboardingUploadResult> => {
      // Reset state
      setState({
        error: null,
        progress: 0,
        uploading: true,
      });

      try {
        const result = await uploadOnboardingDocument(
          token,
          documentTemplateId,
          file,
          (progress: UploadProgress) => {
            setState((prev) => ({
              ...prev,
              progress: progress.percentage,
            }));
          },
        );

        // Upload successful
        setState({
          error: null,
          progress: 100,
          uploading: false,
        });

        return result;
      } catch (error) {
        // Upload failed
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        setState({
          error: errorMessage,
          progress: 0,
          uploading: false,
        });

        throw error;
      }
    },
    [],
  );

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
    resetError,
    upload,
  };
}
