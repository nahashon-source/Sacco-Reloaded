export type BranchStatus = 'active' | 'inactive';

export interface Branch {
  id: number;
  name: string;
  code: string;
  address: string;
  managerMemberId: number | null;
  status: BranchStatus;
}

export interface CreateBranchPayload {
  name: string;
  code: string;
  address: string;
  managerMemberId?: number | null;
}

export interface UpdateBranchPayload extends Partial<CreateBranchPayload> {
  status?: BranchStatus;
}
