import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  recordContributionSchema,
  type RecordContributionFormValues,
} from '@/features/contributions/schema';
import { useRecordContribution } from '@/features/contributions';
import { useMembers } from '@/features/members';

interface RecordContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contributionTypes = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'special', label: 'Special' },
  { value: 'welfare', label: 'Welfare' },
] as const;

export const RecordContributionModal = ({ isOpen, onClose }: RecordContributionModalProps) => {
  const recordContribution = useRecordContribution();
  const { data: membersData, isLoading: isMembersLoading } = useMembers();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecordContributionFormValues>({
    resolver: zodResolver(recordContributionSchema),
    defaultValues: { type: 'monthly' },
  });

  useEffect(() => {
    if (isOpen) reset({ type: 'monthly' });
  }, [isOpen, reset]);

  const onSubmit = async (values: RecordContributionFormValues) => {
    await recordContribution.mutateAsync(values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Contribution">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="memberId"
            className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]"
          >
            Member
          </label>
          <Controller
            name="memberId"
            control={control}
            render={({ field }) => (
              <select
                id="memberId"
                disabled={isMembersLoading}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
                aria-invalid={Boolean(errors.memberId)}
                aria-describedby={errors.memberId ? 'memberId-error' : undefined}
                className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              >
                <option value="" disabled>
                  {isMembersLoading ? 'Loading members…' : 'Select a member'}
                </option>
                {membersData?.items.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.fullName} ({member.memberNumber})
                  </option>
                ))}
              </select>
            )}
          />
          {errors.memberId && (
            <p id="memberId-error" className="mt-1 text-xs text-[var(--color-danger)]">
              {errors.memberId.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="type"
            className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]"
          >
            Contribution type
          </label>
          <select
            id="type"
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            {...register('type')}
          >
            {contributionTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <Input
          id="amount"
          label="Amount"
          type="number"
          step="0.01"
          error={errors.amount?.message}
          {...register('amount', { valueAsNumber: true })}
        />

        {recordContribution.isError && (
          <p role="alert" className="text-sm text-[var(--color-danger)]">
            {recordContribution.error instanceof Error
              ? recordContribution.error.message
              : 'Failed to record contribution.'}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting || recordContribution.isPending}>
            Record contribution
          </Button>
        </div>
      </form>
    </Modal>
  );
};
