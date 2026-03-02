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

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        {statusData.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Platform Distribution */}
        {platformChartData.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Applications by Platform
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>

      {/* Applications Timeline */}
      {timelineData.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Applications Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                dot={{ fill: '#3b82f6' }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
};
