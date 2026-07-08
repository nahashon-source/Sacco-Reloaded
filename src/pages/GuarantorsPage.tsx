import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useGuarantors } from '@/features/guarantors';
import type { Guarantor } from '@/features/guarantors';
import { formatCurrency } from '@/utils/helpers';

const columns: DataTableColumn<Guarantor>[] = [
  { key: 'loanId', header: 'Loan ID', render: (g) => g.loanId },
  { key: 'memberId', header: 'Guarantor Member ID', render: (g) => g.memberId },
  { key: 'guaranteedAmount', header: 'Amount', render: (g) => formatCurrency(g.guaranteedAmount) },
  { key: 'status', header: 'Status', render: (g) => g.status },
];

const GuarantorsPage = () => {
  const { data, isLoading, isError } = useGuarantors();

  return (
    <div>
      <PageHeader title="Guarantors" description="Loan guarantor requests and status." />
      <Card>
        <DataTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(g) => g.id}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="No guarantor records yet."
        />
      </Card>
    </div>
  );
};

export default GuarantorsPage;
