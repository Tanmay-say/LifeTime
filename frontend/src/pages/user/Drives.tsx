import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FilterChips } from '@/components/shared/FilterChips';
import { DriveCard } from '@/components/shared/DriveCard';
import { Bot } from 'lucide-react';

const filterChips = [
  { id: 'all', label: 'All Drives' },
  { id: 'critical', label: 'Critical' },
  { id: 'nearby', label: 'Nearby' },
  { id: 'ai', label: 'AI Recommended' },
];

export const UserDrives = () => {
  const { drives } = useApp();
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);

  const aiRecommended = drives.filter(d => d.aiRecommended);
  const otherDrives = drives.filter(d => !d.aiRecommended);

  const handleInterested = (driveId: string) => {
    console.log('Interested in drive:', driveId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Donation Drives</h1>
        <p className="text-muted-foreground">Find opportunities to donate near you</p>
      </div>

      {/* Filters */}
      <FilterChips
        chips={filterChips}
        selected={selectedFilters}
        onChange={setSelectedFilters}
      />

      {/* AI Recommended Section */}
      {aiRecommended.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">AI Recommended for You</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiRecommended.map((drive) => (
              <DriveCard
                key={drive.id}
                drive={drive}
                onInterested={handleInterested}
                featured
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Drives */}
      <div className="space-y-4">
        <h2 className="font-semibold text-foreground">Available Drives</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherDrives.map((drive) => (
            <DriveCard
              key={drive.id}
              drive={drive}
              onInterested={handleInterested}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDrives;
