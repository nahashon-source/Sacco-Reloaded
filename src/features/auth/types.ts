import type { UserRole, Permission } from '@/types';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseData {
  user: User;
  tokens: AuthTokens;
}
