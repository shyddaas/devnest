import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SmartSuggestionBannerProps {
  toolName: string;
  toolPath: string;
  description: string;
  onDismiss?: () => void;
  className?: string;
}

export function SmartSuggestionBanner({
  toolName,
  toolPath,
  description,
  onDismiss,
  className,
}: SmartSuggestionBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate(toolPath);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 mb-4 rounded-lg border bg-accent/50 backdrop-blur-sm animate-in slide-in-from-top-2',
        className
      )}
    >
      <Lightbulb className="h-5 w-5 text-primary flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">
          {description} Would you like to use the{' '}
          <span className="text-primary font-semibold">{toolName}</span>?
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button size="sm" onClick={handleAccept}>
          Yes
        </Button>
        <Button size="sm" variant="ghost" onClick={handleDismiss}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
