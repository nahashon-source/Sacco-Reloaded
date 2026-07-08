export interface ShareAccount {
  id: number;
  memberId: number;
  totalShares: number;
  shareValue: number;
  totalValue: number;
  purchasedAt: string;
}

export interface PurchaseSharesPayload {
  memberId: number;
  numberOfShares: number;
}

export interface SharesListParams {
  page?: number;
  pageSize?: number;
  memberId?: number;
}
