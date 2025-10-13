import { cn } from '@cartop/ui-utils';
import Image from 'next/image';

import { Logo } from '@/components/branding/Logo';
import SignInForm from '@/components/features/auth/forms/SignInForm';

export default function PasswordResetRequestPage() {
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
            <h2 className="text-lg font-semibold tracking-tight">Sign in</h2>
            <p className="text-muted-foreground text-sm">
              Enter your email and password below <br />
              to log into your account
            </p>
          </div>
          <SignInForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking sign in, you agree to our{' '}
            <a className="underline underline-offset-4 hover:text-primary" href="/terms">
              Terms of Service
            </a>{' '}
            and{' '}
            <a className="underline underline-offset-4 hover:text-primary" href="/privacy">
              Privacy Policy
            </a>
          </p>
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
