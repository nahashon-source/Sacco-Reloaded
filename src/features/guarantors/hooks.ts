import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { guarantorsApi } from '@/features/guarantors/api';
import type { AddGuarantorPayload, GuarantorListParams } from '@/features/guarantors/types';

const guarantorsKeys = {
  all: ['guarantors'] as const,
  list: (params: GuarantorListParams) => [...guarantorsKeys.all, 'list', params] as const,
};

export const useGuarantors = (params: GuarantorListParams = {}) =>
  useQuery({
    queryKey: guarantorsKeys.list(params),
    queryFn: () => guarantorsApi.list(params),
  });

export const useAddGuarantor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddGuarantorPayload) => guarantorsApi.add(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: guarantorsKeys.all }),
  });
};

export const useRespondToGuarantorRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, accept }: { id: number; accept: boolean }) =>
      guarantorsApi.respond(id, accept),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: guarantorsKeys.all }),
  });
};
