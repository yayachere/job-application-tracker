'use client';

import { Application, ApplicationStatus } from '@/lib/types';
import { ApplicationCard } from './application-card';
import { Empty } from '@/components/ui/empty';

interface ApplicationListProps {
  applications: Application[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export const ApplicationList = ({
  applications,
  onDelete,
  onStatusChange,
}: ApplicationListProps) => {
  if (applications.length === 0) {
    return (
      <Empty
        icon="📝"
        title="No applications yet"
        description="Start tracking your job applications by adding one above."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
