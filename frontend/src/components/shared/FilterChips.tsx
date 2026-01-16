import { cn } from '@/lib/utils';

interface FilterChip {
  id: string;
  label: string;
}

interface FilterChipsProps {
  chips: FilterChip[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  className?: string;
}

export const FilterChips = ({
  chips,
  selected,
  onChange,
  multiple = false,
  className,
}: FilterChipsProps) => {
  const handleClick = (chipId: string) => {
    if (multiple) {
      if (selected.includes(chipId)) {
        onChange(selected.filter((id) => id !== chipId));
      } else {
        onChange([...selected, chipId]);
      }
    } else {
      onChange(selected.includes(chipId) ? [] : [chipId]);
    }
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {chips.map((chip) => {
        const isSelected = selected.includes(chip.id);
        return (
          <button
            key={chip.id}
            onClick={() => handleClick(chip.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              isSelected
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-muted border border-border'
            )}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
};
