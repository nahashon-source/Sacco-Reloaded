import { useState } from 'react';

import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useReport } from '@/features/reports';
import type { ReportType } from '@/features/reports';

const reportTypes: { value: ReportType; label: string }[] = [
  { value: 'members_summary', label: 'Members Summary' },
  { value: 'loans_portfolio', label: 'Loans Portfolio' },
  { value: 'savings_summary', label: 'Savings Summary' },
  { value: 'financial_statement', label: 'Financial Statement' },
];

const ReportsPage = () => {
  const [type, setType] = useState<ReportType>('members_summary');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, isError } = useReport({ type, dateFrom, dateTo }, shouldFetch);

  return (
    <div>
      <PageHeader title="Reports" description="Generate operational and financial reports." />
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="report-type" className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                Report type
              </label>
              <select
                id="report-type"
                value={type}
                onChange={(e) => setType(e.target.value as ReportType)}
                className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              >
                {reportTypes.map((rt) => (
                  <option key={rt.value} value={rt.value}>
                    {rt.label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              id="date-from"
              label="From"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <Input
              id="date-to"
              label="To"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <Button
            className="mt-4"
            onClick={() => setShouldFetch(true)}
            isLoading={shouldFetch && isLoading}
            disabled={!dateFrom || !dateTo}
          >
            Generate report
          </Button>

          {shouldFetch && isError && (
            <p className="mt-4 text-sm text-[var(--color-danger)]">Failed to generate report.</p>
          )}

          {shouldFetch && data && (
            <pre className="mt-4 overflow-x-auto rounded-[var(--radius-sm)] bg-[var(--color-surface)] p-4 text-xs text-[var(--color-text-primary)]">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
