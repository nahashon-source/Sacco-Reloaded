import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type {
  Member,
  CreateMemberPayload,
  UpdateMemberPayload,
  MemberListParams,
  NextOfKin,
  EmploymentInfo,
} from '@/features/members/types';

export const membersApi = {
  list: async (params: MemberListParams): Promise<PaginatedData<Member>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<Member>>>('/members', {
      params: {
        page: params.page,
        page_size: params.pageSize,
        search: params.search,
        status: params.status,
        branch_id: params.branchId,
      },
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
    const { data } = await apiClient.post<ApiResponse<Member>>('/members', {
      full_name: payload.fullName,
      email: payload.email,
      phone_number: payload.phoneNumber,
      branch_id: payload.branchId,
    });
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  update: async (id: number, payload: UpdateMemberPayload): Promise<Member> => {
    const { data } = await apiClient.patch<ApiResponse<Member>>(`/members/${id}`, payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  updateNextOfKin: async (id: number, payload: NextOfKin): Promise<Member> => {
    const { data } = await apiClient.put<ApiResponse<Member>>(`/members/${id}/next-of-kin`, payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  updateEmployment: async (id: number, payload: EmploymentInfo): Promise<Member> => {
    const { data } = await apiClient.put<ApiResponse<Member>>(`/members/${id}/employment`, payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  remove: async (id: number): Promise<void> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(`/members/${id}`);
    if (!data.success) throw new Error(data.message);
  },
};
