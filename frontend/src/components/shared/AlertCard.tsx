import { cn } from '@/lib/utils';
import { AlertTriangle, Info, AlertCircle, X } from 'lucide-react';
import { HealthAlert } from '@/data/health.store';
import { Button } from '@/components/ui/button';

interface AlertCardProps {
  alert: HealthAlert;
  onDismiss?: (id: string) => void;
  onAction?: (id: string) => void;
  className?: string;
}

export const AlertCard = ({ alert, onDismiss, onAction, className }: AlertCardProps) => {
  const icons = {
    urgent: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const styles = {
    urgent: 'bg-destructive/5 border-destructive/20 text-destructive',
    warning: 'bg-warning/5 border-warning/20 text-warning',
    info: 'bg-primary/5 border-primary/20 text-primary',
  };

  const Icon = icons[alert.type];

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        styles[alert.type],
        className
      )}
    >
      <div className="flex gap-3">
        <div className="shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-foreground">{alert.title}</h4>
            {onDismiss && (
              <button
                onClick={() => onDismiss(alert.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{alert.message}</p>
          {alert.actionRequired && onAction && (
            <Button
              size="sm"
              variant={alert.type === 'urgent' ? 'default' : 'outline'}
              onClick={() => onAction(alert.id)}
              className="mt-2"
            >
              Take Action
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
