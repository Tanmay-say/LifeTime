import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/shared/StatCard';
import { CircularProgress } from '@/components/shared/CircularProgress';
import { AlertCard } from '@/components/shared/AlertCard';
import { Heart, Droplets, Activity, Calendar } from 'lucide-react';

export const UserDashboard = () => {
  const { health, healthAlerts, currentUser } = useApp();
  
  const eligibilityPercentage = ((health.eligibilityTotalDays - health.eligibilityDaysRemaining) / health.eligibilityTotalDays) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {currentUser?.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Your blood type: <span className="font-semibold text-primary">{currentUser?.bloodType}</span>
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Eligibility Card */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="font-semibold text-foreground mb-6">Donation Eligibility</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <CircularProgress
              value={health.eligibilityTotalDays - health.eligibilityDaysRemaining}
              max={health.eligibilityTotalDays}
              size={160}
              strokeWidth={12}
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{health.eligibilityDaysRemaining}</p>
                <p className="text-sm text-muted-foreground">days left</p>
              </div>
            </CircularProgress>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Health Score</p>
                <p className="text-2xl font-bold text-foreground">{health.healthScore}/100</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Hemoglobin</p>
                <p className="text-2xl font-bold text-foreground">{health.hemoglobin} g/dL</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Iron Level</p>
                <p className="text-2xl font-bold text-foreground">{health.ironLevel}%</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Blood Pressure</p>
                <p className="text-2xl font-bold text-foreground">
                  {health.bloodPressure.systolic}/{health.bloodPressure.diastolic}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <StatCard
            title="Total Donations"
            value={currentUser?.totalDonations || 0}
            icon={Droplets}
          />
          <StatCard
            title="Lives Impacted"
            value={(currentUser?.totalDonations || 0) * 3}
            icon={Heart}
          />
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        <h2 className="font-semibold text-foreground">Alerts & Reminders</h2>
        <div className="space-y-3">
          {healthAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
