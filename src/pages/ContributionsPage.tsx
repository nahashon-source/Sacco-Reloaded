import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useContributions } from '@/features/contributions';
import type { Contribution } from '@/features/contributions';
import { formatCurrency, formatDate } from '@/utils/helpers';

const columns: DataTableColumn<Contribution>[] = [
  { key: 'memberId', header: 'Member ID', render: (c) => c.memberId },
  { key: 'type', header: 'Type', render: (c) => c.type },
  { key: 'amount', header: 'Amount', render: (c) => formatCurrency(c.amount) },
  { key: 'contributedAt', header: 'Date', render: (c) => formatDate(c.contributedAt) },
];

const ContributionsPage = () => {
  const { data, isLoading, isError } = useContributions();

  return (
    <div>
      <PageHeader title="Contributions" description="Member contribution records." />
      <Card>
        <DataTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(c) => c.id}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="No contributions yet."
        />
      </Card>
    </div>
  );
};

export default ContributionsPage;
