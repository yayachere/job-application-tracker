'use client';

import { Application, ApplicationStatus } from '@/lib/types';
import { ApplicationCard } from './application-card';
import { Empty } from '@/components/ui/empty';
import { Card } from '@/components/ui/card';
import { Briefcase, CheckCircle2, TrendingUp } from 'lucide-react';

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
      <div className="space-y-6">
        <Empty
          title="No applications yet"
          description="Start your job search journey! Add your first application to begin tracking your progress."
        />

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Why track your applications?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-blue-50 dark:bg-slate-800 dark:border-slate-700 border-blue-200">
              <div className="flex gap-3">
                <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Stay Organized
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Keep all your applications in one place
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-green-50 dark:bg-slate-800 dark:border-slate-700 border-green-200">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Track Progress
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Monitor status from application to offer
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-purple-50 dark:bg-slate-800 dark:border-slate-700 border-purple-200">
              <div className="flex gap-3">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Gain Insights
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    View analytics and success rates
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
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
