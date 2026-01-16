import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge, getStatusVariant } from '@/components/shared/StatusBadge';
import { BloodRequest } from '@/data/requests.store';
import { Activity, Users, Clock, CheckCircle } from 'lucide-react';

export const AdminDashboard = () => {
  const { requests, analytics } = useApp();

  const activeRequests = requests.filter(r => r.status !== 'completed' && r.status !== 'cancelled');

  const columns: Column<BloodRequest>[] = [
    {
      key: 'id',
      header: 'Request ID',
      cell: (item) => <span className="font-mono text-sm">{item.id}</span>,
    },
    {
      key: 'hospital',
      header: 'Hospital',
      cell: (item) => <span className="font-medium">{item.hospital}</span>,
    },
    {
      key: 'bloodType',
      header: 'Blood Type',
      cell: (item) => (
        <span className="font-semibold text-destructive">{item.bloodType}</span>
      ),
    },
    {
      key: 'urgency',
      header: 'Urgency',
      cell: (item) => (
        <StatusBadge variant={getStatusVariant(item.urgency)} dot>
          {item.urgency}
        </StatusBadge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item) => (
        <StatusBadge variant={getStatusVariant(item.status)}>
          {item.status}
        </StatusBadge>
      ),
    },
    {
      key: 'progress',
      header: 'Progress',
      cell: (item) => (
        <span>{item.unitsCollected}/{item.unitsNeeded} units</span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of blood donation operations</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Requests"
          value={activeRequests.length}
          icon={Activity}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Donors"
          value={analytics.activeDonors.toLocaleString()}
          icon={Users}
          trend={{ value: analytics.trends.donors, isPositive: true }}
        />
        <StatCard
          title="Avg Confirmation"
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
      </div>

      {/* Active Requests Table */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-4">Active Requests</h2>
        <DataTable
          columns={columns}
          data={activeRequests}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
