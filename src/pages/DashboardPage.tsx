import { Users, PiggyBank, HandCoins, Wallet } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';
import { useMembers } from '@/features/members';
import { useSavingsAccounts } from '@/features/savings';
import { useLoans } from '@/features/loans';
import { useContributions } from '@/features/contributions';
import { formatCurrency } from '@/utils/helpers';

interface SummaryCardProps {
  label: string;
  value: string;
  icon: typeof Users;
  isLoading: boolean;
}

const SummaryCard = ({ label, value, icon: Icon, isLoading }: SummaryCardProps) => (
  <Card>
    <CardContent className="flex items-center gap-4">
      <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] p-3">
        <Icon className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
        <p className="text-xl font-semibold text-[var(--color-text-primary)]">
          {isLoading ? '—' : value}
        </p>
      </div>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const members = useMembers();
  const savings = useSavingsAccounts();
  const loans = useLoans();
  const contributions = useContributions();

  const totalSavingsBalance =
    savings.data?.items.reduce((sum, account) => sum + account.balance, 0) ?? 0;

  const totalOutstandingLoans =
    loans.data?.items.reduce((sum, loan) => sum + loan.outstandingBalance, 0) ?? 0;

  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold text-[var(--color-text-primary)]">Dashboard</h1>
      <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
        Overview of members, savings, loans, and contributions.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Total Members"
          value={String(members.data?.totalItems ?? 0)}
          icon={Users}
          isLoading={members.isLoading}
        />
        <SummaryCard
          label="Total Savings Balance"
          value={formatCurrency(totalSavingsBalance)}
          icon={PiggyBank}
          isLoading={savings.isLoading}
        />
        <SummaryCard
          label="Outstanding Loans"
          value={formatCurrency(totalOutstandingLoans)}
          icon={HandCoins}
          isLoading={loans.isLoading}
        />
        <SummaryCard
          label="Total Contributions"
          value={String(contributions.data?.totalItems ?? 0)}
          icon={Wallet}
          isLoading={contributions.isLoading}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
