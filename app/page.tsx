'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { ApplicationForm } from '@/components/application-form';
import { ApplicationList } from '@/components/application-list';
import { DashboardCards } from '@/components/dashboard-cards';
import { FilterBar } from '@/components/filter-bar';
import { SearchBar } from '@/components/search-bar';
import { AdvancedFilters } from '@/components/advanced-filters';
import { useApplications } from '@/hooks/use-applications';
import { ApplicationFormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { exportToCSV } from '@/lib/csv-export';
import { Download } from 'lucide-react';

export default function Home() {
  const {
    applications,
    isLoaded,
    addApplication,
    updateApplication,
    deleteApplication,
  } = useApplications();
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const statusMatch = !statusFilter || app.status === statusFilter;
      const platformMatch = !platformFilter || app.platform === platformFilter;
      
      // Search query matches company, role, platform, or notes
      const searchLower = searchQuery.toLowerCase();
      const searchMatch =
        !searchQuery ||
        app.company.toLowerCase().includes(searchLower) ||
        app.role.toLowerCase().includes(searchLower) ||
        app.platform.toLowerCase().includes(searchLower) ||
        (app.notes && app.notes.toLowerCase().includes(searchLower));

      // Date range filter
      const appDate = new Date(app.dateApplied);
      const dateFromMatch = !dateFromFilter || appDate >= new Date(dateFromFilter);
      const dateToMatch = !dateToFilter || appDate <= new Date(dateToFilter);

      return statusMatch && platformMatch && searchMatch && dateFromMatch && dateToMatch;
    });
  }, [applications, statusFilter, platformFilter, searchQuery, dateFromFilter, dateToFilter]);

  const handleResetFilters = () => {
    setStatusFilter(null);
    setPlatformFilter(null);
    setSearchQuery('');
    setDateFromFilter('');
    setDateToFilter('');
  };

  const handleAddApplication = (data: ApplicationFormData) => {
    addApplication(data);
    setShowForm(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Header totalApplications={applications.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              + Add Application
            </Button>
          )}
          {applications.length > 0 && (
            <Button
              onClick={() => exportToCSV(filteredApplications)}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export to CSV
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8">
            <ApplicationForm
              onSubmit={handleAddApplication}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {applications.length > 0 && (
          <>
            <DashboardCards applications={applications} />

            <div className="mb-8 space-y-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />

              <AdvancedFilters
                selectedStatus={statusFilter}
                selectedPlatform={platformFilter}
                dateFromFilter={dateFromFilter}
                dateToFilter={dateToFilter}
                onStatusChange={setStatusFilter}
                onPlatformChange={setPlatformFilter}
                onDateFromChange={setDateFromFilter}
                onDateToChange={setDateToFilter}
                onReset={handleResetFilters}
              />
            </div>
          </>
        )}

        <ApplicationList
          applications={filteredApplications}
          onDelete={deleteApplication}
          onStatusChange={(id, status) =>
            updateApplication(id, { status })
          }
        />
      </main>
    </div>
  );
}
