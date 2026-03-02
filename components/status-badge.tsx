import { ApplicationStatus } from '@/lib/types';
import { APPLICATION_STATUSES } from '@/lib/constants';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = APPLICATION_STATUSES.find((s) => s.value === status);

  if (!statusConfig) return null;

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
      {statusConfig.label}
    </span>
  );
};
