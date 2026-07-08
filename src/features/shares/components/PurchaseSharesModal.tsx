import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { purchaseSharesSchema, type PurchaseSharesFormValues } from '@/features/shares/schema';
import { usePurchaseShares } from '@/features/shares';
import { useMembers } from '@/features/members';

interface PurchaseSharesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseSharesModal = ({ isOpen, onClose }: PurchaseSharesModalProps) => {
  const purchaseShares = usePurchaseShares();
  const { data: membersData, isLoading: isMembersLoading } = useMembers();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PurchaseSharesFormValues>({ resolver: zodResolver(purchaseSharesSchema) });

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (values: PurchaseSharesFormValues) => {
    await purchaseShares.mutateAsync(values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Purchase Shares">
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
          id="numberOfShares"
          label="Number of shares"
          type="number"
          error={errors.numberOfShares?.message}
          {...register('numberOfShares', { valueAsNumber: true })}
        />

        {purchaseShares.isError && (
          <p role="alert" className="text-sm text-[var(--color-danger)]">
            {purchaseShares.error instanceof Error
              ? purchaseShares.error.message
              : 'Failed to purchase shares.'}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting || purchaseShares.isPending}>
            Purchase
          </Button>
        </div>
      </form>
    </Modal>
  );
};
