export type ReportType = 'members_summary' | 'loans_portfolio' | 'savings_summary' | 'financial_statement';

export interface ReportFilters {
  dateFrom: string;
  dateTo: string;
  type: ReportType;
}

export interface ReportResult {
  type: ReportType;
  generatedAt: string;
  data: Record<string, unknown>;
}
