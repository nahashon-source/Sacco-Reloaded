export type ContributionType = 'monthly' | 'special' | 'welfare';

export interface Contribution {
  id: number;
  memberId: number;
  type: ContributionType;
  amount: number;
  contributedAt: string;
}

export interface RecordContributionPayload {
  memberId: number;
  type: ContributionType;
  amount: number;
}

export interface ContributionListParams {
  page?: number;
  pageSize?: number;
  memberId?: number;
  type?: ContributionType;
}
