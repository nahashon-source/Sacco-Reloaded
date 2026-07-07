import { Loader2 } from 'lucide-react';

interface LoaderProps {
  fullScreen?: boolean;
  label?: string;
}

export const Loader = ({ fullScreen = true, label = 'Loading…' }: LoaderProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullScreen
          ? 'flex h-screen w-full items-center justify-center bg-[var(--color-background)]'
          : 'flex items-center justify-center p-6'
      }
    >
      <Loader2 className="h-5 w-5 animate-spin text-[var(--color-primary)]" aria-hidden="true" />
      <span className="ml-2 text-sm text-[var(--color-text-secondary)]">{label}</span>
    </div>
  );
};
