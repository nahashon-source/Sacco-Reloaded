import { apiClient } from '@/api/axios';
import type { ApiResponse } from '@/types';
import type { ReportFilters, ReportResult } from '@/features/reports/types';

export const reportsApi = {
  generate: async (filters: ReportFilters): Promise<ReportResult> => {
    const { data } = await apiClient.get<ApiResponse<ReportResult>>('/reports', {
      params: filters,
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
