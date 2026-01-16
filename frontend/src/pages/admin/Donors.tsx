import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge, getStatusVariant } from '@/components/shared/StatusBadge';
import { Donor } from '@/data/donors.store';
import { Users, AlertTriangle, CheckCircle, Clock, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AdminDonors = () => {
  const { donors } = useApp();

  const eligibleCount = donors.filter(d => d.status === 'eligible').length;
  const urgentNeed = donors.filter(d => ['O-', 'AB-'].includes(d.bloodType)).length;

  const columns: Column<Donor>[] = [
    {
      key: 'name',
      header: 'Donor',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {item.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.location}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'bloodType',
      header: 'Blood Type',
      cell: (item) => (
        <span className="font-bold text-destructive">{item.bloodType}</span>
      ),
    },
    {
      key: 'reliability',
      header: 'Reliability',
      cell: (item) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full"
              style={{ width: `${item.reliabilityScore}%` }}
            />
          </div>
          <span className="text-sm">{item.reliabilityScore}%</span>
        </div>
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
      key: 'donations',
      header: 'Donations',
      cell: (item) => <span>{item.totalDonations}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (item) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Donor Overview</h1>
        <p className="text-muted-foreground">Manage and contact donors</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Donors" value={donors.length} icon={Users} />
        <StatCard title="Urgent Need Types" value={urgentNeed} icon={AlertTriangle} />
        <StatCard title="Eligible Today" value={eligibleCount} icon={CheckCircle} />
        <StatCard title="Pending Reviews" value={donors.filter(d => d.status === 'pending').length} icon={Clock} />
      </div>

      {/* Donors Table */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-4">All Donors</h2>
        <DataTable
          columns={columns}
          data={donors}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
};

export default AdminDonors;
