import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { branchesApi } from '@/features/branches/api';
import type { CreateBranchPayload, UpdateBranchPayload } from '@/features/branches/types';

const branchesKeys = { all: ['branches'] as const };

export const useBranches = () =>
  useQuery({
    queryKey: branchesKeys.all,
    queryFn: () => branchesApi.list(),
  });

export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBranchPayload) => branchesApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: branchesKeys.all }),
  });
};

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateBranchPayload }) =>
      branchesApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: branchesKeys.all }),
  });
};
