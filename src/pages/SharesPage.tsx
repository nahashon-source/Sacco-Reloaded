import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useShares } from '@/features/shares';
import type { ShareAccount } from '@/features/shares';
import { PurchaseSharesModal } from '@/features/shares/components/PurchaseSharesModal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Shares"
        description="Member share capital holdings."
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Purchase Shares
          </Button>
        }
      />
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

      <PurchaseSharesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default SharesPage;
