import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { settingsApi } from '@/features/settings/api';
import type { UpdateOrganizationSettingsPayload } from '@/features/settings/types';

const settingsKeys = { all: ['settings'] as const };

export const useOrganizationSettings = () =>
  useQuery({
    queryKey: settingsKeys.all,
    queryFn: () => settingsApi.get(),
  });

export const useUpdateOrganizationSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateOrganizationSettingsPayload) => settingsApi.update(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: settingsKeys.all }),
  });
};
