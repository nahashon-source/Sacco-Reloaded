import { useState } from 'react';
import { UserPlus } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useMembers } from '@/features/members';
import type { Member } from '@/features/members';
import { MemberFormModal } from '@/features/members/components/MemberFormModal';
import { formatDate } from '@/utils/helpers';

const columns: DataTableColumn<Member>[] = [
  { key: 'memberNumber', header: 'Member #', render: (m) => m.memberNumber },
  { key: 'fullName', header: 'Name', render: (m) => m.fullName },
  { key: 'email', header: 'Email', render: (m) => m.email },
  { key: 'phoneNumber', header: 'Phone', render: (m) => m.phoneNumber },
  { key: 'status', header: 'Status', render: (m) => m.status },
  { key: 'joinedAt', header: 'Joined', render: (m) => formatDate(m.joinedAt) },
];

const MembersPage = () => {
  const { data, isLoading, isError } = useMembers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Members"
        description="All registered SACCO members."
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Add Member
          </Button>
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
