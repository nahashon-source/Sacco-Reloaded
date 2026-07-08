import { useEffect, useState } from 'react';

import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useRejectLoan } from '@/features/loans';

interface RejectLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanId: number | null;
  loanNumber: string | null;
}

export const RejectLoanModal = ({ isOpen, onClose, loanId, loanNumber }: RejectLoanModalProps) => {
  const rejectLoan = useRejectLoan();
  const [reason, setReason] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setReason('');
      setTouched(false);
    }
  }, [isOpen]);

  const trimmedReason = reason.trim();
  const isInvalid = touched && trimmedReason.length < 5;

  const handleSubmit = async () => {
    setTouched(true);
    if (trimmedReason.length < 5 || loanId === null) return;

    await rejectLoan.mutateAsync({ id: loanId, reason: trimmedReason });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reject Loan ${loanNumber ?? ''}`}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="reject-reason"
            className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]"
          >
            Reason for rejection
          </label>
          <textarea
            id="reject-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? 'reject-reason-error' : undefined}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          />
          {isInvalid && (
            <p id="reject-reason-error" className="mt-1 text-xs text-[var(--color-danger)]">
              Reason must be at least 5 characters.
            </p>
          )}
        </div>

        {rejectLoan.isError && (
          <p role="alert" className="text-sm text-[var(--color-danger)]">
            {rejectLoan.error instanceof Error ? rejectLoan.error.message : 'Failed to reject loan.'}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmit} isLoading={rejectLoan.isPending}>
            Confirm rejection
          </Button>
        </div>
      </div>
    </Modal>
  );
};
