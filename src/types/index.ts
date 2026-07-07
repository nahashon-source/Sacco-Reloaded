/**
 * Global shared types. Feature-specific domain types (Member, Loan, etc.)
 * belong in their respective features/*/types.ts, not here.
 */

// Matches the backend's mandatory API response envelope.
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type UserRole = 'admin' | 'staff' | 'member';

export interface Permission {
  code: string;
  description: string;
}
