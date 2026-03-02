'use client';

import { Application, ApplicationStatus } from '@/lib/types';
import { APPLICATION_STATUSES } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { ApplicationCard } from './application-card';

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
                <h3 className="font-semibold text-gray-900">{statusConfig.label}</h3>
                <p className="text-sm text-gray-600">
                  {statusApps.length} application{statusApps.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="space-y-3 bg-gray-100 p-4 rounded-lg min-h-96">
                {statusApps.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500">No applications yet</p>
                  </div>
                ) : (
                  statusApps.map((app) => (
                    <div key={app.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {app.role}
                          </p>
                          <p className="text-xs text-gray-600">{app.company}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          <p>{app.platform}</p>
                        </div>
                        {app.notes && (
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {app.notes}
                          </p>
                        )}
                        <div className="flex gap-2 mt-3 pt-3 border-t">
                          <button
                            onClick={() => onStatusChange(app.id, statusConfig.value as ApplicationStatus)}
                            className="flex-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                          >
                            View
                          </button>
                          <button
                            onClick={() => onDelete(app.id)}
                            className="flex-1 px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
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
