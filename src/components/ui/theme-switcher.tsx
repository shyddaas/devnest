import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { currentTheme, availableThemes, setThemeById } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title="Change theme">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setThemeById(theme.id)}
            className={cn(
              'cursor-pointer',
              currentTheme.id === theme.id && 'bg-accent'
            )}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex gap-1">
                <div
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                />
                <div
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{theme.name}</div>
                <div className="text-xs text-muted-foreground">
                  {theme.description}
                </div>
              </div>
              {currentTheme.id === theme.id && (
                <div className="text-primary">✓</div>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
