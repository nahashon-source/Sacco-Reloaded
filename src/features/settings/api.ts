import { apiClient } from '@/api/axios';
import type { ApiResponse } from '@/types';
import type {
  OrganizationSettings,
  UpdateOrganizationSettingsPayload,
} from '@/features/settings/types';

export const settingsApi = {
  get: async (): Promise<OrganizationSettings> => {
    const { data } = await apiClient.get<ApiResponse<OrganizationSettings>>('/settings');
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  update: async (
    payload: UpdateOrganizationSettingsPayload
  ): Promise<OrganizationSettings> => {
    const { data } = await apiClient.patch<ApiResponse<OrganizationSettings>>(
      '/settings',
      payload
    );
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
};
