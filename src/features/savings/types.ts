export type SavingsAccountStatus = 'active' | 'dormant' | 'closed';
export type SavingsAccountType = 'regular' | 'fixed_deposit' | 'junior';

export interface SavingsAccount {
  id: number;
  memberId: number;
  accountNumber: string;
  accountType: SavingsAccountType;
  balance: number;
  status: SavingsAccountStatus;
  openedAt: string;
}

export interface CreateSavingsAccountPayload {
  memberId: number;
  accountType: SavingsAccountType;
}

export interface SavingsDepositPayload {
  amount: number;
  reference?: string;
}

export interface SavingsWithdrawalPayload {
  amount: number;
  reason: string;
}

export interface SavingsListParams {
  page?: number;
  pageSize?: number;
  memberId?: number;
  status?: SavingsAccountStatus;
}
