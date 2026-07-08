import { useQuery } from '@tanstack/react-query';

import { transactionsApi } from '@/features/transactions/api';
import type { TransactionListParams } from '@/features/transactions/types';

const transactionsKeys = {
  all: ['transactions'] as const,
  list: (params: TransactionListParams) => [...transactionsKeys.all, 'list', params] as const,
  detail: (id: number) => [...transactionsKeys.all, 'detail', id] as const,
};

export const useTransactions = (params: TransactionListParams = {}) =>
  useQuery({
    queryKey: transactionsKeys.list(params),
    queryFn: () => transactionsApi.list(params),
  });

export const useTransaction = (id: number) =>
  useQuery({
    queryKey: transactionsKeys.detail(id),
    queryFn: () => transactionsApi.getById(id),
    enabled: Boolean(id),
  });
