import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { contributionsApi } from '@/features/contributions/api';
import type {
  RecordContributionPayload,
  ContributionListParams,
} from '@/features/contributions/types';

const contributionsKeys = {
  all: ['contributions'] as const,
  list: (params: ContributionListParams) => [...contributionsKeys.all, 'list', params] as const,
};

export const useContributions = (params: ContributionListParams = {}) =>
  useQuery({
    queryKey: contributionsKeys.list(params),
    queryFn: () => contributionsApi.list(params),
  });

export const useRecordContribution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RecordContributionPayload) => contributionsApi.record(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: contributionsKeys.all }),
  });
};
