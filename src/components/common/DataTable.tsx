import type { ReactNode } from 'react';
import { Loader2, Inbox, AlertTriangle } from 'lucide-react';

export interface DataTableColumn<T> {
  header: string;
  render: (row: T) => ReactNode;
  key: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  emptyMessage?: string;
}

export const DataTable = <T,>({
  columns,
  rows,
  rowKey,
  isLoading,
  isError,
  errorMessage = 'Failed to load data.',
  emptyMessage = 'No records found.',
}: DataTableProps<T>) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-sm text-[var(--color-text-secondary)]">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        Loading…
      </div>
    );
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-[var(--color-danger)]"
      >
        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        {errorMessage}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12 text-sm text-[var(--color-text-secondary)]">
        <Inbox className="h-6 w-6" aria-hidden="true" />
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-4 py-3 font-medium text-[var(--color-text-secondary)]"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-secondary)]"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-[var(--color-text-primary)]">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
