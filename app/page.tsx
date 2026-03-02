'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { ApplicationForm } from '@/components/application-form';
import { ApplicationList } from '@/components/application-list';
import { DashboardCards } from '@/components/dashboard-cards';
import { FilterBar } from '@/components/filter-bar';
import { useApplications } from '@/hooks/use-applications';
import { ApplicationFormData } from '@/lib/types';
import { Button } from '@/components/ui/button';

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

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const statusMatch = !statusFilter || app.status === statusFilter;
      const platformMatch = !platformFilter || app.platform === platformFilter;
      return statusMatch && platformMatch;
    });
  }, [applications, statusFilter, platformFilter]);

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
        <div className="mb-8">
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              + Add Application
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

            <FilterBar
              onStatusFilter={setStatusFilter}
              onPlatformFilter={setPlatformFilter}
              selectedStatus={statusFilter}
              selectedPlatform={platformFilter}
            />
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
