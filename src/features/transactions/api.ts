import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type { Transaction, TransactionListParams } from '@/features/transactions/types';

export const transactionsApi = {
  list: async (params: TransactionListParams): Promise<PaginatedData<Transaction>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<Transaction>>>(
      '/transactions',
      { params }
    );
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  getById: async (id: number): Promise<Transaction> => {
    const { data } = await apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
