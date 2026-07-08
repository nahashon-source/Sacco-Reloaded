import { z } from 'zod';

export const purchaseSharesSchema = z.object({
  memberId: z.number().positive('Select a member'),
  numberOfShares: z.number().int().positive('Number of shares must be greater than 0'),
});

export type PurchaseSharesFormValues = z.infer<typeof purchaseSharesSchema>;
