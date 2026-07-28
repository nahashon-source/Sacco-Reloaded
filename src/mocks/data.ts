import type { Member } from '@/features/members';
import type { SavingsAccount } from '@/features/savings';
import type { ShareAccount } from '@/features/shares';
import type { Loan } from '@/features/loans';
import type { Guarantor } from '@/features/guarantors';
import type { Contribution } from '@/features/contributions';
import type { Transaction } from '@/features/transactions';
import type { Notification } from '@/features/notifications';
import type { OrganizationSettings } from '@/features/settings';

export const mockMembers: Member[] = [
  {
    id: 1,
    memberNumber: 'MEM-0001',
    fullName: 'Wanjiru Kamau',
    email: 'wanjiru.kamau@example.com',
    phoneNumber: '+254712345001',
    status: 'active',
    branchId: 1,
    kycStatus: 'verified',
    nextOfKin: { fullName: 'James Kamau', relationship: 'Spouse', phoneNumber: '+254712345101' },
    employment: { employerName: 'Freight in Time Ltd', jobTitle: 'Logistics Officer', monthlyIncome: 85000 },
    documents: [{ id: 1, documentType: 'national_id', fileName: 'wanjiru_id.pdf', uploadedAt: '2024-02-15T00:00:00Z' }],
    joinedAt: '2024-02-14T00:00:00Z',
  },
  {
    id: 2,
    memberNumber: 'MEM-0002',
    fullName: 'Otieno Odhiambo',
    email: 'otieno.odhiambo@example.com',
    phoneNumber: '+254712345002',
    status: 'active',
    branchId: 1,
    kycStatus: 'verified',
    nextOfKin: null,
    employment: null,
    documents: [],
    joinedAt: '2024-05-03T00:00:00Z',
  },
  {
    id: 3,
    memberNumber: 'MEM-0003',
    fullName: 'Achieng Njoroge',
    email: 'achieng.njoroge@example.com',
    phoneNumber: '+254712345003',
    status: 'inactive',
    branchId: 1,
    kycStatus: 'pending',
    nextOfKin: null,
    employment: null,
    documents: [],
    joinedAt: '2023-11-20T00:00:00Z',
  },
  {
    id: 4,
    memberNumber: 'MEM-0004',
    fullName: 'Mutiso Kiplagat',
    email: 'mutiso.kiplagat@example.com',
    phoneNumber: '+254712345004',
    status: 'active',
    branchId: 2,
    kycStatus: 'verified',
    nextOfKin: { fullName: 'Grace Kiplagat', relationship: 'Sister', phoneNumber: '+254712345104' },
    employment: null,
    documents: [],
    joinedAt: '2025-01-09T00:00:00Z',
  },
];

export const mockSavingsAccounts: SavingsAccount[] = [
  {
    id: 1,
    memberId: 1,
    accountNumber: 'SAV-1001',
    accountType: 'regular',
    balance: 84500,
    status: 'active',
    openedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 2,
    memberId: 2,
    accountNumber: 'SAV-1002',
    accountType: 'fixed_deposit',
    balance: 250000,
    status: 'active',
    openedAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 3,
    memberId: 3,
    accountNumber: 'SAV-1003',
    accountType: 'regular',
    balance: 12300,
    status: 'dormant',
    openedAt: '2023-12-01T00:00:00Z',
  },
];

export const mockShareAccounts: ShareAccount[] = [
  {
    id: 1,
    memberId: 1,
    totalShares: 500,
    shareValue: 100,
    totalValue: 50000,
    purchasedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 2,
    memberId: 2,
    totalShares: 1200,
    shareValue: 100,
    totalValue: 120000,
    purchasedAt: '2024-06-10T00:00:00Z',
  },
];

export const mockLoans: Loan[] = [
  {
    id: 1,
    loanNumber: 'LN-2001',
    memberId: 1,
    principal: 100000,
    interestRate: 12,
    termMonths: 12,
    outstandingBalance: 75000,
    status: 'disbursed',
    appliedAt: '2025-01-10T00:00:00Z',
    disbursedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 2,
    loanNumber: 'LN-2002',
    memberId: 2,
    principal: 50000,
    interestRate: 12,
    termMonths: 6,
    outstandingBalance: 50000,
    status: 'pending',
    appliedAt: '2026-06-20T00:00:00Z',
    disbursedAt: null,
  },
  {
    id: 3,
    loanNumber: 'LN-2003',
    memberId: 4,
    principal: 200000,
    interestRate: 14,
    termMonths: 24,
    outstandingBalance: 200000,
    status: 'pending',
    appliedAt: '2026-07-01T00:00:00Z',
    disbursedAt: null,
  },
];

export const mockGuarantors: Guarantor[] = [
  {
    id: 1,
    loanId: 1,
    memberId: 2,
    guaranteedAmount: 40000,
    status: 'accepted',
    respondedAt: '2025-01-12T00:00:00Z',
  },
  {
    id: 2,
    loanId: 2,
    memberId: 3,
    guaranteedAmount: 25000,
    status: 'pending',
    respondedAt: null,
  },
];

export const mockContributions: Contribution[] = [
  { id: 1, memberId: 1, type: 'monthly', amount: 2000, contributedAt: '2026-06-01T00:00:00Z' },
  { id: 2, memberId: 2, type: 'monthly', amount: 2000, contributedAt: '2026-06-01T00:00:00Z' },
  { id: 3, memberId: 1, type: 'welfare', amount: 500, contributedAt: '2026-06-15T00:00:00Z' },
];

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    memberId: 1,
    type: 'deposit',
    amount: 5000,
    status: 'completed',
    reference: 'TXN-9001',
    createdAt: '2026-06-01T00:00:00Z',
  },
  {
    id: 2,
    memberId: 2,
    type: 'loan_disbursement',
    amount: 50000,
    status: 'completed',
    reference: 'TXN-9002',
    createdAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 3,
    memberId: 1,
    type: 'contribution',
    amount: 2000,
    status: 'completed',
    reference: 'TXN-9003',
    createdAt: '2026-06-01T00:00:00Z',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Loan application received',
    message: 'Your loan application LN-2002 has been received and is under review.',
    isRead: false,
    createdAt: '2026-06-20T00:00:00Z',
  },
  {
    id: 2,
    title: 'Contribution recorded',
    message: 'Your monthly contribution of KES 2,000 has been recorded.',
    isRead: true,
    createdAt: '2026-06-01T00:00:00Z',
  },
];

export const mockSettings: OrganizationSettings = {
  organizationName: 'Freight in Time SACCO',
  registrationNumber: 'SACCO-KE-4471',
  contactEmail: 'info@fitsacco.example.com',
  contactPhone: '+254700123456',
};
