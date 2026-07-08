import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { notificationsApi } from '@/features/notifications/api';
import type { NotificationListParams } from '@/features/notifications/types';

const notificationsKeys = {
  all: ['notifications'] as const,
  list: (params: NotificationListParams) => [...notificationsKeys.all, 'list', params] as const,
};

export const useNotifications = (params: NotificationListParams = {}) =>
  useQuery({
    queryKey: notificationsKeys.list(params),
    queryFn: () => notificationsApi.list(params),
  });

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => notificationsApi.markAsRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationsKeys.all }),
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationsKeys.all }),
  });
};
