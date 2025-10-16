import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';

import { cn } from '@cartop/ui-utils';

type OnboardingStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETE' | 'INCOMPLETE' | 'EXPIRED';

interface OnboardingStatusProps {
  status: OnboardingStatus;
  expiresAt: string;
  completedAt?: string | null;
  uploadedCount: number;
  totalRequired: number;
}

/**
 * Check if onboarding is expired
 */
function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

/**
 * Format date to readable string
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Get status configuration
 */
function getStatusConfig(status: OnboardingStatus, expired: boolean) {
  if (expired) {
    return {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: XCircle,
      iconColor: 'text-red-600',
      label: 'Expired',
      textColor: 'text-red-800',
    };
  }

  switch (status) {
    case 'COMPLETE':
      return {
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle2,
        iconColor: 'text-green-600',
        label: 'Complete',
        textColor: 'text-green-800',
      };
    case 'IN_PROGRESS':
      return {
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: Clock,
        iconColor: 'text-blue-600',
        label: 'In Progress',
        textColor: 'text-blue-800',
      };
    case 'INCOMPLETE':
      return {
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: AlertCircle,
        iconColor: 'text-yellow-600',
        label: 'Incomplete',
        textColor: 'text-yellow-800',
      };
    case 'PENDING':
    default:
      return {
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        icon: Clock,
        iconColor: 'text-gray-600',
        label: 'Pending',
        textColor: 'text-gray-800',
      };
  }
}

/**
 * Onboarding Status Component
 * Displays current status and progress of onboarding
 */
export function OnboardingStatus({
  status,
  expiresAt,
  completedAt,
  uploadedCount,
  totalRequired,
}: OnboardingStatusProps) {
  const expired = isExpired(expiresAt);
  const config = getStatusConfig(status, expired);
  const Icon = config.icon;
  const percentage = totalRequired > 0 ? (uploadedCount / totalRequired) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Status Badge */}
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg border p-4',
          config.bgColor,
          config.borderColor,
        )}
      >
        <Icon size={24} className={config.iconColor} />
        <div className="flex-1">
          <p className={cn('font-semibold', config.textColor)}>{config.label}</p>
          {completedAt && (
            <p className="text-sm text-gray-600">Completed on {formatDate(completedAt)}</p>
          )}
          {!completedAt && !expired && (
            <p className="text-sm text-gray-600">Expires on {formatDate(expiresAt)}</p>
          )}
          {expired && (
            <p className="text-sm text-red-600">
              Expired on {formatDate(expiresAt)}. Please contact support.
            </p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {!expired && status !== 'COMPLETE' && (
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-gray-700">Document Progress</span>
            <span className="text-gray-600">
              {uploadedCount} of {totalRequired} uploaded
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-200">
            <div
              className={cn(
                'h-3 rounded-full transition-all duration-500',
                percentage === 100 ? 'bg-green-600' : 'bg-primary',
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
