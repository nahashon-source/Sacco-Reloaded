import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { useOrganizationSettings, useUpdateOrganizationSettings } from '@/features/settings';

const SettingsPage = () => {
  const { data, isLoading } = useOrganizationSettings();
  const updateSettings = useUpdateOrganizationSettings();

  const [form, setForm] = useState({
    organizationName: '',
    registrationNumber: '',
    contactEmail: '',
    contactPhone: '',
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (isLoading) return <Loader fullScreen={false} />;

  return (
    <div>
      <PageHeader title="Settings" description="Organization profile and configuration." />
      <Card>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateSettings.mutate(form);
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <Input
              id="organizationName"
              label="Organization name"
              value={form.organizationName}
              onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
            />
            <Input
              id="registrationNumber"
              label="Registration number"
              value={form.registrationNumber}
              onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
            />
            <Input
              id="contactEmail"
              label="Contact email"
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
            />
            <Input
              id="contactPhone"
              label="Contact phone"
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
            />
            <div className="sm:col-span-2">
              <Button type="submit" isLoading={updateSettings.isPending}>
                Save changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
