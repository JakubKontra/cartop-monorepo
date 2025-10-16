'use client';

import { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle2, X, AlertCircle, XCircle, Clock } from 'lucide-react';

import type { OnboardingUploadResult } from '@/lib/services/onboarding-upload.service';

import { cn } from '@cartop/ui-utils';
import Button from '@/components/atoms/button/Button';
import { useOnboardingUpload } from '@/lib/hooks/use-onboarding-upload';

interface DocumentUploadCardProps {
  /** Onboarding token */
  token: string;
  /** Document template ID */
  templateId: string;
  /** Template name */
  name: string;
  /** Template description */
  description?: string;
  /** Help text for user */
  helpText?: string;
  /** Whether document is required */
  isRequired: boolean;
  /** Accepted file formats (e.g., ["pdf", "jpg", "png"]) */
  acceptedFormats: string[];
  /** Maximum file size in bytes */
  maxSizeBytes: number;
  /** Existing uploaded document (if any) */
  existingDocument?: {
    id: string;
    validationStatus: string;
    validationNote?: string | null;
    file: {
      name: string;
      url: string;
      size: number;
      sizeFormatted: string;
      extension: string;
    };
  };
  /** Callback when upload completes */
  onUploadComplete?: (result: OnboardingUploadResult) => void;
}

/**
 * Format bytes to human readable size
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Check if file is an image based on extension
 */
function isImageFile(extension: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  return imageExtensions.includes(extension.toLowerCase());
}

/**
 * Document Upload Card Component
 * Allows users to upload documents during onboarding
 */
