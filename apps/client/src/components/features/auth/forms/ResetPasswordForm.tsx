'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import type { PasswordResetResponse, ResetPasswordInput } from '@/gql/graphql';

import { graphqlRequest } from '@/lib/graphql-client';

const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      message
    }
  }
`;

const resetPasswordSchema = z
  .object({
    confirmPassword: z.string(),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await graphqlRequest<
        { resetPassword: PasswordResetResponse },
        { input: ResetPasswordInput }
      >({
        query: RESET_PASSWORD_MUTATION,
        variables: {
          input: {
            confirmPassword: data.confirmPassword,
            newPassword: data.newPassword,
            token,
          },
        },
      });

      setSuccessMessage(response.resetPassword.message);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="newPassword">
          New password
        </label>
        <input
          id="newPassword"
          type="password"
          {...register('newPassword')}
          aria-invalid={errors.newPassword ? 'true' : 'false'}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-transparent focus:ring-2 focus:ring-[#c8102e] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          placeholder="Enter your new password"
        />
        {errors.newPassword && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {errors.newPassword.message}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Password must be at least 8 characters with uppercase, lowercase, and a number
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-transparent focus:ring-2 focus:ring-[#c8102e] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          placeholder="Confirm your new password"
        />
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {errorMessage && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        </div>
      )}

      {successMessage && (
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm text-green-600" role="status">
            {successMessage}
          </p>
          <p className="mt-1 text-xs text-green-600">Redirecting to login...</p>
        </div>
      )}

      <button
        className="w-full rounded-lg bg-[#c8102e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#a00d25] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Resetting password...' : 'Reset password'}
      </button>

      <div className="text-center">
        <Link
          className="text-sm text-gray-600 underline underline-offset-4 hover:text-gray-900"
          href="/auth/login"
        >
          Back to login
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
