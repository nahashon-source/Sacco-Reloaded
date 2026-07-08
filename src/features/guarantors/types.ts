export type GuarantorStatus = 'pending' | 'accepted' | 'declined' | 'released';

export interface Guarantor {
  id: number;
  loanId: number;
  memberId: number;
  guaranteedAmount: number;
  status: GuarantorStatus;
  respondedAt: string | null;
}

export interface AddGuarantorPayload {
  loanId: number;
  memberId: number;
  guaranteedAmount: number;
}

export interface GuarantorListParams {
  page?: number;
  pageSize?: number;
  loanId?: number;
  memberId?: number;
}
