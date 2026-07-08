import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useContributions } from '@/features/contributions';
import type { Contribution } from '@/features/contributions';
import { RecordContributionModal } from '@/features/contributions/components/RecordContributionModal';
import { formatCurrency, formatDate } from '@/utils/helpers';

const columns: DataTableColumn<Contribution>[] = [
  { key: 'memberId', header: 'Member ID', render: (c) => c.memberId },
  { key: 'type', header: 'Type', render: (c) => c.type },
  { key: 'amount', header: 'Amount', render: (c) => formatCurrency(c.amount) },
  { key: 'contributedAt', header: 'Date', render: (c) => formatDate(c.contributedAt) },
];

const ContributionsPage = () => {
  const { data, isLoading, isError } = useContributions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Contributions"
        description="Member contribution records."
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Record Contribution
          </Button>
        }
      />
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

      <RecordContributionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ContributionsPage;
