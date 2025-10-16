'use client';

import { OnboardingStatus } from './onboarding-status';
import { DocumentUploadCard } from './document-upload-card';

type OnboardingStatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETE' | 'INCOMPLETE' | 'EXPIRED';

interface OnboardingData {
  status: OnboardingStatusType;
  expiresAt: string;
  completedAt: string | null;
  carRequest: {
    requestFirstName: string;
    requestLastName: string;
    requestEmail: string;
    requestPhone?: string | null;
    financingType: string;
    brand?: { name: string } | null;
    model?: { name: string } | null;
  };
  leasingCompany?: {
    name: string;
    logo?: { url: string } | null;
  } | null;
  documents?: Array<{
    id: string;
    validationStatus: string;
    validationNote?: string | null;
    documentTemplate: {
      id: string;
    };
    file: {
      name: string;
      url: string;
      size: number;
      sizeFormatted: string;
      extension: string | null;
    };
  }> | null;
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string | null;
  helpText: string | null;
  isRequired: boolean;
  acceptedFormats: string[];
  maxSizeBytes: number;
  displayOrder: number;
}

interface OnboardingClientProps {
  token: string;
  onboarding: OnboardingData;
  documents: DocumentTemplate[];
}

/**
 * Check if onboarding is expired
 */
function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

/**
 * Onboarding Client Component
 * Handles all client-side interactivity for the onboarding flow
 */
export function OnboardingClient({ token, onboarding, documents }: OnboardingClientProps) {
  const expired = isExpired(onboarding.expiresAt);
  const uploadedCount = onboarding.documents?.length || 0;
  const totalRequired = documents.filter((doc) => doc.isRequired).length;

  // Sort documents by display order
  const sortedDocuments = [...documents].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">Document Upload</h1>
            <p className="mt-2 text-lg text-gray-600">
              Complete your onboarding by uploading the required documents
            </p>
          </div>

          {/* Customer & Car Info */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Request Details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Customer</p>
                <p className="text-base font-semibold text-gray-900">
                  {onboarding.carRequest.requestFirstName} {onboarding.carRequest.requestLastName}
                </p>
                <p className="text-sm text-gray-600">{onboarding.carRequest.requestEmail}</p>
                {onboarding.carRequest.requestPhone && (
                  <p className="text-sm text-gray-600">{onboarding.carRequest.requestPhone}</p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Vehicle</p>
                <p className="text-base font-semibold text-gray-900">
                  {onboarding.carRequest.brand?.name} {onboarding.carRequest.model?.name}
                </p>
                <p className="text-sm text-gray-600">
                  Financing: {onboarding.carRequest.financingType}
                </p>
              </div>
            </div>

            {/* Leasing Company */}
            {onboarding.leasingCompany && (
              <div className="mt-4 border-t pt-4">
                <p className="text-sm font-medium text-gray-500">Leasing Company</p>
                <div className="mt-2 flex items-center gap-3">
                  {onboarding.leasingCompany.logo && (
                    <img
                      src={onboarding.leasingCompany.logo.url}
                      alt={onboarding.leasingCompany.name}
                      className="h-8 w-auto object-contain"
                    />
                  )}
                  <p className="text-base font-semibold text-gray-900">
                    {onboarding.leasingCompany.name}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="mb-8">
            <OnboardingStatus
              status={onboarding.status}
              expiresAt={onboarding.expiresAt}
              completedAt={onboarding.completedAt}
              uploadedCount={uploadedCount}
              totalRequired={totalRequired}
            />
          </div>

          {/* Documents */}
          {!expired ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Required Documents</h2>
              {sortedDocuments.map((template) => {
                // Find existing uploaded document for this template
                const existingDoc = onboarding.documents?.find(
                  (doc) => doc.documentTemplate.id === template.id,
                );

                return (
                  <DocumentUploadCard
                    key={template.id}
                    token={token}
                    templateId={template.id}
                    name={template.name}
                    description={template.description || undefined}
                    helpText={template.helpText || undefined}
                    isRequired={template.isRequired}
                    acceptedFormats={template.acceptedFormats}
                    maxSizeBytes={template.maxSizeBytes}
                    existingDocument={
                      existingDoc
                        ? {
                            file: {
                              extension: existingDoc.file.extension || '',
                              name: existingDoc.file.name,
                              size: existingDoc.file.size,
                              sizeFormatted: existingDoc.file.sizeFormatted,
                              url: existingDoc.file.url,
                            },
                            id: existingDoc.id,
                            validationNote: existingDoc.validationNote,
                            validationStatus: existingDoc.validationStatus,
                          }
                        : undefined
                    }
                    onUploadComplete={() => {
                      // Refresh page to show updated status
                      window.location.reload();
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg bg-red-50 p-8 text-center">
              <h3 className="text-xl font-semibold text-red-800">
                This onboarding link has expired
              </h3>
              <p className="mt-2 text-red-600">
                Please contact support to request a new upload link.
              </p>
            </div>
          )}

          {/* Footer Note */}
          {!expired && (
            <div className="mt-8 rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All uploaded documents will be reviewed by our team. You
                will be notified once your onboarding is complete.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
