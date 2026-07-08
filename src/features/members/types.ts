export type MemberStatus = 'active' | 'inactive' | 'suspended';

export interface Member {
  id: number;
  memberNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: MemberStatus;
  joinedAt: string;
}

export interface CreateMemberPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface UpdateMemberPayload extends Partial<CreateMemberPayload> {
  status?: MemberStatus;
}

export interface MemberListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: MemberStatus;
}
