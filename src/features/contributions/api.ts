import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type {
  Contribution,
  RecordContributionPayload,
  ContributionListParams,
} from '@/features/contributions/types';

export const contributionsApi = {
  list: async (params: ContributionListParams): Promise<PaginatedData<Contribution>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<Contribution>>>(
      '/contributions',
      { params }
    );
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  record: async (payload: RecordContributionPayload): Promise<Contribution> => {
    const { data } = await apiClient.post<ApiResponse<Contribution>>('/contributions', payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
