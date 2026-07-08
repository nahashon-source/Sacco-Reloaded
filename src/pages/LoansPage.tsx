import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useLoans } from '@/features/loans';
import type { Loan } from '@/features/loans';
import { formatCurrency, formatDate } from '@/utils/helpers';

const columns: DataTableColumn<Loan>[] = [
  { key: 'loanNumber', header: 'Loan #', render: (l) => l.loanNumber },
  { key: 'principal', header: 'Principal', render: (l) => formatCurrency(l.principal) },
  { key: 'outstandingBalance', header: 'Outstanding', render: (l) => formatCurrency(l.outstandingBalance) },
  { key: 'status', header: 'Status', render: (l) => l.status },
  { key: 'appliedAt', header: 'Applied', render: (l) => formatDate(l.appliedAt) },
];

const LoansPage = () => {
  const { data, isLoading, isError } = useLoans();

  return (
    <div>
      <PageHeader title="Loans" description="Loan applications and active loans." />
      <Card>
        <DataTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(l) => l.id}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="No loans yet."
        />
      </Card>
    </div>
  );
};

export default LoansPage;
