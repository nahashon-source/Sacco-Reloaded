import { z } from 'zod';

export const recordContributionSchema = z.object({
  memberId: z.number().positive('Select a member'),
  type: z.enum(['monthly', 'special', 'welfare']),
  amount: z.number().positive('Amount must be greater than 0'),
});

export type RecordContributionFormValues = z.infer<typeof recordContributionSchema>;
