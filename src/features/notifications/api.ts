import { apiClient } from '@/api/axios';
import type { ApiResponse, PaginatedData } from '@/types';
import type { Notification, NotificationListParams } from '@/features/notifications/types';

export const notificationsApi = {
  list: async (params: NotificationListParams): Promise<PaginatedData<Notification>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedData<Notification>>>(
      '/notifications',
      { params }
    );
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  markAsRead: async (id: number): Promise<Notification> => {
    const { data } = await apiClient.patch<ApiResponse<Notification>>(
      `/notifications/${id}/read`
    );
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  markAllAsRead: async (): Promise<void> => {
    const { data } = await apiClient.patch<ApiResponse<null>>('/notifications/read-all');
    if (!data.success) throw new Error(data.message);
  },
};