export function DocumentUploadCard({
  token,
  templateId,
  name,
  description,
  helpText,
  isRequired,
  acceptedFormats,
  maxSizeBytes,
  existingDocument,
  onUploadComplete,
}: DocumentUploadCardProps) {
  const { upload, uploading, progress, error, resetError } = useOnboardingUpload();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState(existingDocument || null);
  const [isReplaceMode, setIsReplaceMode] = useState(false);

  // Accept attribute for file input
  const acceptString = acceptedFormats.map((fmt) => `.${fmt}`).join(',');

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Reset errors
      resetError();
      setValidationError(null);

      // Validate file size
      if (file.size > maxSizeBytes) {
        setValidationError(
          `File is too large. Maximum size is ${formatBytes(maxSizeBytes)}`,
        );
        return;
      }

      // Validate file type
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension && !acceptedFormats.includes(extension)) {
        setValidationError(
          `Invalid file type. Accepted formats: ${acceptedFormats.join(', ')}`,
        );
        return;
      }

      try {
        const result = await upload(token, templateId, file);

        // Update local state
        setUploadedFile({
          file: {
            extension: extension || '',
            name: file.name,
            size: file.size,
            sizeFormatted: formatBytes(file.size),
            url: result.url,
          },
          id: result.documentId,
          validationStatus: 'PENDING',
        });

        // Exit replace mode
        setIsReplaceMode(false);

        // Notify parent
        onUploadComplete?.(result);

        // Reset file input
        event.target.value = '';
      } catch (err) {
        console.error('Upload error:', err);
        // Error is already tracked in hook state
      }
    },
    [token, templateId, maxSizeBytes, acceptedFormats, upload, resetError, onUploadComplete],
  );

  const displayError = validationError || error;
  const isUploaded = !!uploadedFile;
  const shouldShowUploadArea = !isUploaded || isReplaceMode;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {name}
            {isRequired && <span className="ml-1 text-red-600">*</span>}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
        {isUploaded && (
          <div className="ml-4 flex items-center gap-2 text-green-600">
            <CheckCircle2 size={20} />
            <span className="text-sm font-medium">Uploaded</span>
          </div>
        )}
      </div>

      {/* Help Text */}
      {helpText && (
        <div className="mb-4 rounded-lg bg-blue-50 p-3">
          <p className="text-sm text-blue-800">{helpText}</p>
        </div>
      )}

      {/* Rejection Note - Show above everything if document was rejected */}
      {isUploaded && uploadedFile.validationStatus === 'REJECTED' && uploadedFile.validationNote && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 border border-red-200">
          <p className="text-sm font-medium text-red-800 mb-1">Rejection Reason:</p>
          <p className="text-sm text-red-700">{uploadedFile.validationNote}</p>
          <p className="text-xs text-red-600 mt-2">
            Please upload a new document that addresses the issue above.
          </p>
        </div>
      )}

      {/* Upload Area or Uploaded File */}
      {shouldShowUploadArea ? (
        /* Show upload area */
        <div>
          {/* Show cancel button if in replace mode */}
          {isReplaceMode && (
            <div className="mb-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsReplaceMode(false);
                  resetError();
                  setValidationError(null);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
          <label
            className={cn(
              'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors',
              uploading && 'cursor-not-allowed opacity-50',
              !uploading && 'border-gray-300 hover:border-primary',
              displayError && 'border-red-500 bg-red-50',
            )}
          >
            <input
              type="file"
              accept={acceptString}
              onChange={handleFileSelect}
              disabled={uploading}
              className="sr-only"
            />

            {uploading ? (
              /* Uploading state */
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
                <div className="w-full max-w-xs">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600">Uploading... {progress}%</p>
              </div>
            ) : (
              /* Ready to upload state */
              <div className="flex flex-col items-center gap-2 text-center">
                <Upload size={40} className="text-gray-400" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-900">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    {acceptedFormats.map((f) => f.toUpperCase()).join(', ')} (max{' '}
                    {formatBytes(maxSizeBytes)})
                  </p>
                </div>
              </div>
            )}
          </label>

          {/* Error Message */}
          {displayError && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3">
              <AlertCircle size={16} className="mt-0.5 text-red-600" />
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}
        </div>
      ) : (
        /* Show uploaded file with validation status */
        <>
          <div
            className={cn(
              'rounded-lg border p-4',
              uploadedFile.validationStatus === 'APPROVED' &&
                'border-green-200 bg-green-50',
              uploadedFile.validationStatus === 'REJECTED' &&
                'border-red-200 bg-red-50',
              uploadedFile.validationStatus === 'PENDING' &&
                'border-yellow-200 bg-yellow-50',
            )}
          >
            {/* Image Preview or File Icon */}
            {isImageFile(uploadedFile.file.extension) ? (
              <div className="mb-4">
                <img
                  src={uploadedFile.file.url}
                  alt={uploadedFile.file.name}
                  className="w-full h-auto max-h-96 object-contain rounded-lg bg-white"
                />
              </div>
            ) : null}

            <div className="flex items-center gap-4">
              {!isImageFile(uploadedFile.file.extension) && (
                <FileText
                  size={32}
                  className={cn(
                    uploadedFile.validationStatus === 'APPROVED' && 'text-green-600',
                    uploadedFile.validationStatus === 'REJECTED' && 'text-red-600',
                    uploadedFile.validationStatus === 'PENDING' && 'text-yellow-600',
                  )}
                />
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{uploadedFile.file.name}</p>
                <p className="text-sm text-gray-600">{uploadedFile.file.sizeFormatted}</p>

                {/* Validation Status */}
                <div className="mt-2 flex items-center gap-2">
                  {uploadedFile.validationStatus === 'APPROVED' && (
                    <>
                      <CheckCircle2 size={16} className="text-green-600" />
                      <span className="text-sm font-medium text-green-600">Approved</span>
                    </>
                  )}
                  {uploadedFile.validationStatus === 'REJECTED' && (
                    <>
                      <XCircle size={16} className="text-red-600" />
                      <span className="text-sm font-medium text-red-600">Rejected</span>
                    </>
                  )}
                  {uploadedFile.validationStatus === 'PENDING' && (
                    <>
                      <Clock size={16} className="text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-600">
                        Pending Review
                      </span>
                    </>
                  )}
                </div>
              </div>
              <a
                href={uploadedFile.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300"
              >
                View
              </a>
            </div>
          </div>

          {/* Replace Document Buttons */}
          <div className="mt-4 flex gap-2">
            {uploadedFile.validationStatus === 'REJECTED' && (
              <Button
                type="button"
                onClick={() => setIsReplaceMode(true)}
                className="flex-1"
              >
                Upload New Document
              </Button>
            )}
            {uploadedFile.validationStatus === 'PENDING' && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsReplaceMode(true)}
              >
                Replace Document
              </Button>
            )}
          </div>
        </>
      )}

      {/* File Requirements */}
      <div className="mt-4 text-xs text-gray-500">
        <p>
          <strong>Accepted formats:</strong> {acceptedFormats.map((f) => f.toUpperCase()).join(', ')}
        </p>
        <p>
          <strong>Maximum size:</strong> {formatBytes(maxSizeBytes)}
        </p>
      </div>
    </div>
  );
}
