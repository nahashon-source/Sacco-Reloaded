import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type {
  SavingsAccount,
  CreateSavingsAccountPayload,
  SavingsDepositPayload,
  SavingsWithdrawalPayload,
  SavingsListParams,
} from '@/features/savings/types';

export const savingsApi = {
  list: async (params: SavingsListParams): Promise<PaginatedData<SavingsAccount>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<SavingsAccount>>>('/savings', {
      params,
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  getById: async (id: number): Promise<SavingsAccount> => {
    const { data } = await apiClient.get<ApiResponse<SavingsAccount>>(`/savings/${id}`);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  create: async (payload: CreateSavingsAccountPayload): Promise<SavingsAccount> => {
    const { data } = await apiClient.post<ApiResponse<SavingsAccount>>('/savings', payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  deposit: async (id: number, payload: SavingsDepositPayload): Promise<SavingsAccount> => {
    const { data } = await apiClient.post<ApiResponse<SavingsAccount>>(
      `/savings/${id}/deposit`,
      payload
    );
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  withdraw: async (id: number, payload: SavingsWithdrawalPayload): Promise<SavingsAccount> => {
    const { data } = await apiClient.post<ApiResponse<SavingsAccount>>(
      `/savings/${id}/withdraw`,
      payload
    );
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
