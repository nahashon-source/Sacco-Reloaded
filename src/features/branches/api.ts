import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type { Branch, CreateBranchPayload, UpdateBranchPayload } from '@/features/branches/types';

export const branchesApi = {
  list: async (): Promise<PaginatedData<Branch>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<Branch>>>('/branches');
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  create: async (payload: CreateBranchPayload): Promise<Branch> => {
    const { data } = await apiClient.post<ApiResponse<Branch>>('/branches', payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  update: async (id: number, payload: UpdateBranchPayload): Promise<Branch> => {
    const { data } = await apiClient.patch<ApiResponse<Branch>>(`/branches/${id}`, payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
