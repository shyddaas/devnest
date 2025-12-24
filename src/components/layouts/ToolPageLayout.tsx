import { useEffect } from 'react';
import { StarButton } from '@/components/ui/star-button';
import { useFavorites } from '@/hooks/use-favorites';
import { useUsageTracking } from '@/hooks/use-usage-tracking';
import { useToast } from '@/hooks/use-toast';

interface ToolPageLayoutProps {
  toolId: string;
  toolName: string;
  children: React.ReactNode;
}

export function ToolPageLayout({ toolId, toolName, children }: ToolPageLayoutProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { trackToolVisit } = useUsageTracking();
  const { toast } = useToast();

  useEffect(() => {
    // Track tool visit
    const cleanup = trackToolVisit(toolId);
    return cleanup;
  }, [toolId, trackToolVisit]);

  const handleToggleFavorite = () => {
    toggleFavorite(toolId);
    const newState = !isFavorite(toolId);
    toast({
      title: newState ? 'Added to favorites' : 'Removed from favorites',
      description: newState
        ? `${toolName} has been added to your favorites.`
        : `${toolName} has been removed from your favorites.`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{toolName}</h1>
        </div>
        <StarButton
          isFavorite={isFavorite(toolId)}
          onToggle={handleToggleFavorite}
        />
      </div>
      {children}
    </div>
  );
}
