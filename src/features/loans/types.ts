export type LoanStatus = 'pending' | 'approved' | 'disbursed' | 'rejected' | 'closed' | 'defaulted';

export interface Loan {
  id: number;
  loanNumber: string;
  memberId: number;
  principal: number;
  interestRate: number;
  termMonths: number;
  outstandingBalance: number;
  status: LoanStatus;
  appliedAt: string;
  disbursedAt: string | null;
}

export interface LoanApplicationPayload {
  memberId: number;
  principal: number;
  termMonths: number;
  purpose: string;
}

export interface LoanRepaymentPayload {
  amount: number;
  reference?: string;
}

export interface LoanListParams {
  page?: number;
  pageSize?: number;
  memberId?: number;
  status?: LoanStatus;
}
