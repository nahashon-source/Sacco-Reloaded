import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[var(--color-background)] text-center">
      <ShieldAlert className="h-8 w-8 text-[var(--color-warning)]" aria-hidden="true" />
      <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Access denied</h1>
      <p className="text-sm text-[var(--color-text-secondary)]">
        You don't have permission to view this page.
      </p>
      <Link
        to="/"
        className="mt-2 text-sm font-medium text-[var(--color-primary)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      >
        Go to dashboard
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
