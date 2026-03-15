'use client';

import { Application, ApplicationStatus } from '@/lib/types';
import { StatusBadge } from './status-badge';
import { StatusProgression } from './status-progression';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { APPLICATION_STATUSES } from '@/lib/constants';
import { Trash2, MoreHorizontal, ExternalLink } from 'lucide-react';

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export const ApplicationCard = ({
  application,
  onDelete,
  onStatusChange,
}: ApplicationCardProps) => {
  const formattedDate = new Date(application.dateApplied).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="p-6 hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-200 hover:-translate-y-1 bg-white dark:bg-slate-900 dark:border-slate-700 border border-gray-200 dark:border-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {application.role}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">{application.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={() => onDelete(application.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-4 border-t border-gray-200 dark:border-slate-700 pt-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wide">Status</span>
            <Select
              value={application.status}
              onValueChange={(value) =>
                onStatusChange(application.id, value as ApplicationStatus)
              }
            >
              <SelectTrigger className="w-auto ml-auto border-none bg-transparent p-0 h-auto focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {APPLICATION_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <StatusProgression application={application} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Platform:</span>
          <span className="text-gray-900 dark:text-white font-medium">{application.platform}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Applied:</span>
          <span className="text-gray-900 dark:text-white">{formattedDate}</span>
        </div>

        {application.location && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Location:</span>
            <span className="text-gray-900 dark:text-white">{application.location}</span>
          </div>
        )}

        {application.salary && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Salary:</span>
            <span className="text-gray-900 dark:text-white font-medium">{application.salary}</span>
          </div>
        )}

        {application.applicationLink && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Application:</span>
            <a
              href={application.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center gap-1"
            >
              View Posting
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        {application.resumeVersion && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Resume:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {application.resumeVersion}
            </span>
          </div>
        )}

        {application.followUpDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Follow-up:</span>
            <span className="text-gray-900 dark:text-white font-medium">{new Date(application.followUpDate).toLocaleDateString()}</span>
          </div>
        )}

        {application.notes && (
          <div className="pt-3 border-t dark:border-slate-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">{application.notes}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
