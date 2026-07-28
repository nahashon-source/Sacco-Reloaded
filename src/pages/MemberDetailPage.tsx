import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, UploadCloud } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { useMember, useUpdateNextOfKin, useUpdateEmployment } from '@/features/members';
import { formatCurrency, formatDate } from '@/utils/helpers';

const KYC_BADGE_STYLES: Record<string, string> = {
  verified: 'bg-green-50 text-[var(--color-success)]',
  pending: 'bg-amber-50 text-[var(--color-warning)]',
  rejected: 'bg-red-50 text-[var(--color-danger)]',
};

const MemberDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const memberId = Number(id);

  const { data: member, isLoading, isError } = useMember(memberId);
  const updateNextOfKin = useUpdateNextOfKin(memberId);
  const updateEmployment = useUpdateEmployment(memberId);

  const [kinForm, setKinForm] = useState({ fullName: '', relationship: '', phoneNumber: '' });
  const [empForm, setEmpForm] = useState({ employerName: '', jobTitle: '', monthlyIncome: 0 });

  useEffect(() => {
    if (member?.nextOfKin) setKinForm(member.nextOfKin);
    if (member?.employment) setEmpForm(member.employment);
  }, [member]);

  if (isLoading) return <Loader fullScreen={false} />;

  if (isError || !member) {
    return (
      <div className="text-sm text-[var(--color-danger)]">Member not found.</div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate('/members')}
        className="mb-4 flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Members
      </button>

      <PageHeader
        title={member.fullName}
        description={`${member.memberNumber} · Joined ${formatDate(member.joinedAt)}`}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Email</span>
              <span className="text-[var(--color-text-primary)]">{member.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Phone</span>
              <span className="text-[var(--color-text-primary)]">{member.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">Status</span>
              <span className="text-[var(--color-text-primary)]">{member.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--color-text-secondary)]">KYC Status</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${KYC_BADGE_STYLES[member.kycStatus]}`}
              >
                {member.kycStatus}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {member.documents.length === 0 ? (
              <p className="text-sm text-[var(--color-text-secondary)]">No documents on file.</p>
            ) : (
              <ul className="space-y-2">
                {member.documents.map((doc) => (
                  <li key={doc.id} className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-[var(--color-text-secondary)]" />
                    <span className="text-[var(--color-text-primary)]">{doc.fileName}</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      ({doc.documentType}, {formatDate(doc.uploadedAt)})
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <Button variant="secondary" size="sm" className="mt-4" disabled>
              <UploadCloud className="h-4 w-4" />
              Upload document
            </Button>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Upload is disabled until file storage (e.g. Cloudinary/S3) is wired up on the backend.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next of Kin</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateNextOfKin.mutate(kinForm);
              }}
              className="space-y-3"
            >
              <Input
                id="kin-name"
                label="Full name"
                value={kinForm.fullName}
                onChange={(e) => setKinForm({ ...kinForm, fullName: e.target.value })}
              />
              <Input
                id="kin-relationship"
                label="Relationship"
                value={kinForm.relationship}
                onChange={(e) => setKinForm({ ...kinForm, relationship: e.target.value })}
              />
              <Input
                id="kin-phone"
                label="Phone number"
                value={kinForm.phoneNumber}
                onChange={(e) => setKinForm({ ...kinForm, phoneNumber: e.target.value })}
              />
              <Button type="submit" size="sm" isLoading={updateNextOfKin.isPending}>
                Save
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateEmployment.mutate(empForm);
              }}
              className="space-y-3"
            >
              <Input
                id="emp-employer"
                label="Employer name"
                value={empForm.employerName}
                onChange={(e) => setEmpForm({ ...empForm, employerName: e.target.value })}
              />
              <Input
                id="emp-title"
                label="Job title"
                value={empForm.jobTitle}
                onChange={(e) => setEmpForm({ ...empForm, jobTitle: e.target.value })}
              />
              <Input
                id="emp-income"
                label="Monthly income"
                type="number"
                value={empForm.monthlyIncome}
                onChange={(e) => setEmpForm({ ...empForm, monthlyIncome: Number(e.target.value) })}
              />
              <Button type="submit" size="sm" isLoading={updateEmployment.isPending}>
                Save
              </Button>
              {empForm.monthlyIncome > 0 && (
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Current: {formatCurrency(empForm.monthlyIncome)}/month
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberDetailPage;
