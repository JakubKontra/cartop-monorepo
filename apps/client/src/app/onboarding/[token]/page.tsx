import type { Metadata } from 'next';

import type {
  GetOnboardingByTokenQuery,
  GetRequiredDocumentsByTokenQuery,
} from '@/gql/graphql';

import { graphqlRequest } from '@/lib/graphql-client';
import {
  GET_ONBOARDING_BY_TOKEN_QUERY,
  GET_REQUIRED_DOCUMENTS_BY_TOKEN_QUERY,
} from '@/queries/onboarding';
import { OnboardingClient } from '@/components/features/onboarding/onboarding-client';

export const metadata: Metadata = {
  description: 'Upload your documents to complete your car request onboarding',
  title: 'Document Upload - Cartop Onboarding',
};

interface OnboardingPageProps {
  params: Promise<{
    token: string;
  }>;
}

/**
 * Onboarding Page (Server Component)
 * Fetches onboarding data server-side and passes to Client Component
 */
export default async function OnboardingPage({ params }: OnboardingPageProps) {
  const { token } = await params;

  // Fetch onboarding data and required documents
  let onboarding: GetOnboardingByTokenQuery['onboardingByToken'];
  let requiredDocuments: GetRequiredDocumentsByTokenQuery['requiredDocumentsByToken'];

  try {
    const [onboardingData, documentsData] = await Promise.all([
      graphqlRequest<GetOnboardingByTokenQuery, { token: string }>({
        query: GET_ONBOARDING_BY_TOKEN_QUERY,
        variables: { token },
      }),
      graphqlRequest<GetRequiredDocumentsByTokenQuery, { token: string }>({
        query: GET_REQUIRED_DOCUMENTS_BY_TOKEN_QUERY,
        variables: { token },
      }),
    ]);

    onboarding = onboardingData.onboardingByToken;
    requiredDocuments = documentsData.requiredDocumentsByToken;
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">Onboarding Not Found</h1>
          <p className="mt-4 text-lg text-gray-600">
            The onboarding link you're looking for doesn't exist or has been removed.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Please contact support if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  // Pass data to Client Component for interactivity
  return <OnboardingClient token={token} onboarding={onboarding} documents={requiredDocuments} />;
}
