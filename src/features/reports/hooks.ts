import { useQuery } from '@tanstack/react-query';

import { reportsApi } from '@/features/reports/api';
import type { ReportFilters } from '@/features/reports/types';

export const useReport = (filters: ReportFilters, enabled: boolean) =>
  useQuery({
    queryKey: ['reports', filters],
    queryFn: () => reportsApi.generate(filters),
    enabled,
  });
