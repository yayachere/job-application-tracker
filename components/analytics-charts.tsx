'use client';

import { Application } from '@/lib/types';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { APPLICATION_STATUSES } from '@/lib/constants';

interface AnalyticsChartsProps {
  applications: Application[];
}

export const AnalyticsCharts = ({ applications }: AnalyticsChartsProps) => {
  // Status distribution data
  const statusData = APPLICATION_STATUSES.map((status) => ({
    name: status.label,
    value: applications.filter((app) => app.status === status.value).length,
  })).filter(item => item.value > 0);

  // Applications over time
  const timelineData = applications
    .sort((a, b) => new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime())
    .reduce((acc: any[], app) => {
      const date = new Date(app.dateApplied).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }
      return acc;
    }, []);

  // Platform distribution
  const platformData: Record<string, number> = {};
  applications.forEach((app) => {
    platformData[app.platform] = (platformData[app.platform] || 0) + 1;
  });

  const platformChartData = Object.entries(platformData)
    .map(([platform, count]) => ({
      name: platform,
      value: count,
    }))
    .sort((a, b) => b.value - a.value);

  // Applications by company
  const companyData: Record<string, number> = {};
  applications.forEach((app) => {
    companyData[app.company] = (companyData[app.company] || 0) + 1;
  });

  const companyChartData = Object.entries(companyData)
    .map(([company, count]) => ({
      name: company,
      value: count,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        {statusData.length > 0 && (
          <Card className="p-6 bg-white dark:bg-slate-900 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Applications by Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Platform Distribution */}
        {platformChartData.length > 0 && (
          <Card className="p-6 bg-white dark:bg-slate-900 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Applications by Platform
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>

      {/* Applications Timeline */}
      {timelineData.length > 0 && (
        <Card className="p-6 bg-white dark:bg-slate-900 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Applications Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Applications by Company */}
      {companyChartData.length > 0 && (
        <Card className="p-6 bg-white dark:bg-slate-900 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Companies Applied To
          </h3>
          <ResponsiveContainer width="100%" height={companyChartData.length > 5 ? 400 : 300}>
            <BarChart
              data={companyChartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" width={190} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#fff' }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Funnel/Conversion Metrics */}
      <Card className="p-6 bg-white dark:bg-slate-900 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Conversion Funnel
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Applied', value: applications.length, color: 'bg-blue-600' },
            { label: 'Interviewing', value: applications.filter(a => a.status === 'interviewing').length, color: 'bg-amber-600' },
            { label: 'Offers', value: applications.filter(a => a.status === 'offer').length, color: 'bg-green-600' },
            { label: 'Accepted', value: applications.filter(a => a.status === 'accepted').length, color: 'bg-emerald-600' },
          ].map((item, idx) => {
            const percentage = applications.length > 0 ? Math.round((item.value / applications.length) * 100) : 0;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
