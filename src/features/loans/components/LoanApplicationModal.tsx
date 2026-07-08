import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { loanApplicationSchema, type LoanApplicationFormValues } from '@/features/loans/schema';
import { useApplyForLoan } from '@/features/loans';
import { useMembers } from '@/features/members';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoanApplicationModal = ({ isOpen, onClose }: LoanApplicationModalProps) => {
  const applyForLoan = useApplyForLoan();
  const { data: membersData, isLoading: isMembersLoading } = useMembers();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoanApplicationFormValues>({ resolver: zodResolver(loanApplicationSchema) });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (values: LoanApplicationFormValues) => {
    await applyForLoan.mutateAsync(values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Loan Application">
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

        <Input
          id="principal"
          label="Principal amount"
          type="number"
          step="0.01"
          error={errors.principal?.message}
          {...register('principal', { valueAsNumber: true })}
        />

        <Input
          id="termMonths"
          label="Term (months)"
          type="number"
          error={errors.termMonths?.message}
          {...register('termMonths', { valueAsNumber: true })}
        />

        <div>
          <label
            htmlFor="purpose"
            className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]"
          >
            Purpose
          </label>
          <textarea
            id="purpose"
            rows={3}
            aria-invalid={Boolean(errors.purpose)}
            aria-describedby={errors.purpose ? 'purpose-error' : undefined}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            {...register('purpose')}
          />
          {errors.purpose && (
            <p id="purpose-error" className="mt-1 text-xs text-[var(--color-danger)]">
              {errors.purpose.message}
            </p>
          )}
        </div>

        {applyForLoan.isError && (
          <p role="alert" className="text-sm text-[var(--color-danger)]">
            {applyForLoan.error instanceof Error
              ? applyForLoan.error.message
              : 'Failed to submit loan application.'}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting || applyForLoan.isPending}>
            Submit application
          </Button>
        </div>
      </form>
    </Modal>
  );
};
