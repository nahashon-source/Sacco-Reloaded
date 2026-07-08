import { useEffect, useState } from 'react';

import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useSavingsDeposit, useSavingsWithdrawal } from '@/features/savings';

interface SavingsTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: number | null;
  accountNumber: string | null;
  mode: 'deposit' | 'withdraw';
}

export const SavingsTransactionModal = ({
  isOpen,
  onClose,
  accountId,
  accountNumber,
  mode,
}: SavingsTransactionModalProps) => {
  const deposit = useSavingsDeposit(accountId ?? 0);
  const withdraw = useSavingsWithdrawal(accountId ?? 0);
  const mutation = mode === 'deposit' ? deposit : withdraw;

  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setReason('');
      setTouched(false);
    }
  }, [isOpen]);

  const parsedAmount = Number(amount);
  const isAmountInvalid = touched && (!amount || parsedAmount <= 0);
  const isReasonInvalid = touched && mode === 'withdraw' && reason.trim().length < 3;

  const handleSubmit = async () => {
    setTouched(true);
    if (!amount || parsedAmount <= 0 || accountId === null) return;
    if (mode === 'withdraw' && reason.trim().length < 3) return;

    if (mode === 'deposit') {
      await deposit.mutateAsync({ amount: parsedAmount });
    } else {
      await withdraw.mutateAsync({ amount: parsedAmount, reason: reason.trim() });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${mode === 'deposit' ? 'Deposit to' : 'Withdraw from'} ${accountNumber ?? 'account'}`}
    >
      <div className="space-y-4">
        <Input
          id="amount"
          label="Amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={() => setTouched(true)}
          error={isAmountInvalid ? 'Enter an amount greater than 0' : undefined}
        />

        {mode === 'withdraw' && (
          <Input
            id="reason"
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onBlur={() => setTouched(true)}
            error={isReasonInvalid ? 'Reason must be at least 3 characters' : undefined}
          />
        )}

        {mutation.isError && (
          <p role="alert" className="text-sm text-[var(--color-danger)]">
            {mutation.error instanceof Error
              ? mutation.error.message
              : `Failed to ${mode === 'deposit' ? 'deposit' : 'withdraw'}.`}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} isLoading={mutation.isPending}>
            Confirm {mode === 'deposit' ? 'deposit' : 'withdrawal'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
