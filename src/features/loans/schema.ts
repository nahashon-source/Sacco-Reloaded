import { z } from 'zod';

export const loanApplicationSchema = z.object({
  memberId: z.number().positive('Select a member'),
  principal: z.number().positive('Principal must be greater than 0'),
  termMonths: z.number().int().positive('Term must be at least 1 month'),
  purpose: z.string().min(5, 'Describe the purpose of the loan'),
});

export type LoanApplicationFormValues = z.infer<typeof loanApplicationSchema>;
