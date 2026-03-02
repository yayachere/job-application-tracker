'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

interface HeaderProps {
  totalApplications?: number;
}

export const Header = ({ totalApplications = 0 }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Job Application Tracker</h1>
            </div>
            <p className="text-blue-100">
              Keep track of all your job applications in one place
            </p>
            {totalApplications > 0 && (
              <div className="mt-4 text-blue-50">
                <p className="text-lg font-semibold">
                  You have {totalApplications} application{totalApplications !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {totalApplications > 0 && (
              <nav className="flex gap-4">
                <Link
                  href="/"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === '/'
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/analytics"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === '/analytics'
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  Analytics
                </Link>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
