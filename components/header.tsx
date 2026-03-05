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
        <div className="flex flex-col gap-4 py-6 sm:py-12">
          {/* Top row: Theme toggle */}
          <div className="flex justify-end">
            <ThemeToggle />
          </div>

          {/* Title and description section */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold line-clamp-2">
                Job Application Tracker
              </h1>
            </div>
            <p className="text-sm sm:text-base text-blue-100">
              Keep track of all your job applications in one place
            </p>
            {totalApplications > 0 && (
              <div className="mt-3 sm:mt-4 text-blue-50">
                <p className="text-sm sm:text-lg font-semibold">
                  You have {totalApplications} application{totalApplications !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          {totalApplications > 0 && (
            <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Link
                href="/"
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base text-center ${
                  pathname === '/'
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/analytics"
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base text-center ${
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
    </header>
  );
};
