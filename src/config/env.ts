/**
 * Central environment config. All env access must go through this file —
 * never read import.meta.env directly in features/components.
 */

const getRequiredEnv = (key: keyof ImportMetaEnv): string => {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. Check your .env file.`
    );
  }

  return value;
};

export const env = {
  apiBaseUrl: getRequiredEnv('VITE_API_BASE_URL'),
  appName: import.meta.env.VITE_APP_NAME || 'SACCO Management System',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
