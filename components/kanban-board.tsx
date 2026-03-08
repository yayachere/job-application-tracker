'use client';

import { Application, ApplicationStatus } from '@/lib/types';
import { APPLICATION_STATUSES } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface KanbanBoardProps {
  applications: Application[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export const KanbanBoard = ({
  applications,
  onDelete,
  onStatusChange,
}: KanbanBoardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-50 dark:bg-slate-800 border-blue-200 dark:border-slate-700';
      case 'interviewing':
        return 'bg-amber-50 dark:bg-slate-800 border-amber-200 dark:border-slate-700';
      case 'offer':
        return 'bg-green-50 dark:bg-slate-800 border-green-200 dark:border-slate-700';
      case 'rejected':
        return 'bg-red-50 dark:bg-slate-800 border-red-200 dark:border-slate-700';
      default:
        return 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700';
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-max">
        {APPLICATION_STATUSES.map((statusConfig) => {
          const statusApps = applications.filter(
            (app) => app.status === statusConfig.value
          );

          return (
            <div key={statusConfig.value} className="w-80 flex-shrink-0">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {statusConfig.label}
                  </h3>
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-slate-700 text-xs font-semibold text-gray-900 dark:text-white">
                    {statusApps.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {statusApps.length} application{statusApps.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className={`space-y-3 p-4 rounded-lg min-h-96 border-2 ${getStatusColor(statusConfig.value)}`}>
                {statusApps.length === 0 ? (
                  <div className="text-center py-12 flex items-center justify-center h-full">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No applications</p>
                  </div>
                ) : (
                  statusApps.map((app) => (
                    <Card key={app.id} className="bg-white dark:bg-slate-900 dark:border-slate-700 p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-move">
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                            {app.role}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-0.5">
                            {app.company}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded w-fit">
                          {app.platform}
                        </div>
                        {app.notes && (
                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 italic">
                            {app.notes}
                          </p>
                        )}
                        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                          <button
                            onClick={() => onDelete(app.id)}
                            className="flex-1 px-2 py-1.5 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center justify-center gap-1"
                            title="Delete application"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
