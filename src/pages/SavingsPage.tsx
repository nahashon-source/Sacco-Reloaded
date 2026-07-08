import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useSavingsAccounts } from '@/features/savings';
import type { SavingsAccount } from '@/features/savings';
import { formatCurrency, formatDate } from '@/utils/helpers';

const columns: DataTableColumn<SavingsAccount>[] = [
  { key: 'accountNumber', header: 'Account #', render: (a) => a.accountNumber },
  { key: 'accountType', header: 'Type', render: (a) => a.accountType.replace('_', ' ') },
  { key: 'balance', header: 'Balance', render: (a) => formatCurrency(a.balance) },
  { key: 'status', header: 'Status', render: (a) => a.status },
  { key: 'openedAt', header: 'Opened', render: (a) => formatDate(a.openedAt) },
];

const SavingsPage = () => {
  const { data, isLoading, isError } = useSavingsAccounts();

  return (
    <div>
      <PageHeader title="Savings" description="Member savings accounts." />
      <Card>
        <DataTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(a) => a.id}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="No savings accounts yet."
        />
      </Card>
    </div>
  );
};

export default SavingsPage;
