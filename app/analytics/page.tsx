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
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-slate-800 mb-6">
              <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Analytics Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Start adding job applications to see your analytics, kanban board, and track your job search progress in real-time.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Add Your First Application
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-1 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Kanban Board
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Visualize your job applications across different stages of the hiring process
              </p>
              <KanbanBoard
                applications={applications}
                onDelete={deleteApplication}
                onStatusChange={(id, status) =>
                  updateApplication(id, { status })
                }
              />
            </div>

            <div className="border-t border-gray-200 dark:border-slate-700 pt-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-1 w-1 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Analytics & Insights
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Track your job search metrics and visualize your progress toward your goal
              </p>
              <AnalyticsCharts applications={applications} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
