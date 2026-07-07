import { apiClient } from '@/api/axios';
import type { ApiResponse } from '@/types';
import type { LoginCredentials, LoginResponseData, User } from '@/features/auth/types';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const { data } = await apiClient.post<ApiResponse<LoginResponseData>>(
    '/auth/login',
    credentials
  );

  if (!data.success) {
    throw new Error(data.message || 'Login failed');
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, data.data.tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.data.tokens.refreshToken);

  return data.data.user;
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

// Called only by the axios response interceptor on 401. Not exposed for
// general use — components must never trigger a refresh directly.
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const { data } = await apiClient.post<ApiResponse<{ accessToken: string }>>(
    '/auth/refresh',
    { refreshToken }
  );

  if (!data.success) {
    throw new Error(data.message || 'Token refresh failed');
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, data.data.accessToken);
  return data.data.accessToken;
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await apiClient.get<ApiResponse<User>>('/auth/me');

  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch current user');
  }

  return data.data;
};

export const hasAccessToken = (): boolean => Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
