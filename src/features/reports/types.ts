export type ReportType = 'members_summary' | 'loans_portfolio' | 'savings_summary' | 'financial_statement';

export interface ReportFilters {
  dateFrom: string;
  dateTo: string;
  type: ReportType;
}

export interface MembersSummaryData {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  suspendedMembers: number;
  newMembersInPeriod: number;
}

export interface LoansPortfolioData {
  totalLoans: number;
  pendingLoans: number;
  disbursedLoans: number;
  closedLoans: number;
  rejectedLoans: number;
  totalPrincipalDisbursed: number;
  totalOutstandingBalance: number;
}

export interface SavingsSummaryData {
  totalAccounts: number;
  activeAccounts: number;
  dormantAccounts: number;
  totalBalance: number;
}

export interface FinancialStatementData {
  totalSavingsBalance: number;
  totalOutstandingLoans: number;
  totalSharesValue: number;
  totalContributionsInPeriod: number;
}

export type ReportData =
  | MembersSummaryData
  | LoansPortfolioData
  | SavingsSummaryData
  | FinancialStatementData;

export interface ReportResult {
  type: ReportType;
  generatedAt: string;
  dateFrom: string;
  dateTo: string;
  data: ReportData;
}
