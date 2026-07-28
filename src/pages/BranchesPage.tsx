import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { useBranches } from '@/features/branches';
import type { Branch } from '@/features/branches';

const columns: DataTableColumn<Branch>[] = [
  { key: 'code', header: 'Code', render: (b) => b.code },
  { key: 'name', header: 'Name', render: (b) => b.name },
  { key: 'address', header: 'Address', render: (b) => b.address },
  { key: 'status', header: 'Status', render: (b) => b.status },
];

const BranchesPage = () => {
  const { data, isLoading, isError } = useBranches();

  return (
    <div>
      <PageHeader title="Branches" description="SACCO branch locations." />
      <Card>
        <DataTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(b) => b.id}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="No branches yet."
        />
      </Card>
    </div>
  );
};

export default BranchesPage;
