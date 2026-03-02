'use client';

import { Application, ApplicationStatus } from '@/lib/types';
import { StatusBadge } from './status-badge';
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
    <Card className="p-6 hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 dark:border-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {application.role}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{application.company}</p>
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
          <Select
            value={application.status}
            onValueChange={(value) =>
              onStatusChange(application.id, value as ApplicationStatus)
            }
          >
            <SelectTrigger className="w-40">
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

        {application.notes && (
          <div className="pt-3 border-t dark:border-slate-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">{application.notes}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
