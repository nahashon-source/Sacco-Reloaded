import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useMembers } from '@/features/members';
import type { Member } from '@/features/members';
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

  return (
    <div>
      <PageHeader title="Members" description="All registered SACCO members." />
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
    </div>
  );
};

export default MembersPage;
