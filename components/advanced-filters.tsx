'use client';

import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { APPLICATION_STATUSES, PLATFORMS } from '@/lib/constants';
import { Filter, X } from 'lucide-react';

interface AdvancedFiltersProps {
  selectedStatus: string | null;
  selectedPlatform: string | null;
  dateFromFilter: string;
  dateToFilter: string;
  onStatusChange: (status: string | null) => void;
  onPlatformChange: (platform: string | null) => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onReset: () => void;
}

export const AdvancedFilters = ({
  selectedStatus,
  selectedPlatform,
  dateFromFilter,
  dateToFilter,
  onStatusChange,
  onPlatformChange,
  onDateFromChange,
  onDateToChange,
  onReset,
}: AdvancedFiltersProps) => {
  const hasActiveFilters = selectedStatus || selectedPlatform || dateFromFilter || dateToFilter;

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Advanced Filters
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Status
          </label>
          <Select value={selectedStatus || 'all'} onValueChange={(value) => onStatusChange(value === 'all' ? null : value)}>
            <SelectTrigger className="w-full dark:bg-slate-800 dark:border-slate-700">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {APPLICATION_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Platform
          </label>
          <Select value={selectedPlatform || 'all'} onValueChange={(value) => onPlatformChange(value === 'all' ? null : value)}>
            <SelectTrigger className="w-full dark:bg-slate-800 dark:border-slate-700">
              <SelectValue placeholder="All platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All platforms</SelectItem>
              {PLATFORMS.map((platform) => (
                <SelectItem key={platform} value={platform}>
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            From Date
          </label>
          <Input
            type="date"
            value={dateFromFilter}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="dark:bg-slate-800 dark:border-slate-700"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            To Date
          </label>
          <Input
            type="date"
            value={dateToFilter}
            onChange={(e) => onDateToChange(e.target.value)}
            className="dark:bg-slate-800 dark:border-slate-700"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex items-center gap-2">
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {[selectedStatus, selectedPlatform, dateFromFilter && 'date range'].filter(Boolean).length} filter(s) active
          </span>
        </div>
      )}
    </Card>
  );
};
