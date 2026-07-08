import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useTransactions } from '@/features/transactions';
import type { Transaction } from '@/features/transactions';
import { formatCurrency, formatDate } from '@/utils/helpers';

const columns: DataTableColumn<Transaction>[] = [
  { key: 'reference', header: 'Reference', render: (t) => t.reference },
  { key: 'type', header: 'Type', render: (t) => t.type.replace('_', ' ') },
  { key: 'amount', header: 'Amount', render: (t) => formatCurrency(t.amount) },
  { key: 'status', header: 'Status', render: (t) => t.status },
  { key: 'createdAt', header: 'Date', render: (t) => formatDate(t.createdAt) },
];

const TransactionsPage = () => {
  const { data, isLoading, isError } = useTransactions();

  return (
    <div>
      <PageHeader title="Transactions" description="All financial transactions." />
      <Card>
        <DataTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(t) => t.id}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="No transactions yet."
        />
      </Card>
    </div>
  );
};

export default TransactionsPage;
