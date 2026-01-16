import { cn } from '@/lib/utils';

type BadgeVariant = 'urgent' | 'success' | 'warning' | 'primary' | 'secondary' | 'muted';

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  urgent: 'bg-destructive/10 text-destructive border-destructive/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary text-secondary-foreground border-border',
  muted: 'bg-muted text-muted-foreground border-border',
};

export const StatusBadge = ({ variant, children, className, dot }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'urgent' && 'bg-destructive',
            variant === 'success' && 'bg-success',
            variant === 'warning' && 'bg-warning',
            variant === 'primary' && 'bg-primary',
            variant === 'secondary' && 'bg-secondary-foreground',
            variant === 'muted' && 'bg-muted-foreground'
          )}
        />
      )}
      {children}
    </span>
  );
};

// Helper function to get badge variant from status
export const getStatusVariant = (status: string): BadgeVariant => {
  const statusMap: Record<string, BadgeVariant> = {
    critical: 'urgent',
    urgent: 'urgent',
    high: 'warning',
    moderate: 'primary',
    low: 'muted',
    routine: 'muted',
    pending: 'warning',
    'in-progress': 'primary',
    matching: 'primary',
    completed: 'success',
    cancelled: 'muted',
    eligible: 'success',
    ineligible: 'urgent',
    active: 'primary',
    scheduled: 'primary',
    missed: 'urgent',
  };
  return statusMap[status.toLowerCase()] || 'secondary';
};
