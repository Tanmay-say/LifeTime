import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import { ChartContainer } from '@/components/shared/ChartContainer';
import { FilterChips } from '@/components/shared/FilterChips';
import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { timeToConfirmTrend, bloodTypeStatsMockData, engagementFunnelMockData } from '@/data/analytics.store';
import { FileText, Clock, CheckCircle, Users } from 'lucide-react';

const dateFilters = [
  { id: '30d', label: '30 Days' },
  { id: '90d', label: '90 Days' },
  { id: '12m', label: '12 Months' },
];

export const AdminAnalytics = () => {
  const { analytics } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string[]>(['30d']);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground">Performance metrics and trends</p>
        </div>
        <FilterChips chips={dateFilters} selected={selectedFilter} onChange={setSelectedFilter} />
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={analytics.totalRequests.toLocaleString()}
          icon={FileText}
          trend={{ value: analytics.trends.requests, isPositive: true }}
        />
        <StatCard
          title="Avg Time-to-Confirm"
          value={`${analytics.avgTimeToConfirm}h`}
          icon={Clock}
          trend={{ value: Math.abs(analytics.trends.time), isPositive: analytics.trends.time < 0 }}
        />
        <StatCard
          title="Success Rate"
          value={`${analytics.successRate}%`}
          icon={CheckCircle}
          trend={{ value: analytics.trends.success, isPositive: true }}
        />
        <StatCard
          title="Active Donors"
          value={analytics.activeDonors.toLocaleString()}
          icon={Users}
          trend={{ value: analytics.trends.donors, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartContainer title="Time-to-Confirm Trends" subtitle="Average hours to donor confirmation">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeToConfirmTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="Response by Blood Type" subtitle="Request fulfillment rates">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bloodTypeStatsMockData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="bloodType" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="requests" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fulfilled" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </div>

      {/* Engagement Funnel */}
      <ChartContainer title="Engagement Funnel" subtitle="Donor response journey">
        <div className="space-y-3">
          {engagementFunnelMockData.map((stage, index) => (
            <div key={stage.stage} className="flex items-center gap-4">
              <div className="w-40 text-sm text-muted-foreground">{stage.stage}</div>
              <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full flex items-center justify-end pr-3"
                  style={{ width: `${stage.percentage}%` }}
                >
                  <span className="text-xs font-medium text-primary-foreground">
                    {stage.count.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="w-16 text-sm font-medium text-right">{stage.percentage}%</div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
};

export default AdminAnalytics;
