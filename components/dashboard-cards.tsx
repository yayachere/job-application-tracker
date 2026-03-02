'use client';

import { Application } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Clock, XCircle, Send, Trophy } from 'lucide-react';

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
      icon: Clock,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
    {
      label: 'Interviewing',
      value: stats.interviewing,
      icon: CheckCircle2,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
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
      icon: Trophy,
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} className={`p-6 ${card.bgColor} dark:bg-slate-800 dark:border-slate-700`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${card.bgColor} dark:bg-slate-700`}>
                <Icon className={`h-6 w-6 ${card.textColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.label}</p>
                <p className={`text-2xl font-bold ${card.textColor}`}>
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
