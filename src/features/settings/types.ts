export interface OrganizationSettings {
  organizationName: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
}

export interface UpdateOrganizationSettingsPayload extends Partial<OrganizationSettings> {}
