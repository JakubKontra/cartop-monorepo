'use client';

import { cn } from '@cartop/ui-utils';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { Logo } from '@/components/branding/Logo';
import ResetPasswordForm from '@/components/features/auth/forms/ResetPasswordForm';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-sm text-red-600">
          Invalid or missing reset token. Please request a new password reset link.
        </p>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}

export default function ResetPasswordPage() {
  return (
    <div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
          <div className="mb-4 flex items-center justify-center">
            <Logo className="me-2" />
            <h1 className="text-xl font-medium">Shadcn Admin</h1>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-2">
          <div className="flex flex-col space-y-2 text-start">
            <h2 className="text-lg font-semibold tracking-tight">Reset your password</h2>
            <p className="text-muted-foreground text-sm">
              Enter your new password below
            </p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
          </Suspense>
        </div>
      </div>

      <div
        className={cn(
          'bg-muted relative h-full overflow-hidden max-lg:hidden',
          '[&>img]:absolute [&>img]:top-[15%] [&>img]:left-20 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top-left [&>img]:select-none',
        )}
      >
        <Image
          alt="Shadcn-Admin"
          className="dark:hidden"
          height={1151}
          src={'/images/auth/register.png'}
          width={1024}
        />
      </div>
    </div>
  );
}
