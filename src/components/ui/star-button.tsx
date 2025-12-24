import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StarButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
}

export function StarButton({ isFavorite, onToggle, className }: StarButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={cn(
        'transition-all duration-200 hover:scale-110',
        className
      )}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        className={cn(
          'h-5 w-5 transition-all duration-200',
          isFavorite
            ? 'fill-primary text-primary'
            : 'text-muted-foreground hover:text-primary'
        )}
      />
    </Button>
  );
}
