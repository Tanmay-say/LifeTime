import { cn } from '@/lib/utils';
import { Calendar, MapPin, CheckCircle, XCircle, Clock } from 'lucide-react';
import { DonationHistory } from '@/data/health.store';
import { StatusBadge, getStatusVariant } from './StatusBadge';

interface TimelineItemProps {
  donation: DonationHistory;
  className?: string;
}

export const TimelineItem = ({ donation, className }: TimelineItemProps) => {
  const statusIcons = {
    completed: CheckCircle,
    scheduled: Clock,
    cancelled: XCircle,
    missed: XCircle,
  };

  const StatusIcon = statusIcons[donation.status];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={cn('flex gap-4', className)}>
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center',
            donation.status === 'completed' && 'bg-success/10 text-success',
            donation.status === 'scheduled' && 'bg-primary/10 text-primary',
            donation.status === 'cancelled' && 'bg-muted text-muted-foreground',
            donation.status === 'missed' && 'bg-destructive/10 text-destructive'
          )}
        >
          <StatusIcon className="w-5 h-5" />
        </div>
        <div className="w-0.5 flex-1 bg-border mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground capitalize">
                  {donation.type} Donation
                </h4>
                <StatusBadge variant={getStatusVariant(donation.status)}>
                  {donation.status}
                </StatusBadge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(donation.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{donation.location}</span>
                </div>
              </div>
            </div>
            {donation.status === 'completed' && donation.livesImpacted > 0 && (
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{donation.livesImpacted}</p>
                <p className="text-xs text-muted-foreground">Lives Impacted</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
