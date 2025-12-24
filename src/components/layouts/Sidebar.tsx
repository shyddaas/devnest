import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Info,
  Shield,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { tools } from '@/lib/tools-data';
import { useFavorites } from '@/hooks/use-favorites';
import { useUsageTracking } from '@/hooks/use-usage-tracking';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const { favorites } = useFavorites();
  const { getRecentTools } = useUsageTracking();

  const isActive = (path: string) => location.pathname === path;

  const recentToolIds = getRecentTools(5);
  const favoriteTools = tools.filter(tool => favorites.includes(tool.id));

  // Sort favorites by usage
  const sortedFavorites = [...favoriteTools].sort((a, b) => {
    const aIndex = recentToolIds.indexOf(a.id);
    const bIndex = recentToolIds.indexOf(b.id);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <aside className={cn('w-64 border-r border-border bg-card', className)}>
      <ScrollArea className="h-full py-6 px-4">
        <nav className="space-y-6">
          {/* Main Navigation */}
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </h3>
            <div className="space-y-1">
              <Link
                to="/"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                  isActive('/') && 'bg-accent text-accent-foreground font-medium'
                )}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                to="/about"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                  isActive('/about') && 'bg-accent text-accent-foreground font-medium'
                )}
              >
                <Info className="h-4 w-4" />
                About
              </Link>
              <Link
                to="/privacy"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                  isActive('/privacy') && 'bg-accent text-accent-foreground font-medium'
                )}
              >
                <Shield className="h-4 w-4" />
                Privacy
              </Link>
            </div>
          </div>

          <Separator />

          {/* Favorites */}
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Star className="h-3 w-3" />
              Favorites
            </h3>
            {sortedFavorites.length > 0 ? (
              <div className="space-y-1">
                {sortedFavorites.map((tool) => {
                  const ToolIcon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                        isActive(tool.path) && 'bg-accent text-accent-foreground font-medium'
                      )}
                    >
                      {React.createElement(ToolIcon, { className: "h-4 w-4" })}
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="px-3 py-2 text-xs text-muted-foreground">
                No favorites yet. Star tools to add them here!
              </p>
            )}
          </div>

          <Separator />

          {/* All Tools */}
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              All Tools
            </h3>
            <div className="space-y-1">
              {tools.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                      isActive(tool.path) && 'bg-accent text-accent-foreground font-medium'
                    )}
                  >
                    {React.createElement(ToolIcon, { className: "h-4 w-4" })}
                    {tool.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </ScrollArea>
    </aside>
  );
}
