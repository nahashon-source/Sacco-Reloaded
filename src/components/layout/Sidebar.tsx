import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  PiggyBank,
  Landmark,
  HandCoins,
  ShieldCheck,
  Wallet,
  ArrowLeftRight,
  FileBarChart,
  Bell,
  Settings,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/savings', label: 'Savings', icon: PiggyBank },
  { to: '/shares', label: 'Shares', icon: Landmark },
  { to: '/loans', label: 'Loans', icon: HandCoins },
  { to: '/guarantors', label: 'Guarantors', icon: ShieldCheck },
  { to: '/contributions', label: 'Contributions', icon: Wallet },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/reports', label: 'Reports', icon: FileBarChart },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-60 shrink-0 overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-surface)]">
      <nav aria-label="Main navigation" className="p-4">
        <ul className="space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]'
                  }`
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
