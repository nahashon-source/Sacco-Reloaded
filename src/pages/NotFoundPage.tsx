import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[var(--color-background)] text-center">
      <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Page not found</h1>
      <p className="text-sm text-[var(--color-text-secondary)]">
        The page you're looking for doesn't exist.
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

export default NotFoundPage;
