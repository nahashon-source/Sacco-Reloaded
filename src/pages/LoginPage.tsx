import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormValues } from '@/features/auth/schema';
import type { ApiResponse } from '@/types';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const redirectTo = (location.state as { from?: Location })?.from?.pathname || '/';

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);

    try {
      await login(values);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      if (isAxiosError<ApiResponse<unknown>>(error)) {
        setServerError(error.response?.data?.message || 'Login failed. Please try again.');
      } else {
        setServerError('Login failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">
        Sign in
      </h1>

      {serverError && (
        <div
          role="alert"
          className="mb-4 rounded-[var(--radius-sm)] border border-[var(--color-danger)] bg-red-50 px-3 py-2 text-sm text-[var(--color-danger)]"
        >
          {serverError}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-[var(--color-danger)]">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'password-error' : undefined}
          className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          {...register('password')}
        />
        {errors.password && (
          <p id="password-error" className="mt-1 text-xs text-[var(--color-danger)]">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      >
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
};

export default LoginPage;
