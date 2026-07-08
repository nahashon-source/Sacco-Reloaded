import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
};
