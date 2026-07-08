import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { membersApi } from '@/features/members/api';
import type {
  CreateMemberPayload,
  UpdateMemberPayload,
  MemberListParams,
} from '@/features/members/types';

const membersKeys = {
  all: ['members'] as const,
  list: (params: MemberListParams) => [...membersKeys.all, 'list', params] as const,
  detail: (id: number) => [...membersKeys.all, 'detail', id] as const,
};

export const useMembers = (params: MemberListParams = {}) =>
  useQuery({
    queryKey: membersKeys.list(params),
    queryFn: () => membersApi.list(params),
  });

export const useMember = (id: number) =>
  useQuery({
    queryKey: membersKeys.detail(id),
    queryFn: () => membersApi.getById(id),
    enabled: Boolean(id),
  });

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMemberPayload) => membersApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: membersKeys.all }),
  });
};

export const useUpdateMember = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateMemberPayload) => membersApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: membersKeys.all }),
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => membersApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: membersKeys.all }),
  });
};
