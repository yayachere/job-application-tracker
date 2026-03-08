'use client';

import { Application } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle, Send, Trophy, Briefcase, TrendingUp } from 'lucide-react';

interface DashboardCardsProps {
  applications: Application[];
}

export const DashboardCards = ({ applications }: DashboardCardsProps) => {
  const stats = {
    total: applications.length,
    applied: applications.filter((app) => app.status === 'applied').length,
    interviewing: applications.filter((app) => app.status === 'interviewing').length,
    rejected: applications.filter((app) => app.status === 'rejected').length,
    offers: applications.filter((app) => app.status === 'offer').length,
    accepted: applications.filter((app) => app.status === 'accepted').length,
  };

  const successRate =
    stats.total > 0
      ? Math.round(((stats.offers + stats.accepted) / stats.total) * 100)
      : 0;

  const cards = [
    {
      label: 'Total Applications',
      value: stats.total,
      icon: Send,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Applied',
      value: stats.applied,
      icon: Send,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Interviewing',
      value: stats.interviewing,
      icon: Briefcase,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Offers',
      value: stats.offers,
      icon: Trophy,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Success Rate',
      value: `${successRate}%`,
      icon: TrendingUp,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.label}
            className={`p-4 sm:p-6 ${card.bgColor} dark:bg-slate-800 dark:border-slate-700 hover:shadow-md dark:hover:shadow-slate-900/50 transition-all duration-200 hover:-translate-y-0.5 cursor-default`}
          >
            <div className="flex flex-col items-start gap-3">
              <div className={`p-2.5 rounded-lg ${card.bgColor} dark:bg-slate-700 ring-1 ring-offset-0 ${
                card.textColor.replace('text-', 'ring-')
              }`}>
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${card.textColor}`} />
              </div>
              <div className="w-full">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {card.label}
                </p>
                <p className={`text-xl sm:text-2xl font-bold ${card.textColor} mt-1`}>
                  {card.value}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
