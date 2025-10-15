'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import type { PasswordResetRequestResponse, RequestPasswordResetInput } from '@/gql/graphql';

import { graphqlRequest } from '@/lib/graphql-client';

const REQUEST_PASSWORD_RESET_MUTATION = `
  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      success
      message
    }
  }
`;

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await graphqlRequest<
        { requestPasswordReset: PasswordResetRequestResponse },
        { input: RequestPasswordResetInput }
      >({
        query: REQUEST_PASSWORD_RESET_MUTATION,
        variables: {
          input: {
            email: data.email,
          },
        },
      });

      setSuccessMessage(response.requestPasswordReset.message);
      reset();
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
        <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-transparent focus:ring-2 focus:ring-[#c8102e] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {errors.email.message}
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
        </div>
      )}

      <button
        className="w-full rounded-lg bg-[#c8102e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#a00d25] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Sending...' : 'Send reset link'}
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

export default ForgotPasswordForm;
