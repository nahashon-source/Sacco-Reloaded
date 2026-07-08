import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { savingsApi } from '@/features/savings/api';
import type {
  CreateSavingsAccountPayload,
  SavingsDepositPayload,
  SavingsWithdrawalPayload,
  SavingsListParams,
} from '@/features/savings/types';

const savingsKeys = {
  all: ['savings'] as const,
  list: (params: SavingsListParams) => [...savingsKeys.all, 'list', params] as const,
  detail: (id: number) => [...savingsKeys.all, 'detail', id] as const,
};

export const useSavingsAccounts = (params: SavingsListParams = {}) =>
  useQuery({
    queryKey: savingsKeys.list(params),
    queryFn: () => savingsApi.list(params),
  });

export const useSavingsAccount = (id: number) =>
  useQuery({
    queryKey: savingsKeys.detail(id),
    queryFn: () => savingsApi.getById(id),
    enabled: Boolean(id),
  });

export const useCreateSavingsAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateSavingsAccountPayload) => savingsApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: savingsKeys.all }),
  });
};

export const useSavingsDeposit = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SavingsDepositPayload) => savingsApi.deposit(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: savingsKeys.all }),
  });
};

export const useSavingsWithdrawal = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SavingsWithdrawalPayload) => savingsApi.withdraw(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: savingsKeys.all }),
  });
};
