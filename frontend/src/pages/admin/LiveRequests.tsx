import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge, getStatusVariant } from '@/components/shared/StatusBadge';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { BloodRequest } from '@/data/requests.store';
import { Activity, Clock, Users, Truck, Bot } from 'lucide-react';

export const LiveRequests = () => {
  const { requests } = useApp();

  const activeRequests = requests.filter(r => r.status !== 'completed' && r.status !== 'cancelled');
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const processingCount = requests.filter(r => r.status === 'matching' || r.status === 'in-progress').length;

  const columns: Column<BloodRequest>[] = [
    {
      key: 'id',
      header: 'Request',
      cell: (item) => (
        <div>
          <span className="font-mono font-medium">{item.id}</span>
          <p className="text-xs text-muted-foreground">{item.hospital}</p>
        </div>
      ),
    },
    {
      key: 'bloodType',
      header: 'Type',
      cell: (item) => <span className="font-bold text-destructive">{item.bloodType}</span>,
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
      key: 'progress',
      header: 'Progress',
      cell: (item) => (
        <div className="w-32">
          <ProgressBar
            value={item.unitsCollected}
            max={item.unitsNeeded}
            size="sm"
            variant={item.unitsCollected >= item.unitsNeeded ? 'success' : 'primary'}
          />
          <span className="text-xs text-muted-foreground">
            {item.unitsCollected}/{item.unitsNeeded} units
          </span>
        </div>
      ),
    },
    {
      key: 'donors',
      header: 'Donors',
      cell: (item) => (
        <span>{item.confirmedDonors}/{item.matchedDonors} confirmed</span>
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
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-foreground">Live Request Management</h1>
        <StatusBadge variant="success" dot>Live</StatusBadge>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pending" value={pendingCount} icon={Clock} />
        <StatCard title="Processing" value={processingCount} icon={Activity} />
        <StatCard title="Donors in Transit" value={8} icon={Truck} />
        <StatCard title="Matched Today" value={24} icon={Users} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Requests Table */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-4">Active Requests Queue</h2>
          <DataTable
            columns={columns}
            data={activeRequests}
            keyExtractor={(item) => item.id}
          />
        </div>

        {/* AI Panel */}
        <div className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">AI Predictions</h3>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-sm font-medium text-success">High Match Rate</p>
                <p className="text-xs text-muted-foreground">REQ-001 likely to be fulfilled within 2 hours</p>
              </div>
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm font-medium text-warning">Attention Needed</p>
                <p className="text-xs text-muted-foreground">REQ-003 has low donor response - consider expanding search</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRequests;
