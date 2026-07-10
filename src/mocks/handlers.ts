import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';
import {
  mockMembers,
  mockSavingsAccounts,
  mockShareAccounts,
  mockLoans,
  mockGuarantors,
  mockContributions,
  mockTransactions,
  mockNotifications,
  mockSettings,
} from '@/mocks/data';

const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data });

const paginated = <T>(items: T[]) => ({
  items,
  page: 1,
  pageSize: items.length,
  totalItems: items.length,
  totalPages: 1,
});

const base = env.apiBaseUrl;

export const handlers = [
  // Members
  http.get(`${base}/members`, () => ok(paginated(mockMembers))),
  http.post(`${base}/members`, async ({ request }) => {
    const body = (await request.json()) as { fullName: string; email: string; phoneNumber: string };
    const newMember = {
      id: mockMembers.length + 1,
      memberNumber: `MEM-${String(mockMembers.length + 1).padStart(4, '0')}`,
      ...body,
      status: 'active' as const,
      joinedAt: new Date().toISOString(),
    };
    mockMembers.push(newMember);
    return ok(newMember, 'Member created');
  }),

  // Savings
  http.get(`${base}/savings`, () => ok(paginated(mockSavingsAccounts))),
  http.post(`${base}/savings/:id/deposit`, async ({ params, request }) => {
    const account = mockSavingsAccounts.find((a) => a.id === Number(params.id));
    if (!account) return HttpResponse.json({ success: false, message: 'Account not found', data: null }, { status: 404 });
    const { amount } = (await request.json()) as { amount: number };
    account.balance += amount;
    return ok(account, 'Deposit successful');
  }),
  http.post(`${base}/savings/:id/withdraw`, async ({ params, request }) => {
    const account = mockSavingsAccounts.find((a) => a.id === Number(params.id));
    if (!account) return HttpResponse.json({ success: false, message: 'Account not found', data: null }, { status: 404 });
    const { amount } = (await request.json()) as { amount: number };
    account.balance = Math.max(0, account.balance - amount);
    return ok(account, 'Withdrawal successful');
  }),

  // Shares
  http.get(`${base}/shares`, () => ok(paginated(mockShareAccounts))),
  http.post(`${base}/shares/purchase`, async ({ request }) => {
    const body = (await request.json()) as { memberId: number; numberOfShares: number };
    const newShareAccount = {
      id: mockShareAccounts.length + 1,
      memberId: body.memberId,
      totalShares: body.numberOfShares,
      shareValue: 100,
      totalValue: body.numberOfShares * 100,
      purchasedAt: new Date().toISOString(),
    };
    mockShareAccounts.push(newShareAccount);
    return ok(newShareAccount, 'Shares purchased');
  }),

  // Loans
  http.get(`${base}/loans`, () => ok(paginated(mockLoans))),
  http.post(`${base}/loans`, async ({ request }) => {
    const body = (await request.json()) as {
      memberId: number;
      principal: number;
      termMonths: number;
    };
    const newLoan = {
      id: mockLoans.length + 1,
      loanNumber: `LN-${2000 + mockLoans.length + 1}`,
      memberId: body.memberId,
      principal: body.principal,
      interestRate: 12,
      termMonths: body.termMonths,
      outstandingBalance: body.principal,
      status: 'pending' as const,
      appliedAt: new Date().toISOString(),
      disbursedAt: null,
    };
    mockLoans.push(newLoan);
    return ok(newLoan, 'Loan application submitted');
  }),
  http.post(`${base}/loans/:id/approve`, ({ params }) => {
    const loan = mockLoans.find((l) => l.id === Number(params.id));
    if (!loan) return HttpResponse.json({ success: false, message: 'Loan not found', data: null }, { status: 404 });
    loan.status = 'approved';
    return ok(loan, 'Loan approved');
  }),
  http.post(`${base}/loans/:id/reject`, ({ params }) => {
    const loan = mockLoans.find((l) => l.id === Number(params.id));
    if (!loan) return HttpResponse.json({ success: false, message: 'Loan not found', data: null }, { status: 404 });
    loan.status = 'rejected';
    return ok(loan, 'Loan rejected');
  }),

  // Guarantors
  http.get(`${base}/guarantors`, () => ok(paginated(mockGuarantors))),
  http.post(`${base}/guarantors/:id/respond`, async ({ params, request }) => {
    const guarantor = mockGuarantors.find((g) => g.id === Number(params.id));
    if (!guarantor) return HttpResponse.json({ success: false, message: 'Guarantor request not found', data: null }, { status: 404 });
    const { accept } = (await request.json()) as { accept: boolean };
    guarantor.status = accept ? 'accepted' : 'declined';
    guarantor.respondedAt = new Date().toISOString();
    return ok(guarantor, 'Response recorded');
  }),

  // Contributions
  http.get(`${base}/contributions`, () => ok(paginated(mockContributions))),
  http.post(`${base}/contributions`, async ({ request }) => {
    const body = (await request.json()) as {
      memberId: number;
      type: 'monthly' | 'special' | 'welfare';
      amount: number;
    };
    const newContribution = {
      id: mockContributions.length + 1,
      ...body,
      contributedAt: new Date().toISOString(),
    };
    mockContributions.push(newContribution);
    return ok(newContribution, 'Contribution recorded');
  }),

  // Transactions (read-only)
  http.get(`${base}/transactions`, () => ok(paginated(mockTransactions))),

  // Notifications
  http.get(`${base}/notifications`, () => ok(paginated(mockNotifications))),
  http.patch(`${base}/notifications/:id/read`, ({ params }) => {
    const notification = mockNotifications.find((n) => n.id === Number(params.id));
    if (!notification) return HttpResponse.json({ success: false, message: 'Notification not found', data: null }, { status: 404 });
    notification.isRead = true;
    return ok(notification, 'Marked as read');
  }),
  http.patch(`${base}/notifications/read-all`, () => {
    mockNotifications.forEach((n) => (n.isRead = true));
    return ok(null, 'All marked as read');
  }),

  // Settings
  http.get(`${base}/settings`, () => ok(mockSettings)),
  http.patch(`${base}/settings`, async ({ request }) => {
    const body = await request.json();
    Object.assign(mockSettings, body as object);
    return ok(mockSettings, 'Settings updated');
  }),

  // Reports (returns a minimal shaped result — real aggregation logic
  // belongs entirely to the backend once it exists)
  http.get(`${base}/reports`, ({ request }) => {
    const url = new URL(request.url);
    return ok({
      type: url.searchParams.get('type'),
      generatedAt: new Date().toISOString(),
      data: { note: 'Mock report data — replace once backend reporting is implemented.' },
    });
  }),

  // Auth (minimal — enough to unblock the login form in mock mode)
  http.post(`${base}/auth/login`, () =>
    ok(
      {
        user: {
          id: 1,
          fullName: 'Demo Staff',
          email: 'staff@fitsacco.example.com',
          role: 'staff',
          permissions: [],
        },
        tokens: { accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' },
      },
      'Login successful'
    )
  ),
  http.get(`${base}/auth/me`, () =>
    ok({
      id: 1,
      fullName: 'Demo Staff',
      email: 'staff@fitsacco.example.com',
      role: 'staff',
      permissions: [],
    })
  ),
];
