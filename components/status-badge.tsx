import { ApplicationStatus } from '@/lib/types';
import { APPLICATION_STATUSES } from '@/lib/constants';
import { Send, Briefcase, CheckCircle, XCircle, Award } from 'lucide-react';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const getStatusIcon = (status: ApplicationStatus) => {
  switch (status) {
    case 'applied':
      return Send;
    case 'interviewing':
      return Briefcase;
    case 'offer':
      return Award;
    case 'rejected':
      return XCircle;
    case 'accepted':
      return CheckCircle;
    default:
      return Send;
  }
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = APPLICATION_STATUSES.find((s) => s.value === status);
  const Icon = getStatusIcon(status);

  if (!statusConfig) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${statusConfig.color} shadow-sm`}>
      <Icon className="h-4 w-4" />
      {statusConfig.label}
    </span>
  );
};
