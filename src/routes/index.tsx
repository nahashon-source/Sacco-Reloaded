import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Loader } from '@/components/common/Loader';

const MainLayout = lazy(() => import('@/layouts/MainLayout').then((m) => ({ default: m.MainLayout })));
const AuthLayout = lazy(() => import('@/layouts/AuthLayout').then((m) => ({ default: m.AuthLayout })));

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const MembersPage = lazy(() => import('@/pages/MembersPage'));
const MemberDetailPage = lazy(() => import('@/pages/MemberDetailPage'));
const BranchesPage = lazy(() => import('@/pages/BranchesPage'));
const SavingsPage = lazy(() => import('@/pages/SavingsPage'));
const SharesPage = lazy(() => import('@/pages/SharesPage'));
const LoansPage = lazy(() => import('@/pages/LoansPage'));
const GuarantorsPage = lazy(() => import('@/pages/GuarantorsPage'));
const ContributionsPage = lazy(() => import('@/pages/ContributionsPage'));
const TransactionsPage = lazy(() => import('@/pages/TransactionsPage'));
const ReportsPage = lazy(() => import('@/pages/ReportsPage'));
const NotificationsPage = lazy(() => import('@/pages/NotificationsPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/members/:id" element={<MemberDetailPage />} />
          <Route path="/branches" element={<BranchesPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/shares" element={<SharesPage />} />
          <Route path="/loans" element={<LoansPage />} />
          <Route path="/guarantors" element={<GuarantorsPage />} />
          <Route path="/contributions" element={<ContributionsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
