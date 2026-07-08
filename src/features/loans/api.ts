import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type {
  Loan,
  LoanApplicationPayload,
  LoanRepaymentPayload,
  LoanListParams,
} from '@/features/loans/types';

export const loansApi = {
  list: async (params: LoanListParams): Promise<PaginatedData<Loan>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<Loan>>>('/loans', { params });
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  getById: async (id: number): Promise<Loan> => {
    const { data } = await apiClient.get<ApiResponse<Loan>>(`/loans/${id}`);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  apply: async (payload: LoanApplicationPayload): Promise<Loan> => {
    const { data } = await apiClient.post<ApiResponse<Loan>>('/loans', payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  approve: async (id: number): Promise<Loan> => {
    const { data } = await apiClient.post<ApiResponse<Loan>>(`/loans/${id}/approve`);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  reject: async (id: number, reason: string): Promise<Loan> => {
    const { data } = await apiClient.post<ApiResponse<Loan>>(`/loans/${id}/reject`, { reason });
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  repay: async (id: number, payload: LoanRepaymentPayload): Promise<Loan> => {
    const { data } = await apiClient.post<ApiResponse<Loan>>(`/loans/${id}/repay`, payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
