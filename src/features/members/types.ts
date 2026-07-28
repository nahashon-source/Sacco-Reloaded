export type MemberStatus = 'active' | 'inactive' | 'suspended';
export type KYCStatus = 'pending' | 'verified' | 'rejected';

export interface NextOfKin {
  fullName: string;
  relationship: string;
  phoneNumber: string;
}

export interface EmploymentInfo {
  employerName: string;
  jobTitle: string;
  monthlyIncome: number;
}

export interface MemberDocument {
  id: number;
  documentType: string;
  fileName: string;
  uploadedAt: string;
}

export interface Member {
  id: number;
  memberNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: MemberStatus;
  branchId: number | null;
  kycStatus: KYCStatus;
  nextOfKin: NextOfKin | null;
  employment: EmploymentInfo | null;
  documents: MemberDocument[];
  joinedAt: string;
}

export interface CreateMemberPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  branchId?: number | null;
}

export interface UpdateMemberPayload extends Partial<CreateMemberPayload> {
  status?: MemberStatus;
  kycStatus?: KYCStatus;
}

export interface MemberListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: MemberStatus;
  branchId?: number;
}
