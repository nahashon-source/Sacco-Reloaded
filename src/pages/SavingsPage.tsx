import { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useSavingsAccounts } from '@/features/savings';
import type { SavingsAccount } from '@/features/savings';
import { SavingsTransactionModal } from '@/features/savings/components/SavingsTransactionModal';
import { formatCurrency, formatDate } from '@/utils/helpers';

const SavingsPage = () => {
  const { data, isLoading, isError } = useSavingsAccounts();
  const [txTarget, setTxTarget] = useState<{
    id: number;
    accountNumber: string;
    mode: 'deposit' | 'withdraw';
  } | null>(null);

  const columns: DataTableColumn<SavingsAccount>[] = [
    { key: 'accountNumber', header: 'Account #', render: (a) => a.accountNumber },
    { key: 'accountType', header: 'Type', render: (a) => a.accountType.replace('_', ' ') },
    { key: 'balance', header: 'Balance', render: (a) => formatCurrency(a.balance) },
    { key: 'status', header: 'Status', render: (a) => a.status },
    { key: 'openedAt', header: 'Opened', render: (a) => formatDate(a.openedAt) },
    {
      key: 'actions',
      header: 'Actions',
      render: (a) => (
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={`Deposit to ${a.accountNumber}`}
            onClick={() =>
              setTxTarget({ id: a.id, accountNumber: a.accountNumber, mode: 'deposit' })
            }
            className="rounded-[var(--radius-sm)] p-1.5 text-[var(--color-success)] hover:bg-[var(--color-surface-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            <ArrowDownCircle className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={`Withdraw from ${a.accountNumber}`}
            onClick={() =>
              setTxTarget({ id: a.id, accountNumber: a.accountNumber, mode: 'withdraw' })
            }
            className="rounded-[var(--radius-sm)] p-1.5 text-[var(--color-warning)] hover:bg-[var(--color-surface-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            <ArrowUpCircle className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

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

      <SavingsTransactionModal
        isOpen={txTarget !== null}
        onClose={() => setTxTarget(null)}
        accountId={txTarget?.id ?? null}
        accountNumber={txTarget?.accountNumber ?? null}
        mode={txTarget?.mode ?? 'deposit'}
      />
    </div>
  );
};

export default SavingsPage;
