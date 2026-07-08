import { z } from 'zod';

export const createMemberSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  phoneNumber: z
    .string()
    .min(10, 'Enter a valid phone number')
    .regex(/^\+?[0-9]+$/, 'Phone number must contain only digits'),
});

export type CreateMemberFormValues = z.infer<typeof createMemberSchema>;
