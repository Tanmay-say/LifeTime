import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import { TimelineItem } from '@/components/shared/TimelineItem';
import { AlertCard } from '@/components/shared/AlertCard';
import { Droplets, Heart, Award } from 'lucide-react';

export const UserHistory = () => {
  const { donationHistory, healthAlerts, currentUser } = useApp();

  const completedDonations = donationHistory.filter(d => d.status === 'completed');
  const totalLivesImpacted = completedDonations.reduce((acc, d) => acc + d.livesImpacted, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Donation History</h1>
        <p className="text-muted-foreground">Track your impact and upcoming appointments</p>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Donations"
          value={completedDonations.length}
          icon={Droplets}
        />
        <StatCard
          title="Lives Impacted"
          value={totalLivesImpacted}
          icon={Heart}
        />
        <StatCard
          title="Gallons Donated"
          value={(completedDonations.length * 0.5).toFixed(1)}
          icon={Award}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-6">Your Timeline</h2>
          <div className="space-y-0">
            {donationHistory.map((donation) => (
              <TimelineItem key={donation.id} donation={donation} />
            ))}
          </div>
        </div>

        {/* Alerts Sidebar */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Alerts</h2>
          {healthAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
