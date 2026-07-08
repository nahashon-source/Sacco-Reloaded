import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { sharesApi } from '@/features/shares/api';
import type { PurchaseSharesPayload, SharesListParams } from '@/features/shares/types';

const sharesKeys = {
  all: ['shares'] as const,
  list: (params: SharesListParams) => [...sharesKeys.all, 'list', params] as const,
};

export const useShares = (params: SharesListParams = {}) =>
  useQuery({
    queryKey: sharesKeys.list(params),
    queryFn: () => sharesApi.list(params),
  });

export const usePurchaseShares = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: PurchaseSharesPayload) => sharesApi.purchase(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: sharesKeys.all }),
  });
};
