'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { APPLICATION_STATUSES, PLATFORMS } from '@/lib/constants';
import { X } from 'lucide-react';

interface FilterBarProps {
  onStatusFilter: (status: string | null) => void;
  onPlatformFilter: (platform: string | null) => void;
  selectedStatus?: string | null;
  selectedPlatform?: string | null;
}

export const FilterBar = ({
  onStatusFilter,
  onPlatformFilter,
  selectedStatus,
  selectedPlatform,
}: FilterBarProps) => {
  const [status, setStatus] = useState<string | null>(selectedStatus || null);
  const [platform, setPlatform] = useState<string | null>(selectedPlatform || null);

  const handleStatusChange = (value: string) => {
    if (value === 'all') {
      setStatus(null);
      onStatusFilter(null);
    } else {
      setStatus(value);
      onStatusFilter(value);
    }
  };

  const handlePlatformChange = (value: string) => {
    if (value === 'all') {
      setPlatform(null);
      onPlatformFilter(null);
    } else {
      setPlatform(value);
      onPlatformFilter(value);
    }
  };

  const hasFilters = status || platform;

  return (
    <div className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="w-full md:w-48">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Filter by Status
          </label>
          <Select value={status || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {APPLICATION_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-48">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Filter by Platform
          </label>
          <Select value={platform || 'all'} onValueChange={handlePlatformChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {PLATFORMS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <Button
            variant="outline"
            onClick={() => {
              setStatus(null);
              setPlatform(null);
              onStatusFilter(null);
              onPlatformFilter(null);
            }}
            className="mt-auto"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
