import { PageHeader } from '@/components/common/PageHeader';
import { DataTable, type DataTableColumn } from '@/components/common/DataTable';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  useNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from '@/features/notifications';
import type { Notification } from '@/features/notifications';
import { formatDate } from '@/utils/helpers';

const NotificationsPage = () => {
  const { data, isLoading, isError } = useNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();

  const columns: DataTableColumn<Notification>[] = [
    { key: 'title', header: 'Title', render: (n) => n.title },
    { key: 'message', header: 'Message', render: (n) => n.message },
    { key: 'isRead', header: 'Read', render: (n) => (n.isRead ? 'Yes' : 'No') },
    { key: 'createdAt', header: 'Date', render: (n) => formatDate(n.createdAt) },
    {
      key: 'actions',
      header: 'Actions',
      render: (n) =>
        n.isRead ? (
          <span className="text-[var(--color-text-secondary)]">—</span>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => markAsRead.mutate(n.id)}
            isLoading={markAsRead.isPending && markAsRead.variables === n.id}
          >
            Mark as read
          </Button>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="System and account notifications."
        action={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => markAllAsRead.mutate()}
            isLoading={markAllAsRead.isPending}
          >
            Mark all as read
          </Button>
        }
      />
      <Card>
        <DataTable
          columns={columns}
          rows={data?.items ?? []}
          rowKey={(n) => n.id}
          isLoading={isLoading}
          isError={isError}
          emptyMessage="No notifications."
        />
      </Card>
    </div>
  );
};

export default NotificationsPage;
