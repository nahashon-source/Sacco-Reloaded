import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useShares } from '@/features/shares';
import type { ShareAccount } from '@/features/shares';
import { formatCurrency, formatDate } from '@/utils/helpers';

const columns: DataTableColumn<ShareAccount>[] = [
  { key: 'memberId', header: 'Member ID', render: (s) => s.memberId },
  { key: 'totalShares', header: 'Total Shares', render: (s) => s.totalShares },
  { key: 'shareValue', header: 'Share Value', render: (s) => formatCurrency(s.shareValue) },
  { key: 'totalValue', header: 'Total Value', render: (s) => formatCurrency(s.totalValue) },
  { key: 'purchasedAt', header: 'Purchased', render: (s) => formatDate(s.purchasedAt) },
];

const SharesPage = () => {
  const { data, isLoading, isError } = useShares();

  return (
    <div>
      <PageHeader title="Shares" description="Member share capital holdings." />
      <Card>
        <DataTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(s) => s.id}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="No share records yet."
        />
      </Card>
    </div>
  );
};

export default SharesPage;
