import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { createMemberSchema, type CreateMemberFormValues } from '@/features/members/schema';
import { useCreateMember } from '@/features/members';

interface MemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemberFormModal = ({ isOpen, onClose }: MemberFormModalProps) => {
  const createMember = useCreateMember();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateMemberFormValues>({ resolver: zodResolver(createMemberSchema) });

  // Reset form state whenever the modal is reopened, so stale errors/values
  // from a previous session don't leak in.
  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (values: CreateMemberFormValues) => {
    await createMember.mutateAsync(values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Member">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          id="fullName"
          label="Full name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id="phoneNumber"
          label="Phone number"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />

        {createMember.isError && (
          <p role="alert" className="text-sm text-[var(--color-danger)]">
            {createMember.error instanceof Error
              ? createMember.error.message
              : 'Failed to create member.'}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting || createMember.isPending}>
            Save member
          </Button>
        </div>
      </form>
    </Modal>
  );
};
