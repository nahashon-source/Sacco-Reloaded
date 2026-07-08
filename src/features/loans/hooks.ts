import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { loansApi } from '@/features/loans/api';
import type {
  LoanApplicationPayload,
  LoanRepaymentPayload,
  LoanListParams,
} from '@/features/loans/types';

const loansKeys = {
  all: ['loans'] as const,
  list: (params: LoanListParams) => [...loansKeys.all, 'list', params] as const,
  detail: (id: number) => [...loansKeys.all, 'detail', id] as const,
};

export const useLoans = (params: LoanListParams = {}) =>
  useQuery({
    queryKey: loansKeys.list(params),
    queryFn: () => loansApi.list(params),
  });

export const useLoan = (id: number) =>
  useQuery({
    queryKey: loansKeys.detail(id),
    queryFn: () => loansApi.getById(id),
    enabled: Boolean(id),
  });

export const useApplyForLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoanApplicationPayload) => loansApi.apply(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: loansKeys.all }),
  });
};

export const useApproveLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => loansApi.approve(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: loansKeys.all }),
  });
};

export const useRejectLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) => loansApi.reject(id, reason),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: loansKeys.all }),
  });
};

export const useRepayLoan = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoanRepaymentPayload) => loansApi.repay(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: loansKeys.all }),
  });
};
