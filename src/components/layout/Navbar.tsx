import { LogOut } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)] px-6">
      <span className="text-sm font-semibold text-[var(--color-text-primary)]">
        SACCO Management System
      </span>

      <div className="flex items-center gap-3">
        {user && (
          <span className="text-sm text-[var(--color-text-secondary)]">{user.fullName}</span>
        )}
        <button
          type="button"
          onClick={() => logout()}
          className="flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-1 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </header>
  );
};
