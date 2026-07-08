export interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationListParams {
  page?: number;
  pageSize?: number;
  isRead?: boolean;
}
