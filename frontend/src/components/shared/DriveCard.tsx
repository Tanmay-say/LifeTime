import { cn } from '@/lib/utils';
import { MapPin, Clock, Droplets, Users } from 'lucide-react';
import { DonationDrive } from '@/data/donationDrives.store';
import { StatusBadge, getStatusVariant } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { Button } from '@/components/ui/button';

interface DriveCardProps {
  drive: DonationDrive;
  onInterested?: (driveId: string) => void;
  featured?: boolean;
  className?: string;
}

export const DriveCard = ({ drive, onInterested, featured, className }: DriveCardProps) => {
  const progressPercentage = (drive.currentUnits / drive.goalUnits) * 100;

  return (
    <div
      className={cn(
        'bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow',
        featured && 'ring-2 ring-primary',
        className
      )}
    >
      {/* Header Image Placeholder */}
      <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 relative">
        {drive.aiRecommended && (
          <div className="absolute top-3 left-3">
            <StatusBadge variant="primary" dot>
              AI Recommended
            </StatusBadge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <StatusBadge variant={getStatusVariant(drive.urgency)}>
            {drive.urgency.charAt(0).toUpperCase() + drive.urgency.slice(1)}
          </StatusBadge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Title and Hospital */}
        <div>
          <h3 className="font-semibold text-foreground">{drive.title}</h3>
          <p className="text-sm text-muted-foreground">{drive.hospital}</p>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{drive.distance} miles away</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{drive.date} • {drive.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Droplets className="w-4 h-4" />
            <span>{drive.bloodTypesNeeded.join(', ')}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {drive.currentUnits}/{drive.goalUnits} units
            </span>
          </div>
          <ProgressBar
            value={drive.currentUnits}
            max={drive.goalUnits}
            variant={progressPercentage >= 80 ? 'success' : progressPercentage >= 50 ? 'primary' : 'warning'}
          />
        </div>

        {/* Action */}
        <Button
          onClick={() => onInterested?.(drive.id)}
          className="w-full"
          variant={drive.urgency === 'critical' ? 'default' : 'outline'}
        >
          I'm Interested
        </Button>
      </div>
    </div>
  );
};
