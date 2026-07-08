import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type {
  ShareAccount,
  PurchaseSharesPayload,
  SharesListParams,
} from '@/features/shares/types';

export const sharesApi = {
  list: async (params: SharesListParams): Promise<PaginatedData<ShareAccount>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<ShareAccount>>>('/shares', {
      params,
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  purchase: async (payload: PurchaseSharesPayload): Promise<ShareAccount> => {
    const { data } = await apiClient.post<ApiResponse<ShareAccount>>('/shares/purchase', payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
