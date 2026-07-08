import { Check, X } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useGuarantors, useRespondToGuarantorRequest } from '@/features/guarantors';
import type { Guarantor } from '@/features/guarantors';
import { formatCurrency } from '@/utils/helpers';

const GuarantorsPage = () => {
  const { data, isLoading, isError } = useGuarantors();
  const respond = useRespondToGuarantorRequest();

  const columns: DataTableColumn<Guarantor>[] = [
    { key: 'loanId', header: 'Loan ID', render: (g) => g.loanId },
    { key: 'memberId', header: 'Guarantor Member ID', render: (g) => g.memberId },
    {
      key: 'guaranteedAmount',
      header: 'Amount',
      render: (g) => formatCurrency(g.guaranteedAmount),
    },
    { key: 'status', header: 'Status', render: (g) => g.status },
    {
      key: 'actions',
      header: 'Actions',
      render: (g) =>
        g.status === 'pending' ? (
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={`Accept guarantor request ${g.id}`}
              onClick={() => respond.mutate({ id: g.id, accept: true })}
              disabled={respond.isPending}
              className="rounded-[var(--radius-sm)] p-1.5 text-[var(--color-success)] hover:bg-[var(--color-surface-secondary)] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={`Decline guarantor request ${g.id}`}
              onClick={() => respond.mutate({ id: g.id, accept: false })}
              disabled={respond.isPending}
              className="rounded-[var(--radius-sm)] p-1.5 text-[var(--color-danger)] hover:bg-[var(--color-surface-secondary)] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <span className="text-[var(--color-text-secondary)]">—</span>
        ),
    },
  ];

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
