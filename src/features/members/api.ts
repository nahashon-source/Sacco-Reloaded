import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type {
  Member,
  CreateMemberPayload,
  UpdateMemberPayload,
  MemberListParams,
} from '@/features/members/types';

export const membersApi = {
  list: async (params: MemberListParams): Promise<PaginatedData<Member>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<Member>>>('/members', {
      params,
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  getById: async (id: number): Promise<Member> => {
    const { data } = await apiClient.get<ApiResponse<Member>>(`/members/${id}`);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  create: async (payload: CreateMemberPayload): Promise<Member> => {
    const { data } = await apiClient.post<ApiResponse<Member>>('/members', payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  update: async (id: number, payload: UpdateMemberPayload): Promise<Member> => {
    const { data } = await apiClient.patch<ApiResponse<Member>>(`/members/${id}`, payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/members/${id}`);
    if (!data.success) throw new Error(data.message);
  },
};
