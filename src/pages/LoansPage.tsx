import { useState } from 'react';
import { FilePlus, Check, X } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useLoans, useApproveLoan, useRejectLoan } from '@/features/loans';
import type { Loan } from '@/features/loans';
import { LoanApplicationModal } from '@/features/loans/components/LoanApplicationModal';
import { formatCurrency, formatDate } from '@/utils/helpers';

const LoansPage = () => {
  const { data, isLoading, isError } = useLoans();
  const approveLoan = useApproveLoan();
  const rejectLoan = useRejectLoan();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<Loan>[] = [
    { key: 'loanNumber', header: 'Loan #', render: (l) => l.loanNumber },
    { key: 'principal', header: 'Principal', render: (l) => formatCurrency(l.principal) },
    {
      key: 'outstandingBalance',
      header: 'Outstanding',
      render: (l) => formatCurrency(l.outstandingBalance),
    },
    { key: 'status', header: 'Status', render: (l) => l.status },
    { key: 'appliedAt', header: 'Applied', render: (l) => formatDate(l.appliedAt) },
    {
      key: 'actions',
      header: 'Actions',
      render: (l) =>
        l.status === 'pending' ? (
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={`Approve loan ${l.loanNumber}`}
              onClick={() => approveLoan.mutate(l.id)}
              disabled={approveLoan.isPending}
              className="rounded-[var(--radius-sm)] p-1.5 text-[var(--color-success)] hover:bg-[var(--color-surface-secondary)] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={`Reject loan ${l.loanNumber}`}
              onClick={() => rejectLoan.mutate({ id: l.id, reason: 'Rejected by staff' })}
              disabled={rejectLoan.isPending}
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
      <PageHeader
        title="Loans"
        description="Loan applications and active loans."
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <FilePlus className="h-4 w-4" aria-hidden="true" />
            New Application
          </Button>
        }
      />
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

      <LoanApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LoansPage;
