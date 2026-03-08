'use client';

import { Application, ApplicationStatus } from '@/lib/types';
import { Send, Briefcase, Award, XCircle, CheckCircle } from 'lucide-react';

interface StatusProgressionProps {
  application: Application;
}

export const StatusProgression = ({ application }: StatusProgressionProps) => {
  const statuses: Array<{ value: ApplicationStatus; label: string; icon: any }> = [
    { value: 'applied', label: 'Applied', icon: Send },
    { value: 'interviewing', label: 'Interview', icon: Briefcase },
    { value: 'offer', label: 'Offer', icon: Award },
    { value: 'accepted', label: 'Accepted', icon: CheckCircle },
  ];

  const currentIndex = statuses.findIndex(s => s.value === application.status);
  const isRejected = application.status === 'rejected';

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {statuses.map((status, index) => {
        const Icon = status.icon;
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex && !isRejected;
        const isDisabled = index > currentIndex || isRejected;

        return (
          <div key={status.value} className="flex items-center gap-1 sm:gap-2">
            <div
              className={`flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                isRejected
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200'
                  : isCompleted
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200'
                  : isCurrent
                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-200 ring-2 ring-amber-400 dark:ring-amber-500'
                  : 'bg-gray-100 text-gray-400 dark:bg-slate-700 dark:text-gray-500'
              }`}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            {index < statuses.length - 1 && (
              <div
                className={`h-0.5 w-3 sm:w-4 transition-colors ${
                  isRejected
                    ? 'bg-red-200 dark:bg-red-800'
                    : isCompleted
                    ? 'bg-green-200 dark:bg-green-800'
                    : 'bg-gray-200 dark:bg-slate-600'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
