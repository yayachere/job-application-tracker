'use client';

import { useApplications } from '@/hooks/use-applications';
import { Header } from '@/components/header';
import { KanbanBoard } from '@/components/kanban-board';
import { AnalyticsCharts } from '@/components/analytics-charts';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AnalyticsPage() {
  const {
    applications,
    isLoaded,
    updateApplication,
    deleteApplication,
  } = useApplications();

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
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics & Kanban</h1>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No applications yet. Add some to see analytics and kanban board.
            </p>
            <Link href="/">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Kanban Board
              </h2>
              <KanbanBoard
                applications={applications}
                onDelete={deleteApplication}
                onStatusChange={(id, status) =>
                  updateApplication(id, { status })
                }
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Analytics
              </h2>
              <AnalyticsCharts applications={applications} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
