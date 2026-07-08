import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type {
  Guarantor,
  AddGuarantorPayload,
  GuarantorListParams,
} from '@/features/guarantors/types';

export const guarantorsApi = {
  list: async (params: GuarantorListParams): Promise<PaginatedData<Guarantor>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<Guarantor>>>('/guarantors', {
      params,
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  add: async (payload: AddGuarantorPayload): Promise<Guarantor> => {
    const { data } = await apiClient.post<ApiResponse<Guarantor>>('/guarantors', payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  respond: async (id: number, accept: boolean): Promise<Guarantor> => {
    const { data } = await apiClient.post<ApiResponse<Guarantor>>(`/guarantors/${id}/respond`, {
      accept,
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
