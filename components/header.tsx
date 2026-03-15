'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, User, LogIn } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface HeaderProps {
  totalApplications?: number;
}

export const Header = ({ totalApplications = 0 }: HeaderProps) => {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  const profileHref = isAuthenticated ? '/dashboard/profile' : '/auth/login';
  const profileLabel = isAuthenticated ? 'Profile' : 'Login';
  const ProfileIcon = isAuthenticated ? User : LogIn;
  const isProfileActive = isAuthenticated ? pathname === '/dashboard/profile' : pathname === '/auth/login';

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
          <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {totalApplications > 0 && (
              <>
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
              </>
            )}
            <Link
              href={profileHref}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base text-center flex items-center justify-center gap-2 ${
                isProfileActive
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-700' 
              }`}
            >
              <ProfileIcon className="h-4 w-4" />
              {profileLabel}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
