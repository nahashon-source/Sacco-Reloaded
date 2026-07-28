import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useMembers } from '@/features/members';
import type { Member } from '@/features/members';
import { useBranches } from '@/features/branches';
import { MemberFormModal } from '@/features/members/components/MemberFormModal';
import { formatDate } from '@/utils/helpers';

const MembersPage = () => {
  const navigate = useNavigate();
  const [branchFilter, setBranchFilter] = useState<number | undefined>(undefined);
  const { data, isLoading, isError } = useMembers({ branchId: branchFilter });
  const { data: branchesData } = useBranches();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: DataTableColumn<Member>[] = [
    {
      key: 'memberNumber',
      header: 'Member #',
      render: (m) => (
        <button
          type="button"
          onClick={() => navigate(`/members/${m.id}`)}
          className="font-medium text-[var(--color-primary)] hover:underline"
        >
          {m.memberNumber}
        </button>
      ),
    },
    { key: 'fullName', header: 'Name', render: (m) => m.fullName },
    { key: 'email', header: 'Email', render: (m) => m.email },
    { key: 'phoneNumber', header: 'Phone', render: (m) => m.phoneNumber },
    { key: 'status', header: 'Status', render: (m) => m.status },
    { key: 'kycStatus', header: 'KYC', render: (m) => m.kycStatus },
    { key: 'joinedAt', header: 'Joined', render: (m) => formatDate(m.joinedAt) },
  ];

  return (
    <div>
      <PageHeader
        title="Members"
        description="All registered SACCO members."
        action={
          <div className="flex items-center gap-3">
            <select
              value={branchFilter ?? ''}
              onChange={(e) => setBranchFilter(e.target.value ? Number(e.target.value) : undefined)}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              <option value="">All branches</option>
              {branchesData?.items.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            <Button onClick={() => setIsModalOpen(true)}>
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Add Member
            </Button>
          </div>
        }
      />
      <Card>
        <DataTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(m) => m.id}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="No members yet."
        />
      </Card>

      <MemberFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default MembersPage;
