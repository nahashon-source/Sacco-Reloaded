export type TransactionType = 'deposit' | 'withdrawal' | 'loan_disbursement' | 'loan_repayment' | 'share_purchase' | 'contribution';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'reversed';

export interface Transaction {
  id: number;
  memberId: number;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  reference: string;
  createdAt: string;
}

export interface TransactionListParams {
  page?: number;
  pageSize?: number;
  memberId?: number;
  type?: TransactionType;
  status?: TransactionStatus;
  dateFrom?: string;
  dateTo?: string;
}
